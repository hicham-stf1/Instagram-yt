import React, { useEffect, useState } from 'react'
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../firebase'
import { Snapshot } from 'recoil'
import Moment from 'react-moment'

export default function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  )
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'likes'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setLikes(snapshot.docs)
      ),
    [db, id]
  )
  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  )

  const likePost = async () => {
    if (!hasLiked) {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.username,
      })
    } else {
      await updateDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: deleteField(),
      })
    }
  }

  console.log('hasLiked' + hasLiked)

  const sendComment = async (e) => {
    e.preventDefault()

    const commentToSend = comment
    setComment('')

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    })
  }
  return (
    <div className="my-7 rounded-sm border bg-white">
      {/* headers */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          alt=""
          className="mr-3 h-12 w-12  rounded-full border object-contain p-1"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* img */}
      <img src={userImg} alt="" className="w-full object-cover" />
      {/* Buttons */}{' '}
      {session && (
        <div className="flex justify-between px-4 pt-4 ">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIcon onClick={likePost} className="btn text-red-500" />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}

            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      {/* caption */}
      <p className="truncate p-5">
        {likes.length > 0 && (
          <p className="mr-1 font-bold">{likes.length} likes</p>
        )}
        <span className="mr-1 font-bold">{username}</span>
        {caption}
      </p>
      {/* comments */}
      {comments.length > 0 && (
        <div
          className="ml-10 h-20 overflow-y-scroll
 scrollbar-thin scrollbar-thumb-black"
        >
          {comments.map((comment) => (
            <div key={comment.id} className="mb-3 flex items-center space-x-2">
              <img
                className="h-7 rounded-full"
                src={comment.data().userImg}
                alt=""
              />
              <p className="flex-1  text-sm">
                <span className="mr-[6px] font-bold">
                  {comment.data().username}
                </span>
                {comment.data().comment}
              </p>
              <Moment fromNow className="pr-4 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      {/* input box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment ..."
            className="flex-1 border-none outline-none focus:ring-0"
          />
          <button
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  )
}

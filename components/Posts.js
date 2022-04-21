import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Post from './Post'
import { db } from '../firebase'

export default function Posts() {
  // const posts = [
  //   {
  //     id: '1',
  //     username: 'ssssangha',
  //     userImg: 'https://links.papareact.com/3ke',
  //     img: 'https://links.papareact.com/3ke',
  //     caption: 'SUBSCRIBE AND DESTROY THE LIKE',
  //   },
  //   {
  //     id: '2',
  //     username: 'ssssangha',
  //     userImg: 'https://links.papareact.com/3ke',
  //     img: 'https://links.papareact.com/3ke',
  //     caption: 'SUBSCRIBE AND DESTROY THE LIKE',
  //   },
  // ]

  const [posts, setPosts] = useState([])

  //Implicit Return
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('username', 'desc')),
        (snapshot) => {
          setPosts(snapshot.docs)
        }
      ),
    [db]
  )

  console.log(posts)
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().image}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  )
}

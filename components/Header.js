import React from 'react'
import Image from 'next/image'
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'

export default function Header() {
  const { data: session } = useSession()
  const [open, setOpen] = useRecoilState(modalState)
  const router = useRouter()

  // console.log(session)

  return (
    <div className="pb-3 shadow-sm">
      <div className="mx-5 mt-2 flex max-w-6xl justify-between lg:mx-auto">
        {/* LEFT */}

        <div
          onClick={() => router.push('/')}
          className="relative hidden  w-24 lg:inline-grid"
        >
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div
          onClick={() => router.push('/')}
          className="relative  w-10 flex-shrink-0 cursor-pointer lg:hidden "
        >
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/* MIDDLE - SEARCH INPUT FIELD */}
        <div className="max-x-xs">
          <div className="relative mt-1 rounded-md  ">
            <div className="pointer-events-none absolute inset-y-0 flex items-center pl-3">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-md border-gray-300 bg-gray-50 pl-10 focus:border-black focus:ring-black sm:text-sm"
            />
          </div>
        </div>
        {/* RIGHT */}
        <div className="flex items-center justify-end space-x-4 ">
          <HomeIcon onClick={() => router.push('/')} className="navBtn" />
          <MenuIcon className="h-10 w-10 cursor-pointer md:hidden" />
          {session ? (
            <>
              <div className="navBtn relative">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute -right-1 -top-0 flex h-5 w-5 animate-bounce  items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  5
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn md:mr-2  "
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <img
                onClick={signOut}
                src={session.user.image}
                alt="profile pic"
                className="h-10 w-10 cursor-pointer rounded-full  "
              />
            </>
          ) : (
            <button onClick={signIn}>SignIn</button>
          )}
        </div>
      </div>
    </div>
  )
}

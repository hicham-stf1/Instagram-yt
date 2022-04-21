import { useSession } from 'next-auth/react'
import React from 'react'
import MiniProfile from './MiniProfile'
import Posts from './Posts'
import Stories from './Stories'
import Suggestions from './Suggestions'

export default function Feed() {
  const { data: session } = useSession()
  return (
    <main
      className={`xl:max-x-6xl mx-auto  grid grid-cols-1
     md:max-w-3xl md:grid-cols-2 xl:grid-cols-3 ${
       !session && '!max-w-3xl !grid-cols-1'
     }`}
    >
      {/* Section */}
      <section className="col-span-2">
        {/* Stories */}
        <Stories />
        {/* Posts */}
        <Posts />
      </section>

      {/* Section */}
      {session && (
        <section className="hidden md:col-span-1 xl:inline-grid">
          {/* Mini Profile */}
          {/* Suggestions */}
          <div className="fixed top-20">
            <MiniProfile />
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  )
}

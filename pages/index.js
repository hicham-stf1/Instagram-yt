import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Modal from '../components/Modal'

export default function Home() {
  return (
    // <div className="flex min-h-screen flex-col items-center justify-center py-2">
    <div className="scrollbar-hide h-screen overflow-y-scroll bg-gray-50">
      <Modal />
      <Head>
        <title>Instagram 2.0</title>
        <link rel="icon" href="/I.jpg" />
      </Head>
      {/* <h1>This is INSTAGRAM 2.0 build</h1> */}
      {/* header */}
      <Header />
      {/* feed */}
      <Feed />
      {/* Modal  */}
    </div>
  )
}

// export default Home

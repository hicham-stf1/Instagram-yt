import React from 'react'
import { getProviders, signIn as signInToProvider } from 'next-auth/react'
import Header from '../../components/Header'

//Browser...
function SignIn({ providers }) {
  return (
    <>
      <Header />
      <div
        className="-mt-40 flex min-h-screen flex-col items-center 
      justify-center  py-2 px-14 text-center
      "
      >
        <img className="w-80 " src="https://links.papareact.com/ocw" />
        <p className="mt-20">
          This is a real app, it is not build for educational purposes
        </p>
        <div className="mt-20">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="rounded-lg bg-blue-500 p-3 text-white"
                onClick={() => signInToProvider(provider.id)}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>{' '}
      </div>
    </>
  )
}

//Server SR
export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}

export default SignIn

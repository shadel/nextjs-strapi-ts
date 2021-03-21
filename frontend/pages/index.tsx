import { Session } from 'next-auth'
import { getSession, signIn, signOut } from 'next-auth/client'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Home from '../componnents/scenes/Home'

const IndexPage = ({ session }: { session: Session }) => {
  const signInButtonNode = () => {
    if (session) {
      return false
    }

    return (
      <div>
        <Link href="/api/auth/signin">
          <button
            onClick={(e) => {
              e.preventDefault()
              signIn()
            }}
          >
            Sign In
          </button>
        </Link>
      </div>
    )
  }

  const signOutButtonNode = () => {
    if (!session) {
      return false
    }

    return (
      <div>
        <Link href="/api/auth/signout">
          <button
            onClick={(e) => {
              e.preventDefault()
              signOut()
            }}
          >
            Sign Out
          </button>
        </Link>
      </div>
    )
  }

  if (!session) {
    return <Home />
  }

  return (
    <div className="hero">
      <Head>
        <title>Index Page</title>
      </Head>
      <div className="navbar">
        {signOutButtonNode()}
        {signInButtonNode()}
      </div>
      <div className="text">Hello world</div>
    </div>
  )
}

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  return {
    props: {
      session,
    },
  }
}

export default IndexPage

import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"

export default function ValidationScreen(props: { query: any }) {
  const Router = useRouter()
  var callback = 0

  const verification = async (props: { query: any }) => {
    console.log(
      `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/emailchecks/${props.query}`
    )
    const verification = await fetch(
      `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/emailchecks/${props.query}`,
      {
        method: "POST",
      }
    )
    const response = await verification.json()
    if (response.data.matchedCount === 1) {
      Router.push(`/connection/success`)
    }
  }

  if (callback === 0) {
    verification(props)
    callback = 1
  }

  return (
    <>
      <Head>
        <title>Connect</title>
        <meta
          name="Automate trip organiszation"
          content="Enter your destination and let the magic take over"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

export async function getServerSideProps(context: { query: { index: any } }) {
  const { index } = context.query
  const query = index[0]

  return { props: { query } }
}

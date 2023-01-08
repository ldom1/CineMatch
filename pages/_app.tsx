import "../src/styles/globals.css";
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import React from "react"

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp

import { useRouter } from "next/router"
import React from "react"

export default function ErrorLogPage() {
  const Router = useRouter()
  const push = async () => {
    Router.push("/connection")
  }
  return (
    <>
      <div className="relative flex h-screen w-screen flex-col items-center justify-center space-y-4 bg-slate-100 p-12">
        <div className="relative flex w-1/3 flex-col space-y-4 space-y-12 rounded-lg bg-gradient-to-tr from-sky-800 to-sky-500 p-12 shadow-lg">
          <div className="text-6xl font-extrabold text-white">
            You are not logged in
          </div>
          <div
            className="flex cursor-pointer items-center justify-center rounded-full bg-white p-2 hover:bg-slate-400 hover:text-white hover:shadow-inner"
            onClick={() => push()}
          >
            Connect
          </div>
        </div>
      </div>
    </>
  )
}

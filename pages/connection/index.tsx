import { signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import { MainLayoutNotConnected } from "../../src/layouts/MainLayout"

export default function ConnectionScreen(csrfToken: string, providers: string) {
  const [email, setEmail] = useState("email");
  const [password, setPassword] = useState("password");
  const [errorETheme, setErrorETheme] = useState("bg-slate-200 border-none");
  const [errorPWTheme, setErrorPWTheme] = useState("bg-slate-200 border-none");

  async function signInUser(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    let options = { redirect: false, email: email, password: password };
    const res = await signIn("credentials", options);
    if (res?.error) {
      setErrorETheme("bg-red-300 border-2 border-red-500 text-white");
      setErrorPWTheme("bg-red-300 border-2 border-red-500 text-white");
      console.log(res);
    } else {
      console.log(res);
      Router.push("/");
    }
  }

  return (
    <MainLayoutNotConnected>
      <div className="mx-auto mb-8 max-w-screen-sm bg-gray-100 lg:mb-16">
        <form
          className={`mt-8 grid w-full grid-cols-1 gap-2 rounded-lg border p-4`}
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <h3 className="col-span-2 text-sky-600">Login</h3>
          <label className="col-span-2 border-none pt-2 text-sm text-slate-500">
            Email
          </label>
          <input
            onClick={() => setEmail("")}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            type="text"
            className={`rounded-md ${errorETheme} col-span-2 p-2 font-light text-slate-500 shadow-inner`}
          />

          <label className=" border-none pt-2 text-sm text-slate-500">
            Password
          </label>
          <input
            onClick={() => setPassword("")}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="password"
            className={`rounded-md ${errorPWTheme} col-span-2 p-2 font-light text-slate-500 shadow-inner`}
          />

          <button
            onClick={(e) => {
              signInUser(e);
            }}
            className="col-span-2 mt-2 rounded-md border-none bg-sky-600 p-2 font-light text-slate-100 shadow-inner "
          >
            Connect
          </button>
          <div className="col-span-2 flex flex-row">
            <p className="mr-2 text-sky-600">Not registered yet ?</p>
            <Link href="/connection/register">
              <a className="font-extrabold text-sky-600 hover:underline">
                {" "}
                Sign in{" "}
              </a>
            </Link>
          </div>
        </form>
      </div>
    </MainLayoutNotConnected>
  );
}

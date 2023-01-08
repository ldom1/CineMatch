import Head from "next/head";
import React from "react";
import { useSession } from "next-auth/react";
import { NavBar, NavBarNotConnected } from "./NavBar";
import Footer from "./Footer";

export const MainLayout = ({ children }) => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>CineMatch</title>
        <meta
          name="CineMatch"
          content="Leave the scrolling to us – we'll find the best movies for you!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavBar />
        <section className="bg-white dark:bg-gray-900">
          <div className="container z-20 mx-auto px-4">
            <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
              <p className="font-light text-gray-500 dark:text-gray-400 sm:text-xl">
                Welcome, {session?.user?.name}, in <b>CineMatch</b>.
              </p>
            </div>
            {children}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export const MainLayoutNotConnected = ({ children }) => {
  return (
    <>
      <Head>
        <title>CineMatch</title>
        <meta
          name="CineMatch"
          content="Leave the scrolling to us – we'll find the best movies for you!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavBarNotConnected />
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: `url("/img/home.png")`,
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">
              CineMatch
              </h1>
              <p className="mb-5">Leave the scrolling to us – we'll find the best movies for you!</p>
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import Router from "next/router";

export function NavBar() {
  const [charging, setCharging] = useState(false);

  const activate = () => {
    setCharging(true);
  };
  const deactivate = () => {
    setCharging(false);
  };

  function onClickMobileMenu() {
    var mobileMenu = document.getElementById("mobile-menu");

    if (
      mobileMenu &&
      mobileMenu.className === "hidden w-full md:block md:w-auto"
    ) {
      mobileMenu.className = "visible w-full md:block md:w-auto";
    } else if (
      mobileMenu &&
      mobileMenu.className === "visible w-full md:block md:w-auto"
    ) {
      mobileMenu.className = "hidden w-full md:block md:w-auto";
    }
  }

  return (
    <nav className="rounded border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-900 sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/">
          <a className="flex items-center">
            <Image
              src="/img/logo.png"
              alt="logo"
              width={100}
              height={75}
            />
          </a>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClickMobileMenu}
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
            <li>
              <Link href="/" passHref>
                <a className="block rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href="rate-movies" passHref>
                <a className="block rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                  Rate movies
                </a>
              </Link>
            </li>
            <li>
              <Link href="/connection" passHref>
                <button
                  type="button"
                  className="block rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
                  onClick={() => signOut()}
                >
                  Log Out
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export function NavBarNotConnected() {
  const [charging, setCharging] = useState(false);

  const activate = () => {
    setCharging(true);
  };
  const deactivate = () => {
    setCharging(false);
  };

  function onClickMobileMenu() {
    var mobileMenu = document.getElementById("mobile-menu");

    if (
      mobileMenu &&
      mobileMenu.className === "hidden w-full md:block md:w-auto"
    ) {
      mobileMenu.className = "visible w-full md:block md:w-auto";
    } else if (
      mobileMenu &&
      mobileMenu.className === "visible w-full md:block md:w-auto"
    ) {
      mobileMenu.className = "hidden w-full md:block md:w-auto";
    }
  }

  return (
    <nav className="rounded border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-900 sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link href="/">
          <a className="flex items-center">
            <Image
              src="/img/logo.png"
              alt="logo"
              width={100}
              height={75}
            />
          </a>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClickMobileMenu}
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-gray-900">
            <li>
              <Link href="/connection" passHref>
                <a className="block rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                  Log In
                </a>
              </Link>
            </li>
            <li>
              <Link href="/connection/register" passHref>
                <a className="block rounded py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                  Register
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

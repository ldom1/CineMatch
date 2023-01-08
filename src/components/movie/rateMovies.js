import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { useSession } from "next-auth/react";
import Loading from "@layouts/Loading";
import RateOneMoviesCards from "./rateOneMovie";

export default function RateMoviesCards() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    setLoading(true);

    const userNameRequestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session.user?.email,
      }),
    };

    fetch("/api/get_username", userNameRequestOptions)
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.username);
      })
      .catch((err) =>
        console.log("rateMovies.tsx - Error fetching username:", err)
      );

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch("/api/movies", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((err) =>
        console.log("rateMovies.tsx - Error fetching movies:", err)
      );
  }, []);

  async function handleReloadMovies() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch("/api/movies_get_random", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((err) =>
        console.log("rateMovies.tsx - Error fetching random movies:", err)
      );
  }

  if (isLoading || !data) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16"></div>
        <hr className="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>
        <button
          type="button"
          className="mr-2 inline-flex items-center rounded-lg bg-blue-700 p-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleReloadMovies}
        >
          Reload movies&nbsp;
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="1 4 1 10 7 10"></polyline>
            <polyline points="23 20 23 14 17 14"></polyline>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
          </svg>
        </button>
        <hr className="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>
        <div className="flex grid gap-8 lg:grid-cols-2">
          {Array.isArray(data)
            ? data.map((movie, index) => {
                return (
                  <RateOneMoviesCards
                    key={index}
                    movie={movie}
                    username={userName}
                    index={index}
                  />
                );
              })
            : null}
        </div>
      </>
    );
  }
}

import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { useSession } from "next-auth/react";

export default function RateOneMoviesCards({ movie, username, index }) {
  const [movieSeen, setMovieSeen] = useState(false);
  const [oldMovieRate, setOldMovieRate] = useState(0);
  const [movieRate, setMovieRate] = useState(0);

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name: username,
        movie_name: movie.movie_name,
      }),
    };

    fetch("/api/user_rating_get", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setMovieSeen(data.rate_exist);
        setMovieRate(data.rate);
        setOldMovieRate(data.rate);
      })
      .catch((err) =>
        console.log(
          "rateOneMovie.tsx - Error fetching recommended movies:",
          err
        )
      );
  }, []);

  async function handleRateMovie() {
    try {
      var url = "/api/user_rating_update_or_create";
      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Accept-Encoding": "gzip, deflate",
        Connection: "keep-alive",
      };

      var body = {
        user_name: username,
        movie_name: movie.movie_name,
        movie_id: movie.movie_id,
        rate: movieRate,
      };
      await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      setMovieSeen(true);
    } catch (error) {
      var error_msg = `Form - Rate One ovie: Error fetching ${username} : ${error}`;
      console.log(error_msg);
    }
  }

  return (
    <article
      key={index}
      className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="mb-5 flex items-center justify-between text-gray-500">
        <span className="inline-flex items-center rounded bg-white px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-200 dark:text-primary-800"></span>
      </div>
      {movieSeen ? (
        <div className="mb-5 flex items-center justify-between text-gray-500">
          <span className="inline-flex items-center rounded bg-white px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-200 dark:text-primary-800"></span>
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Rating star</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
              {Math.round(movieRate * 100) / 100}
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
      <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {movie.movie_name}
      </h2>
      <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3>{movie.director}</h3>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h4>{movie.duration}</h4>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h4>{movie.category}</h4>
        </div>
      </div>
      <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
      <div className="flex grid gap-8 lg:grid-cols-2">
        <div>
          {movieSeen ? (
            <input
              type="range"
              min="10"
              max="100"
              defaultValue={oldMovieRate * 10}
              className="range-bg-blue-700 range"
              step="10"
              onChange={(e) => {
                setMovieRate(e.target.value / 10);
              }}
            />
          ) : (
            <input
              type="range"
              min="10"
              max="100"
              defaultValue="50"
              className="range-bg-blue-700 range"
              step="10"
              onChange={(e) => {
                setMovieRate(e.target.value / 10);
              }}
            />
          )}
          <div className="flex w-full justify-between px-2 text-xs">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>10</span>
          </div>
        </div>
        <div className="flex grid items-center justify-end">
          <button
            className="btn inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleRateMovie}
          >
            Rate !
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

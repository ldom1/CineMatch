import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { useSession } from "next-auth/react";
import Loading from "@layouts/Loading";

export default function RecommendedMovieCards() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setLoading(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_email: session.user?.email,
      }),
    };

    fetch("/api/recommended_movies", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((err) =>
        console.log(
          "recommendedMovies.tsx - Error fetching recommended movies:",
          err
        )
      );
  }, []);

  async function handleFitMlModelAndPredict() {
    setLoading(true);
    var url = "http://0.0.0.0:9999/fit_and_predict";
    var res = await fetch(url, {
      method: "POST",
      mode: "no-cors",
    });

    setLoading(false);
    Router.reload()
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
          onClick={handleFitMlModelAndPredict}
        >
          Launch model training
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 3C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3H5ZM19 19H5V8H19V19ZM5 5H19V6H5V5ZM7 7V9H9V7H7ZM11 7V9H13V7H11ZM15 7V9H17V7H15ZM7 11V13H9V11H7ZM11 11V13H13V11H11ZM15 11V13H17V11H15ZM7 15V17H9V15H7ZM11 15V17H13V15H11ZM15 15V17H17V15H15Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <hr className="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10"></hr>
        <div className="flex grid gap-8 lg:grid-cols-4">
          {Array.isArray(data)
            ? data.map((movie, index) => {
                return (
                  <article
                    key={index}
                    className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
                  >
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
                          {Math.round(movie.rate * 100) / 100}
                        </p>
                        <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400"></span>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          (Rank {movie.rank}/10)
                        </p>
                      </div>
                    </div>
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
                    <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
                    <div className="flex grid gap-8 lg:grid-cols-2">
                      <div className="flex grid items-center justify-between">
                        <p className="text-xs font-light leading-none text-gray-900 dark:text-gray-900">
                          {movie.category}
                        </p>
                      </div>
                      <div className="flex grid items-center justify-end">
                        <Link href={movie.movie_url} passHref>
                          <button
                            type="button"
                            className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            More
                            <svg
                              aria-hidden="true"
                              className="ml-2 -mr-1 h-5 w-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })
            : null}
        </div>
      </>
    );
  }
}

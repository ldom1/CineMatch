import React from "react";
import Link from "next/link";
import { MainLayout } from "../layouts/MainLayout";
import RecommendedMovieCards from "../components/movie/recommendedMovies"

export default function IndexConnectedPage() {
  return (
    <MainLayout>
      <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
        <p className="font-light text-gray-500 dark:text-gray-400 sm:text-xl">
        Leave the scrolling to us – we&apos;ll find the best movies for you!
        </p>
      </div>
      <RecommendedMovieCards />
    </MainLayout>
  );
}

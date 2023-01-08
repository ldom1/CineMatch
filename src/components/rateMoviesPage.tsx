import React from "react";
import Link from "next/link";
import { MainLayout } from "../layouts/MainLayout";
import RateMoviesCards from "../components/movie/rateMovies";

export default function RateMoviesPage() {
  return (
    <MainLayout>
      <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
        <p className="font-light text-gray-500 dark:text-gray-400 sm:text-xl">
          Rates the movies and we will find your next preferred ones!
        </p>
      </div>
      <RateMoviesCards />
    </MainLayout>
  );
}

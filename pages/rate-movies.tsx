import React from "react";
import { useSession } from "next-auth/react";
import IndexNotConnectedPage from "../src/components/indexNotConnectedPage";
import RateMoviesPage from "../src/components/rateMoviesPage";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return <IndexNotConnectedPage />;
  } else {
    return <RateMoviesPage />;
  }
}

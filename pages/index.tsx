import React from "react";
import { useSession } from "next-auth/react";
import IndexNotConnectedPage from "../src/components/indexNotConnectedPage";
import IndexConnectedPage from "../src/components/indexConnectedPage";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return <IndexNotConnectedPage />;
  } else {
    return <IndexConnectedPage />;
  }
}

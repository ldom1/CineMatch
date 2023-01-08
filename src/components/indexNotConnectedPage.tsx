import React from "react";
import Link from "next/link";
import { MainLayoutNotConnected } from "../layouts/MainLayout";

export default function IndexNotConnectedPage() {
    return (
      <MainLayoutNotConnected>
        <div className="flex flex-row items-center justify-center">
          <Link href="/connection" passHref>
            <button
              type="button"
              className="mr-2 mb-2 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Connect
            </button>
          </Link>
        </div>
      </MainLayoutNotConnected>
    );
  }
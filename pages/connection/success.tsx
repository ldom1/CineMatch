import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MainLayoutNotConnected } from "../../src/layouts/MainLayout"

export default function ValidationScreenTwo(props: any) {
  return (
    <MainLayoutNotConnected>
      <div
        className={`m-4 flex w-1/5 flex-col rounded-lg bg-green-200 p-2 shadow-lg`}
      >
        <h3 className="font-extrabold text-green-800">Congratulations !</h3>
        <p className="font-light text-green-800">Thank you for registering</p>
        <div className="flex flex-col">
          <p className="font-light text-green-800">
            You can now connect to your{" "}
            <Link href="/connection">
              <a className="font-extrabold text-sky-800 underline">account</a>
            </Link>
          </p>
        </div>
      </div>
    </MainLayoutNotConnected>
  );
}

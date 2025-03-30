import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { LibraryDashboard } from "@/components/LibraryDashboard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Library Management System Data Warehouse</title>
        <meta name="description" content="A data warehouse system for library management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <LibraryDashboard />
        </main>
      </div>
    </>
  );
}
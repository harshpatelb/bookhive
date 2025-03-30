import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { LibraryDashboard } from "@/components/LibraryDashboard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Library Management System</title>
        <meta name="description" content="A comprehensive system for library management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gradient-to-b from-slate-950 to-slate-900 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 pt-6">
          <LibraryDashboard />
        </main>
        <footer className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
          <div className="max-w-6xl mx-auto px-4">
            <p>© 2023 Library Management System. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
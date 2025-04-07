import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { LibraryDashboard } from "@/components/LibraryDashboard";
import { DatabaseTables } from "@/components/DatabaseTables";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Head>
        <title>BookHIVE - Library Management System</title>
        <meta name="description" content="A comprehensive system for library management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="bg-black min-h-screen flex flex-col">
        <Header />
        
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-black to-black z-0"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
                  <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-transparent bg-clip-text">
                    BookHIVE
                  </span>
                  <span className="block text-white mt-2">Library Management System</span>
                </h1>
                <p className="text-lg text-zinc-400 mb-8">
                  A powerful data warehouse solution for modern libraries. 
                  Manage books, members, and transactions with advanced analytics capabilities.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold"
                    onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Explore Dashboard
                  </Button>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 text-white font-semibold"
                    onClick={() => window.location.href = '/data-warehouse'}
                  >
                    Query Data Warehouse
                  </Button>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-black font-semibold"
                    onClick={() => window.location.href = '/data-entry'}
                  >
                    Add Data
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg blur opacity-30"></div>
                <div className="relative bg-black rounded-lg p-6 border border-amber-500/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-zinc-900 to-black p-4 rounded-lg border border-amber-500/20 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-amber-400 mb-2">1000+</span>
                      <span className="text-zinc-400 text-sm">Books Managed</span>
                    </div>
                    <div className="bg-gradient-to-br from-zinc-900 to-black p-4 rounded-lg border border-amber-500/20 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-amber-400 mb-2">500+</span>
                      <span className="text-zinc-400 text-sm">Active Members</span>
                    </div>
                    <div className="bg-gradient-to-br from-zinc-900 to-black p-4 rounded-lg border border-amber-500/20 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-amber-400 mb-2">5000+</span>
                      <span className="text-zinc-400 text-sm">Transactions</span>
                    </div>
                    <div className="bg-gradient-to-br from-zinc-900 to-black p-4 rounded-lg border border-amber-500/20 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-amber-400 mb-2">99%</span>
                      <span className="text-zinc-400 text-sm">Uptime</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <main id="dashboard" className="flex-1 p-4 md:p-6 lg:p-8 pt-6">
          <DatabaseTables />
          <LibraryDashboard />
        </main>
        
        <footer className="border-t border-amber-500/20 py-6 text-center text-sm text-zinc-500">
          <div className="max-w-6xl mx-auto px-4">
            <p>© 2023 BookHIVE Library Management System. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
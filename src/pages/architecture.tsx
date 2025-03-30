import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SchemaVisualization } from "@/components/SchemaVisualization";

export default function Architecture() {
  return (
    <>
      <Head>
        <title>Architecture - BookHIVE</title>
        <meta name="description" content="Data warehouse architecture for BookHIVE library management system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-black min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 pt-6">
          <div className="w-full max-w-6xl mx-auto">
            <Card className="shadow-lg border-none bg-gradient-to-br from-zinc-900 to-black">
              <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-t-lg border-b border-amber-500/20">
                <CardTitle className="text-3xl bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-transparent bg-clip-text">
                  Data Warehouse Architecture
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Understanding BookHIVE's database structure and data flow
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-xl border border-amber-500/20">
                    <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
                      MySQL (Source Databases)
                    </h3>
                    <p className="text-zinc-400 mb-4">
                      Stores transactional data from individual libraries including books, members, and transactions.
                    </p>
                    <ul className="space-y-2 text-zinc-300">
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span>Books table (title, author, genre, ISBN, publisher)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span>Members table (name, email, join date, status)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span>Transactions table (borrow/return records)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-xl border border-amber-500/20">
                    <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
                      MSSQL (Data Warehouse)
                    </h3>
                    <p className="text-zinc-400 mb-4">
                      Consolidates data from multiple MySQL sources for advanced querying and reporting.
                    </p>
                    <ul className="space-y-2 text-zinc-300">
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span><strong className="text-amber-400">Star Schema:</strong> Used for transactions with a central fact table linked to dimension tables</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span><strong className="text-amber-400">Snowflake Schema:</strong> Used for books and members with normalized dimension tables</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span><strong className="text-amber-400">ETL Process:</strong> Extracts data from MySQL, transforms it, and loads into the MSSQL warehouse</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
                      Star Schema (Transactions)
                    </h3>
                    <SchemaVisualization type="star" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
                      Snowflake Schema (Books)
                    </h3>
                    <SchemaVisualization type="snowflake" />
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
                    ETL Process
                  </h3>
                  <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-xl border border-amber-500/20">
                    <pre className="text-sm text-zinc-300 overflow-x-auto">
{`-- Example ETL SQL Commands

-- 1. Extract data from MySQL source
SELECT b.id, b.title, b.isbn, a.name as author, p.name as publisher, g.name as genre
FROM books b
JOIN authors a ON b.author_id = a.id
JOIN publishers p ON b.publisher_id = p.id
JOIN genres g ON b.genre_id = g.id;

-- 2. Transform data for the data warehouse
-- Clean and standardize data
SELECT 
  id,
  UPPER(title) as title_standardized,
  isbn,
  CASE 
    WHEN author LIKE '%,%' THEN SUBSTRING_INDEX(author, ',', 1)
    ELSE author
  END as author_lastname,
  publisher,
  genre
FROM extracted_books;

-- 3. Load data into MSSQL data warehouse
INSERT INTO Dim_Books (book_id, title, isbn, author_id, publisher_id, genre_id)
SELECT 
  t.id, 
  t.title_standardized,
  t.isbn,
  a.author_id,
  p.publisher_id,
  g.genre_id
FROM transformed_books t
JOIN Dim_Authors a ON t.author_lastname = a.author_lastname
JOIN Dim_Publishers p ON t.publisher = p.publisher_name
JOIN Dim_Genres g ON t.genre = g.genre_name;`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
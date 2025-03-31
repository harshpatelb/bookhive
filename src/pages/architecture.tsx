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
                <div className="grid grid-cols-1 gap-8 mb-8">
                  <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-xl border border-amber-500/20">
                    <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
                      BookHIVE System Architecture
                    </h3>
                    <p className="text-zinc-400 mb-4">
                      BookHIVE integrates data from two separate source databases into a unified data warehouse for comprehensive library management and analytics.
                    </p>
                    <div className="p-4 bg-black/50 rounded-lg border border-amber-500/10 mb-6">
                      <h4 className="text-lg font-medium text-amber-400 mb-2">System Overview</h4>
                      <p className="text-zinc-300 mb-3">
                        Our architecture consists of three main components:
                      </p>
                      <ol className="list-decimal pl-5 space-y-2 text-zinc-300">
                        <li>Source databases (MySQL) - UWindsor_Library and Windsor_PLibrary</li>
                        <li>ETL processing layer - Data extraction, transformation, and loading</li>
                        <li>Data warehouse (MSSQL) - Integrated repository with optimized schema for analytics</li>
                      </ol>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-xl border border-amber-500/20">
                    <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
                      Source Database 1: UWindsor_Library (MySQL)
                    </h3>
                    <p className="text-zinc-400 mb-4">
                      University library system with a focus on academic resources and university members.
                    </p>
                    <ul className="space-y-2 text-zinc-300">
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span><strong className="text-amber-400">books:</strong> Academic books, textbooks, research publications</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span><strong className="text-amber-400">members:</strong> Students, faculty, and university staff</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span><strong className="text-amber-400">loans:</strong> Book borrowing transactions with academic loan periods</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-black/70 rounded border border-amber-500/10">
                      <pre className="text-xs text-zinc-400 overflow-x-auto">
{`-- UWindsor_Library Schema
books (
  id INT PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  isbn VARCHAR(13),
  publisher VARCHAR(255),
  genre VARCHAR(100),
  publication_year INT
)

members (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  join_date DATE,
  member_type VARCHAR(50),
  status VARCHAR(20)
)

loans (
  id INT PRIMARY KEY,
  book_id INT,
  member_id INT,
  loan_date DATE,
  due_date DATE,
  return_date DATE,
  status VARCHAR(20)
)`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-xl border border-amber-500/20">
                    <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
                      Source Database 2: Windsor_PLibrary (MySQL)
                    </h3>
                    <p className="text-zinc-400 mb-4">
                      Public library system serving the broader Windsor community with diverse resources.
                    </p>
                    <ul className="space-y-2 text-zinc-300">
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span><strong className="text-amber-400">inventory:</strong> Fiction, non-fiction, multimedia resources</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span><strong className="text-amber-400">patrons:</strong> Community members of all ages and backgrounds</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span><strong className="text-amber-400">checkouts:</strong> Public lending with standard public library policies</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-black/70 rounded border border-amber-500/10">
                      <pre className="text-xs text-zinc-400 overflow-x-auto">
{`-- Windsor_PLibrary Schema
inventory (
  item_id INT PRIMARY KEY,
  title VARCHAR(255),
  creator VARCHAR(255),
  isbn VARCHAR(13),
  publisher VARCHAR(255),
  category VARCHAR(100),
  year_published INT
)

patrons (
  patron_id INT PRIMARY KEY,
  full_name VARCHAR(255),
  contact_email VARCHAR(255),
  registration_date DATE,
  patron_type VARCHAR(50),
  is_active BOOLEAN
)

checkouts (
  checkout_id INT PRIMARY KEY,
  item_id INT,
  patron_id INT,
  checkout_date DATE,
  expected_return DATE,
  actual_return DATE,
  checkout_status VARCHAR(20)
)`}
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-xl border border-amber-500/20 mb-8">
                  <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
                    BookHIVE Data Warehouse (MSSQL)
                  </h3>
                  <p className="text-zinc-400 mb-4">
                    Our data warehouse consolidates and transforms data from both source databases into optimized schemas for analytics and reporting.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-lg font-medium text-amber-400 mb-2">Star Schema (Transactions)</h4>
                      <p className="text-zinc-300 mb-3">
                        Optimized for transaction analysis with a central fact table connected to dimension tables.
                      </p>
                      <ul className="space-y-2 text-zinc-300">
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          <span><strong className="text-amber-400">Fact_Transactions:</strong> Central table with transaction metrics</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          <span><strong className="text-amber-400">Dim_Books:</strong> Book details from both libraries</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          <span><strong className="text-amber-400">Dim_Members:</strong> Unified member/patron information</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          <span><strong className="text-amber-400">Dim_Dates:</strong> Date dimension for time-based analysis</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-amber-400 mb-2">Snowflake Schema (Books)</h4>
                      <p className="text-zinc-300 mb-3">
                        Normalized structure for detailed book information and hierarchical relationships.
                      </p>
                      <ul className="space-y-2 text-zinc-300">
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          <span><strong className="text-amber-400">Dim_Books:</strong> Core book information</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          <span><strong className="text-amber-400">Dim_Authors:</strong> Normalized author details</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          <span><strong className="text-amber-400">Dim_Publishers:</strong> Publisher information</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          <span><strong className="text-amber-400">Dim_Genres:</strong> Genre categories and hierarchies</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-black/70 rounded border border-amber-500/10">
                    <h4 className="text-sm font-medium text-amber-400 mb-2">Data Warehouse Schema (Simplified)</h4>
                    <pre className="text-xs text-zinc-400 overflow-x-auto">
{`-- Star Schema for Transactions
Fact_Transactions (
  transaction_id INT PRIMARY KEY,
  book_key INT FOREIGN KEY REFERENCES Dim_Books(book_key),
  member_key INT FOREIGN KEY REFERENCES Dim_Members(member_key),
  date_key INT FOREIGN KEY REFERENCES Dim_Dates(date_key),
  transaction_type VARCHAR(20),
  source_system VARCHAR(50),
  loan_duration_days INT,
  is_overdue BIT,
  fine_amount DECIMAL(10,2)
)

-- Snowflake Schema for Books
Dim_Books (
  book_key INT PRIMARY KEY,
  source_id INT,
  source_system VARCHAR(50),
  title VARCHAR(255),
  isbn VARCHAR(13),
  author_key INT FOREIGN KEY REFERENCES Dim_Authors(author_key),
  publisher_key INT FOREIGN KEY REFERENCES Dim_Publishers(publisher_key),
  genre_key INT FOREIGN KEY REFERENCES Dim_Genres(genre_key),
  publication_year INT
)

Dim_Authors (
  author_key INT PRIMARY KEY,
  author_name VARCHAR(255),
  author_nationality VARCHAR(100)
)

Dim_Publishers (
  publisher_key INT PRIMARY KEY,
  publisher_name VARCHAR(255),
  publisher_location VARCHAR(100)
)

Dim_Genres (
  genre_key INT PRIMARY KEY,
  genre_name VARCHAR(100),
  genre_category VARCHAR(100),
  parent_genre_key INT
)`}
                    </pre>
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
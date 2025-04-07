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
                        <li>Source databases (MySQL) - UWindsor_Library and UToronto_Library</li>
                        <li>ETL processing layer - Data extraction, transformation, and loading</li>
                        <li>Data warehouse (MySQL) - Integrated repository with optimized schema for analytics</li>
                      </ol>
                    </div>
                    
                    <div className="p-4 bg-black/50 rounded-lg border border-amber-500/10 mb-6">
                      <h4 className="text-lg font-medium text-amber-400 mb-2">MySQL Workbench Implementation</h4>
                      <p className="text-zinc-300 mb-3">
                        The entire BookHIVE system is implemented using MySQL Workbench, which provides:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-zinc-300">
                        <li>Database design and modeling for source databases and data warehouse</li>
                        <li>SQL development environment for ETL processes and queries</li>
                        <li>Database administration tools for managing all system components</li>
                        <li>Visual data modeling with EER diagrams for schema design</li>
                        <li>Performance optimization tools for query analysis</li>
                      </ul>
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
{`-- UWindsor_Library Schema (MySQL)
CREATE DATABASE UWindsor_Library;
USE UWindsor_Library;

CREATE TABLE books (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  isbn VARCHAR(13),
  publisher VARCHAR(255),
  genre VARCHAR(100),
  publication_year INT,
  INDEX idx_isbn (isbn),
  INDEX idx_author (author)
);

CREATE TABLE members (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  join_date DATE NOT NULL,
  member_type VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  UNIQUE INDEX idx_email (email)
);

CREATE TABLE loans (
  id INT PRIMARY KEY AUTO_INCREMENT,
  book_id INT NOT NULL,
  member_id INT NOT NULL,
  loan_date DATE NOT NULL,
  due_date DATE NOT NULL,
  return_date DATE,
  status VARCHAR(20) DEFAULT 'active',
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (member_id) REFERENCES members(id),
  INDEX idx_loan_date (loan_date),
  INDEX idx_status (status)
);`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-xl border border-amber-500/20">
                    <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
                      Source Database 2: UToronto_Library (MySQL)
                    </h3>
                    <p className="text-zinc-400 mb-4">
                      University of Toronto library system with a comprehensive collection of academic and research resources.
                    </p>
                    <ul className="space-y-2 text-zinc-300">
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span><strong className="text-amber-400">inventory:</strong> Academic journals, research papers, specialized collections</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span><strong className="text-amber-400">patrons:</strong> Students, faculty, researchers, and visiting scholars</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span><strong className="text-amber-400">checkouts:</strong> Academic lending with research-oriented policies</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-black/70 rounded border border-amber-500/10">
                      <pre className="text-xs text-zinc-400 overflow-x-auto">
{`-- UToronto_Library Schema (MySQL)
CREATE DATABASE UToronto_Library;
USE UToronto_Library;

CREATE TABLE inventory (
  item_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  creator VARCHAR(255) NOT NULL,
  isbn VARCHAR(13),
  publisher VARCHAR(255),
  category VARCHAR(100),
  year_published INT,
  acquisition_date DATE,
  INDEX idx_isbn (isbn),
  INDEX idx_category (category)
);

CREATE TABLE patrons (
  patron_id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(255) NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  registration_date DATE NOT NULL,
  patron_type VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  UNIQUE INDEX idx_email (contact_email)
);

CREATE TABLE checkouts (
  checkout_id INT PRIMARY KEY AUTO_INCREMENT,
  item_id INT NOT NULL,
  patron_id INT NOT NULL,
  checkout_date DATE NOT NULL,
  expected_return DATE NOT NULL,
  actual_return DATE,
  checkout_status VARCHAR(20) DEFAULT 'active',
  FOREIGN KEY (item_id) REFERENCES inventory(item_id),
  FOREIGN KEY (patron_id) REFERENCES patrons(patron_id),
  INDEX idx_checkout_date (checkout_date),
  INDEX idx_status (checkout_status)
);`}
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-xl border border-amber-500/20 mb-8">
                  <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
                    BookHIVE Data Warehouse (MySQL)
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
                    <h4 className="text-sm font-medium text-amber-400 mb-2">Data Warehouse Schema (MySQL)</h4>
                    <pre className="text-xs text-zinc-400 overflow-x-auto">
{`-- BookHIVE Data Warehouse Schema (MySQL)
CREATE DATABASE BookHIVE_DW;
USE BookHIVE_DW;

-- Star Schema for Transactions
CREATE TABLE Dim_Books (
  book_key INT PRIMARY KEY AUTO_INCREMENT,
  source_id VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  isbn VARCHAR(13),
  author_key INT,
  publisher_key INT,
  genre_key INT,
  publication_year INT,
  source_system VARCHAR(50) NOT NULL,
  UNIQUE INDEX idx_source_id (source_id),
  INDEX idx_title (title),
  INDEX idx_isbn (isbn)
);

CREATE TABLE Dim_Members (
  member_key INT PRIMARY KEY AUTO_INCREMENT,
  source_id VARCHAR(50) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  join_date DATE,
  member_type VARCHAR(50),
  source_system VARCHAR(50) NOT NULL,
  UNIQUE INDEX idx_source_id (source_id),
  INDEX idx_name (last_name, first_name)
);

CREATE TABLE Dim_Dates (
  date_key INT PRIMARY KEY AUTO_INCREMENT,
  full_date DATE NOT NULL,
  day INT NOT NULL,
  month INT NOT NULL,
  year INT NOT NULL,
  quarter INT NOT NULL,
  is_weekend BOOLEAN NOT NULL,
  UNIQUE INDEX idx_full_date (full_date)
);

CREATE TABLE Fact_Transactions (
  transaction_id INT PRIMARY KEY AUTO_INCREMENT,
  book_key INT NOT NULL,
  member_key INT NOT NULL,
  date_key INT NOT NULL,
  transaction_type VARCHAR(20) NOT NULL,
  source_system VARCHAR(50) NOT NULL,
  loan_duration_days INT,
  is_overdue BOOLEAN,
  fine_amount DECIMAL(10,2),
  FOREIGN KEY (book_key) REFERENCES Dim_Books(book_key),
  FOREIGN KEY (member_key) REFERENCES Dim_Members(member_key),
  FOREIGN KEY (date_key) REFERENCES Dim_Dates(date_key),
  INDEX idx_transaction_type (transaction_type),
  INDEX idx_source_system (source_system)
);

-- Snowflake Schema for Books
CREATE TABLE Dim_Authors (
  author_key INT PRIMARY KEY AUTO_INCREMENT,
  author_name VARCHAR(255) NOT NULL,
  author_nationality VARCHAR(100),
  UNIQUE INDEX idx_author_name (author_name)
);

CREATE TABLE Dim_Publishers (
  publisher_key INT PRIMARY KEY AUTO_INCREMENT,
  publisher_name VARCHAR(255) NOT NULL,
  publisher_location VARCHAR(100),
  UNIQUE INDEX idx_publisher_name (publisher_name)
);

CREATE TABLE Dim_Genres (
  genre_key INT PRIMARY KEY AUTO_INCREMENT,
  genre_name VARCHAR(100) NOT NULL,
  genre_category VARCHAR(100),
  parent_genre_key INT,
  UNIQUE INDEX idx_genre_name (genre_name),
  FOREIGN KEY (parent_genre_key) REFERENCES Dim_Genres(genre_key)
);

-- Add foreign key constraints to Dim_Books
ALTER TABLE Dim_Books
ADD CONSTRAINT fk_author_key FOREIGN KEY (author_key) REFERENCES Dim_Authors(author_key),
ADD CONSTRAINT fk_publisher_key FOREIGN KEY (publisher_key) REFERENCES Dim_Publishers(publisher_key),
ADD CONSTRAINT fk_genre_key FOREIGN KEY (genre_key) REFERENCES Dim_Genres(genre_key);`}
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
{`-- Example ETL SQL Commands in MySQL Workbench

-- 1. Extract data from MySQL source databases
SELECT b.id, b.title, b.isbn, b.author, b.publisher, b.genre, b.publication_year, 'UWindsor_Library' as source
FROM UWindsor_Library.books b;

SELECT i.item_id, i.title, i.isbn, i.creator as author, i.publisher, i.category as genre, i.year_published, 'Windsor_PLibrary' as source
FROM Windsor_PLibrary.inventory i
WHERE i.category IN ('Book', 'Textbook', 'Reference');

-- 2. Transform data for the data warehouse
-- Create a temporary staging table
CREATE TEMPORARY TABLE staging_books (
  source_id VARCHAR(50),
  title VARCHAR(255),
  isbn VARCHAR(13),
  author VARCHAR(255),
  publisher VARCHAR(255),
  genre VARCHAR(100),
  publication_year INT,
  source_system VARCHAR(50)
);

-- Insert transformed data into staging
INSERT INTO staging_books
SELECT 
  CONCAT('UW-', id) as source_id,
  UPPER(title) as title,
  isbn,
  author,
  publisher,
  genre,
  publication_year,
  source
FROM extracted_uwindsor_books;

INSERT INTO staging_books
SELECT 
  CONCAT('PL-', item_id) as source_id,
  UPPER(title) as title,
  isbn,
  author,
  publisher,
  genre,
  publication_year,
  source
FROM extracted_plibrary_books;

-- 3. Load data into MySQL data warehouse
-- First load dimension tables
INSERT IGNORE INTO BookHIVE_DW.Dim_Authors (author_name)
SELECT DISTINCT author FROM staging_books;

INSERT IGNORE INTO BookHIVE_DW.Dim_Publishers (publisher_name)
SELECT DISTINCT publisher FROM staging_books WHERE publisher IS NOT NULL;

INSERT IGNORE INTO BookHIVE_DW.Dim_Genres (genre_name)
SELECT DISTINCT genre FROM staging_books WHERE genre IS NOT NULL;

-- Then load book dimension with foreign keys
INSERT INTO BookHIVE_DW.Dim_Books (source_id, title, isbn, author_key, publisher_key, genre_key, publication_year, source_system)
SELECT 
  s.source_id,
  s.title,
  s.isbn,
  a.author_key,
  p.publisher_key,
  g.genre_key,
  s.publication_year,
  s.source_system
FROM staging_books s
LEFT JOIN BookHIVE_DW.Dim_Authors a ON s.author = a.author_name
LEFT JOIN BookHIVE_DW.Dim_Publishers p ON s.publisher = p.publisher_name
LEFT JOIN BookHIVE_DW.Dim_Genres g ON s.genre = g.genre_name
WHERE s.source_id NOT IN (SELECT source_id FROM BookHIVE_DW.Dim_Books);`}
                    </pre>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
                    How to Run the BookHIVE System
                  </h3>
                  <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-xl border border-amber-500/20">
                    <ol className="list-decimal pl-5 space-y-4 text-zinc-300">
                      <li>
                        <strong className="text-amber-400">Install MySQL and MySQL Workbench:</strong>
                        <p className="mt-1 text-zinc-400">Download and install MySQL Server and MySQL Workbench from the official MySQL website.</p>
                      </li>
                      <li>
                        <strong className="text-amber-400">Set Up Source Databases:</strong>
                        <p className="mt-1 text-zinc-400">Run the UWindsor_Library and Windsor_PLibrary schema creation scripts in MySQL Workbench to create the source databases.</p>
                      </li>
                      <li>
                        <strong className="text-amber-400">Create the Data Warehouse:</strong>
                        <p className="mt-1 text-zinc-400">Execute the BookHIVE_DW schema creation script to set up the data warehouse structure.</p>
                      </li>
                      <li>
                        <strong className="text-amber-400">Load Sample Data:</strong>
                        <p className="mt-1 text-zinc-400">Use the provided sample data scripts to populate the source databases with initial data.</p>
                      </li>
                      <li>
                        <strong className="text-amber-400">Run ETL Process:</strong>
                        <p className="mt-1 text-zinc-400">Execute the ETL scripts to extract data from source databases, transform it, and load it into the data warehouse.</p>
                      </li>
                      <li>
                        <strong className="text-amber-400">Query the Data Warehouse:</strong>
                        <p className="mt-1 text-zinc-400">Use the predefined queries or create custom queries to analyze the integrated library data.</p>
                      </li>
                      <li>
                        <strong className="text-amber-400">Schedule Regular ETL Jobs:</strong>
                        <p className="mt-1 text-zinc-400">Set up MySQL Event Scheduler to automate regular ETL processes for keeping the data warehouse updated.</p>
                      </li>
                    </ol>
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
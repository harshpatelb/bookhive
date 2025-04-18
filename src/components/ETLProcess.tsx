import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export function ETLProcess() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <div className="bg-gradient-to-br from-amber-900 to-black p-5 rounded-md text-center w-full md:w-64 border border-amber-500/30">
          <h3 className="font-bold mb-2 text-amber-400">Extract</h3>
          <p className="text-sm text-zinc-300">
            Data is extracted from MySQL source databases containing library transaction records
          </p>
        </div>
        
        <div className="hidden md:block text-2xl text-amber-500">→</div>
        <div className="block md:hidden text-2xl text-amber-500">↓</div>
        
        <div className="bg-gradient-to-br from-amber-900 to-black p-5 rounded-md text-center w-full md:w-64 border border-amber-500/30">
          <h3 className="font-bold mb-2 text-amber-400">Transform</h3>
          <p className="text-sm text-zinc-300">
            Data is cleaned, standardized, and restructured to fit the data warehouse schema
          </p>
        </div>
        
        <div className="hidden md:block text-2xl text-amber-500">→</div>
        <div className="block md:hidden text-2xl text-amber-500">↓</div>
        
        <div className="bg-gradient-to-br from-amber-900 to-black p-5 rounded-md text-center w-full md:w-64 border border-amber-500/30">
          <h3 className="font-bold mb-2 text-amber-400">Load</h3>
          <p className="text-sm text-zinc-300">
            Transformed data is loaded into MySQL data warehouse using Star and Snowflake schemas
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-amber-500/20">
          <CardContent className="p-5">
            <h4 className="font-semibold text-amber-400 mb-3">Extract Process</h4>
            <ul className="space-y-2 text-zinc-300">
              {[
                "Connect to MySQL databases using MySQL Workbench",
                "Execute SELECT queries on UWindsor and Windsor Public Library tables",
                "Store extracted data in temporary tables for transformation",
                "Use MySQL Workbench's data export functionality for large datasets",
                "Track changes using timestamps for incremental loads"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-900 border-amber-500/20">
          <CardContent className="p-5">
            <h4 className="font-semibold text-amber-400 mb-3">Transform Process</h4>
            <ul className="space-y-2 text-zinc-300">
              {[
                "Create staging tables in MySQL for transformation",
                "Use MySQL string functions to standardize text data",
                "Apply CASE statements for conditional transformations",
                "Generate surrogate keys for dimension tables",
                "Perform data type conversions and validation",
                "Handle NULL values with COALESCE and IFNULL functions"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-900 border-amber-500/20">
          <CardContent className="p-5">
            <h4 className="font-semibold text-amber-400 mb-3">Load Process</h4>
            <ul className="space-y-2 text-zinc-300">
              {[
                "Use INSERT IGNORE for dimension tables to avoid duplicates",
                "Implement INSERT...ON DUPLICATE KEY UPDATE for updates",
                "Create foreign key relationships between tables",
                "Build indexes for optimized query performance",
                "Use MySQL transactions for data integrity",
                "Schedule regular loads with MySQL Event Scheduler"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-zinc-900 p-5 rounded-md border border-amber-500/20">
        <h4 className="font-semibold text-amber-400 mb-3">MySQL Workbench ETL Implementation</h4>
        <pre className="bg-zinc-800 p-4 rounded-md overflow-x-auto text-sm text-zinc-300">
{`-- MySQL Workbench ETL Implementation

-- 1. Extract: Create temporary tables to hold extracted data
CREATE TEMPORARY TABLE temp_uwindsor_books AS
SELECT 
  b.id, 
  b.title, 
  b.isbn, 
  b.author, 
  b.publisher, 
  b.genre,
  b.publication_year,
  'UWindsor_Library' as source
FROM UWindsor_Library.books b;

CREATE TEMPORARY TABLE temp_windsor_plibrary_books AS
SELECT 
  i.item_id, 
  i.title, 
  i.isbn, 
  i.creator as author, 
  i.publisher, 
  i.category as genre,
  i.year_published,
  'Windsor_PLibrary' as source
FROM Windsor_PLibrary.inventory i
WHERE i.category IN ('Book', 'Textbook', 'Reference');

-- 2. Transform: Create and populate staging table with transformed data
CREATE TABLE BookHIVE_DW.staging_books (
  source_id VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  isbn VARCHAR(13),
  author VARCHAR(255) NOT NULL,
  publisher VARCHAR(255),
  genre VARCHAR(100),
  publication_year INT,
  source_system VARCHAR(50) NOT NULL,
  PRIMARY KEY (source_id)
);

-- Transform UWindsor data and insert into staging
INSERT INTO BookHIVE_DW.staging_books
SELECT 
  CONCAT('UW-', id) as source_id,
  UPPER(TRIM(title)) as title,
  CASE 
    WHEN isbn IS NULL OR isbn = '' THEN NULL
    WHEN LENGTH(isbn) < 10 THEN NULL
    ELSE isbn
  END as isbn,
  TRIM(author) as author,
  NULLIF(TRIM(publisher), '') as publisher,
  NULLIF(TRIM(genre), '') as genre,
  CASE
    WHEN publication_year < 1800 OR publication_year > YEAR(CURRENT_DATE) THEN NULL
    ELSE publication_year
  END as publication_year,
  source
FROM temp_uwindsor_books;

-- Transform Windsor Public Library data and insert into staging
INSERT INTO BookHIVE_DW.staging_books
SELECT 
  CONCAT('PL-', item_id) as source_id,
  UPPER(TRIM(title)) as title,
  CASE 
    WHEN isbn IS NULL OR isbn = '' THEN NULL
    WHEN LENGTH(isbn) < 10 THEN NULL
    ELSE isbn
  END as isbn,
  TRIM(author) as author,
  NULLIF(TRIM(publisher), '') as publisher,
  NULLIF(TRIM(genre), '') as genre,
  CASE
    WHEN year_published < 1800 OR year_published > YEAR(CURRENT_DATE) THEN NULL
    ELSE year_published
  END as publication_year,
  source
FROM temp_windsor_plibrary_books;

-- 3. Load: Populate dimension and fact tables
-- First ensure dimension tables exist
INSERT IGNORE INTO BookHIVE_DW.Dim_Authors (author_name)
SELECT DISTINCT author FROM BookHIVE_DW.staging_books;

INSERT IGNORE INTO BookHIVE_DW.Dim_Publishers (publisher_name)
SELECT DISTINCT publisher FROM BookHIVE_DW.staging_books 
WHERE publisher IS NOT NULL;

INSERT IGNORE INTO BookHIVE_DW.Dim_Genres (genre_name)
SELECT DISTINCT genre FROM BookHIVE_DW.staging_books 
WHERE genre IS NOT NULL;

-- Load book dimension with foreign keys
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
FROM BookHIVE_DW.staging_books s
LEFT JOIN BookHIVE_DW.Dim_Authors a ON s.author = a.author_name
LEFT JOIN BookHIVE_DW.Dim_Publishers p ON s.publisher = p.publisher_name
LEFT JOIN BookHIVE_DW.Dim_Genres g ON s.genre = g.genre_name
ON DUPLICATE KEY UPDATE
  title = s.title,
  isbn = s.isbn,
  author_key = a.author_key,
  publisher_key = p.publisher_key,
  genre_key = g.genre_key,
  publication_year = s.publication_year;

-- Clean up staging table for next ETL run
TRUNCATE TABLE BookHIVE_DW.staging_books;`}
        </pre>
      </div>
      
      <div className="bg-zinc-900 p-5 rounded-md border border-amber-500/20">
        <h4 className="font-semibold text-amber-400 mb-3">MySQL Event Scheduler for Automated ETL</h4>
        <pre className="bg-zinc-800 p-4 rounded-md overflow-x-auto text-sm text-zinc-300">
{`-- Enable MySQL Event Scheduler
SET GLOBAL event_scheduler = ON;

-- Create an event for daily ETL process
CREATE EVENT IF NOT EXISTS daily_etl_process
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP + INTERVAL 1 DAY
DO
BEGIN
  -- Call stored procedures for ETL process
  CALL BookHIVE_DW.extract_source_data();
  CALL BookHIVE_DW.transform_staging_data();
  CALL BookHIVE_DW.load_warehouse_data();
  
  -- Log ETL completion
  INSERT INTO BookHIVE_DW.etl_log (process_name, start_time, end_time, status)
  VALUES ('Daily ETL', NOW() - INTERVAL 1 HOUR, NOW(), 'Completed');
END;

-- Create stored procedure for extraction
DELIMITER //
CREATE PROCEDURE BookHIVE_DW.extract_source_data()
BEGIN
  -- Extraction logic here
  -- Similar to the extraction code shown above
END //
DELIMITER ;

-- Create stored procedures for transformation and loading
-- Similar structure to the above procedure`}
        </pre>
      </div>
    </div>
  );
}
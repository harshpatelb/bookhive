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
                "Connect to MySQL databases from UWindsor and Windsor Public Library",
                "Query tables for books, members, and transactions",
                "Schedule regular extraction jobs (daily/weekly)",
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
                "Clean data (remove duplicates, fix formatting)",
                "Standardize values (uppercase titles, format dates)",
                "Split complex fields into separate dimensions",
                "Create surrogate keys for dimension tables",
                "Apply business rules and calculations"
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
                "Load dimension tables first (Books, Members, Dates)",
                "Load fact tables with foreign keys to dimensions",
                "Validate data integrity with constraints",
                "Create indexes for query optimization",
                "Archive processed data for auditing"
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
        <h4 className="font-semibold text-amber-400 mb-3">Sample ETL SQL Code</h4>
        <pre className="bg-zinc-800 p-4 rounded-md overflow-x-auto text-sm text-zinc-300">
{`-- Create a staging table for extracted data
CREATE TABLE staging_books (
  id INT,
  title VARCHAR(255),
  isbn VARCHAR(20),
  author VARCHAR(100),
  publisher VARCHAR(100),
  genre VARCHAR(50),
  source VARCHAR(50)
);

-- Extract data from UWindsor Library
INSERT INTO staging_books
SELECT 
  book_id, 
  title, 
  isbn, 
  author, 
  NULL as publisher, 
  NULL as genre,
  'UWindsor_Library' as source
FROM UWindsor_Library.books;

-- Extract data from Windsor Public Library
INSERT INTO staging_books
SELECT 
  item_id, 
  title, 
  NULL as isbn, 
  creator as author, 
  NULL as publisher, 
  type as genre,
  'Windsor_PLibrary' as source
FROM Windsor_PLibrary.inventory
WHERE type = 'Book';

-- Transform data
UPDATE staging_books
SET 
  title = UPPER(title),
  author = CASE 
    WHEN author LIKE '%,%' THEN SUBSTRING_INDEX(author, ',', 1)
    ELSE author
  END;

-- Load data into dimension tables
INSERT INTO dim_books (book_key, source_id, title, author, isbn, source_system)
SELECT 
  UUID() as book_key,
  CONCAT(source, '-', id) as source_id,
  title,
  author,
  COALESCE(isbn, 'N/A') as isbn,
  source
FROM staging_books
WHERE CONCAT(source, '-', id) NOT IN (SELECT source_id FROM dim_books);`}
        </pre>
      </div>
    </div>
  );
}
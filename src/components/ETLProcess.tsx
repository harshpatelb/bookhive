import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export function ETLProcess() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <div className="bg-blue-900 text-white p-4 rounded-md text-center w-full md:w-64">
          <h3 className="font-bold mb-2">Extract</h3>
          <p className="text-xs text-blue-200">
            Data is extracted from MySQL source databases containing library transaction records
          </p>
        </div>
        
        <div className="hidden md:block text-2xl">→</div>
        <div className="block md:hidden text-2xl">↓</div>
        
        <div className="bg-purple-900 text-white p-4 rounded-md text-center w-full md:w-64">
          <h3 className="font-bold mb-2">Transform</h3>
          <p className="text-xs text-purple-200">
            Data is cleaned, standardized, and restructured to fit the data warehouse schema
          </p>
        </div>
        
        <div className="hidden md:block text-2xl">→</div>
        <div className="block md:hidden text-2xl">↓</div>
        
        <div className="bg-green-900 text-white p-4 rounded-md text-center w-full md:w-64">
          <h3 className="font-bold mb-2">Load</h3>
          <p className="text-xs text-green-200">
            Transformed data is loaded into MSSQL data warehouse using Star and Snowflake schemas
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <h4 className="font-semibold text-sm mb-2">Extract Process</h4>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
              <li>Connect to MySQL databases from multiple library branches</li>
              <li>Query tables for books, members, and transactions</li>
              <li>Schedule regular extraction jobs (daily/weekly)</li>
              <li>Track changes using timestamps for incremental loads</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <h4 className="font-semibold text-sm mb-2">Transform Process</h4>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
              <li>Clean data (remove duplicates, fix formatting)</li>
              <li>Standardize values (uppercase titles, format dates)</li>
              <li>Split complex fields into separate dimensions</li>
              <li>Create surrogate keys for dimension tables</li>
              <li>Apply business rules and calculations</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <h4 className="font-semibold text-sm mb-2">Load Process</h4>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
              <li>Load dimension tables first (Books, Members, Dates)</li>
              <li>Load fact tables with foreign keys to dimensions</li>
              <li>Validate data integrity with constraints</li>
              <li>Create indexes for query optimization</li>
              <li>Archive processed data for auditing</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-slate-800 p-4 rounded-md">
        <h4 className="font-semibold text-sm mb-2">Sample ETL SQL Code</h4>
        <pre className="text-xs text-slate-300 overflow-x-auto">
{`-- Create a staging table for extracted data
CREATE TABLE staging_books (
  id INT,
  title VARCHAR(255),
  isbn VARCHAR(20),
  author VARCHAR(100),
  publisher VARCHAR(100),
  genre VARCHAR(50)
);

-- Extract data from MySQL source
INSERT INTO staging_books
SELECT b.id, b.title, b.isbn, a.name, p.name, g.name
FROM mysql_source.books b
JOIN mysql_source.authors a ON b.author_id = a.id
JOIN mysql_source.publishers p ON b.publisher_id = p.id
JOIN mysql_source.genres g ON b.genre_id = g.id;

-- Transform data
UPDATE staging_books
SET 
  title = UPPER(title),
  author = CASE 
    WHEN author LIKE '%,%' THEN SUBSTRING_INDEX(author, ',', 1)
    ELSE author
  END;

-- Load data into dimension tables
INSERT INTO Dim_Authors (author_name)
SELECT DISTINCT author FROM staging_books
WHERE author NOT IN (SELECT author_name FROM Dim_Authors);

-- Load data into fact tables
INSERT INTO Fact_Transactions (book_key, member_key, date_key, status_key)
SELECT 
  b.book_key, 
  m.member_key, 
  d.date_key,
  s.status_key
FROM staging_transactions t
JOIN Dim_Books b ON t.book_id = b.source_book_id
JOIN Dim_Members m ON t.member_id = m.source_member_id
JOIN Dim_Dates d ON t.transaction_date = d.date
JOIN Dim_Status s ON t.status = s.status_name;`}
        </pre>
      </div>
    </div>
  );
}
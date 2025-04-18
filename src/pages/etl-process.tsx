import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ETLProcess } from "@/components/ETLProcess";

export default function ETLProcessPage() {
  return (
    <>
      <Head>
        <title>ETL Process - BookHIVE</title>
        <meta name="description" content="Extract, Transform, Load process for BookHIVE data warehouse" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-black min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 pt-6">
          <div className="w-full max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
                ETL Process
              </h1>
              <p className="text-zinc-400 mt-2">
                How data flows from source systems to the data warehouse using MySQL Workbench
              </p>
            </div>
            
            <Card className="shadow-lg border-none bg-gradient-to-br from-zinc-900 to-black mb-8">
              <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-t-lg border-b border-amber-500/20">
                <CardTitle className="text-amber-400">MySQL Workbench Implementation</CardTitle>
                <CardDescription className="text-zinc-400">
                  How to run the ETL process in MySQL Workbench
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-xl border border-amber-500/20">
                  <ol className="list-decimal pl-5 space-y-4 text-zinc-300">
                    <li>
                      <strong className="text-amber-400">Open MySQL Workbench:</strong>
                      <p className="mt-1 text-zinc-400">Launch MySQL Workbench and connect to your MySQL server instance.</p>
                    </li>
                    <li>
                      <strong className="text-amber-400">Create Source Databases:</strong>
                      <p className="mt-1 text-zinc-400">Execute the UWindsor_Library and UToronto_Library schema creation scripts.</p>
                    </li>
                    <li>
                      <strong className="text-amber-400">Create Data Warehouse Database:</strong>
                      <p className="mt-1 text-zinc-400">Run the BookHIVE_DW schema creation script to set up the data warehouse structure.</p>
                    </li>
                    <li>
                      <strong className="text-amber-400">Create ETL Stored Procedures:</strong>
                      <p className="mt-1 text-zinc-400">Set up stored procedures for extraction, transformation, and loading processes.</p>
                    </li>
                    <li>
                      <strong className="text-amber-400">Run ETL Process:</strong>
                      <p className="mt-1 text-zinc-400">Execute the ETL stored procedures to populate the data warehouse.</p>
                    </li>
                    <li>
                      <strong className="text-amber-400">Schedule Automated ETL:</strong>
                      <p className="mt-1 text-zinc-400">Configure MySQL Event Scheduler to run the ETL process automatically at scheduled intervals.</p>
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-none bg-gradient-to-br from-zinc-900 to-black mb-8">
              <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-t-lg border-b border-amber-500/20">
                <CardTitle className="text-amber-400">ETL Workflow</CardTitle>
                <CardDescription className="text-zinc-400">
                  Extract, Transform, Load process for integrating library data
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-8">
                  <ETLProcess />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-none bg-gradient-to-br from-zinc-900 to-black">
              <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-t-lg border-b border-amber-500/20">
                <CardTitle className="text-amber-400">Data Integration Details</CardTitle>
                <CardDescription className="text-zinc-400">
                  How data from UWindsor Library and University of Toronto Library is integrated
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="extraction">
                  <TabsList className="w-full bg-zinc-800">
                    <TabsTrigger value="extraction" className="data-[state=active]:bg-amber-900/50">Extraction</TabsTrigger>
                    <TabsTrigger value="transformation" className="data-[state=active]:bg-amber-900/50">Transformation</TabsTrigger>
                    <TabsTrigger value="loading" className="data-[state=active]:bg-amber-900/50">Loading</TabsTrigger>
                    <TabsTrigger value="scheduling" className="data-[state=active]:bg-amber-900/50">Scheduling</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="extraction" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-xl border border-amber-500/20">
                        <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
                          UWindsor Library Extraction
                        </h3>
                        <p className="text-zinc-400 mb-4">
                          Data is extracted from the university library MySQL database.
                        </p>
                        <pre className="bg-zinc-800 p-4 rounded-md overflow-x-auto text-sm text-zinc-300">
{`-- Extract books data
SELECT 
  book_id, 
  title, 
  author, 
  isbn, 
  publication_year, 
  status
FROM books;

-- Extract members data
SELECT 
  member_id, 
  first_name, 
  last_name, 
  email, 
  join_date
FROM members;

-- Extract loans data
SELECT 
  loan_id, 
  book_id, 
  member_id, 
  loan_date, 
  return_date
FROM loans;`}
                        </pre>
                      </div>
                      
                      <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-xl border border-amber-500/20">
                        <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
                          University of Toronto Library Extraction
                        </h3>
                        <p className="text-zinc-400 mb-4">
                          Data is extracted from the UToronto library MySQL database.
                        </p>
                        <pre className="bg-zinc-800 p-4 rounded-md overflow-x-auto text-sm text-zinc-300">
{`-- Extract inventory data
SELECT 
  item_id, 
  title, 
  creator as author, 
  type, 
  acquisition_date, 
  status
FROM inventory;

-- Extract patrons data
SELECT 
  patron_id, 
  full_name, 
  contact_email, 
  patron_type, 
  registration_date
FROM patrons;

-- Extract checkouts data
SELECT 
  checkout_id, 
  item_id, 
  patron_id, 
  checkout_date, 
  expected_return
FROM checkouts;`}
                        </pre>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="transformation" className="mt-6">
                    <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-xl border border-amber-500/20">
                      <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
                        Data Transformation Process
                      </h3>
                      <p className="text-zinc-400 mb-4">
                        Standardizing and harmonizing data from different sources.
                      </p>
                      <pre className="bg-zinc-800 p-4 rounded-md overflow-x-auto text-sm text-zinc-300">
{`-- Standardize book/item data
SELECT 
  CASE 
    WHEN source = 'UWindsor_Library' THEN CONCAT('UW-', book_id)
    WHEN source = 'UToronto_Library' THEN CONCAT('UT-', item_id)
  END as source_id,
  UPPER(title) as title_standardized,
  author,
  COALESCE(isbn, 'N/A') as isbn_standardized,
  COALESCE(publication_year, YEAR(acquisition_date)) as year_standardized,
  source
FROM staging_books;

-- Split patron names into first and last name
UPDATE staging_members
SET 
  first_name = SUBSTRING_INDEX(name, ' ', 1),
  last_name = SUBSTRING_INDEX(name, ' ', -1)
WHERE source = 'PublicLib';

-- Calculate loan duration for fact table
SELECT 
  loan_id,
  book_id,
  member_id,
  loan_date,
  return_date,
  CASE 
    WHEN return_date IS NOT NULL THEN DATEDIFF(return_date, loan_date)
    ELSE NULL
  END as loan_duration_days,
  source
FROM staging_loans;`}
                      </pre>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="loading" className="mt-6">
                    <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-xl border border-amber-500/20">
                      <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
                        Data Loading Process
                      </h3>
                      <p className="text-zinc-400 mb-4">
                        Loading transformed data into the data warehouse dimension and fact tables.
                      </p>
                      <pre className="bg-zinc-800 p-4 rounded-md overflow-x-auto text-sm text-zinc-300">
{`-- Load dimension tables first
INSERT INTO dim_books (book_key, source_id, title, author, isbn, publication_year, source_system)
SELECT 
  NEXT VALUE FOR seq_book_key,
  source_id,
  title_standardized,
  author,
  isbn_standardized,
  year_standardized,
  source
FROM transformed_books
WHERE source_id NOT IN (SELECT source_id FROM dim_books);

INSERT INTO dim_members (member_key, source_id, first_name, last_name, email, join_date, source_system)
SELECT 
  NEXT VALUE FOR seq_member_key,
  source_id,
  first_name,
  last_name,
  email,
  join_date,
  source
FROM transformed_members
WHERE source_id NOT IN (SELECT source_id FROM dim_members);

-- Load fact table with foreign keys to dimensions
INSERT INTO fact_loans (loan_key, book_key, member_key, loan_date, return_date, loan_duration_days, source_system)
SELECT 
  NEXT VALUE FOR seq_loan_key,
  b.book_key,
  m.member_key,
  l.loan_date,
  l.return_date,
  l.loan_duration_days,
  l.source
FROM transformed_loans l
JOIN dim_books b ON l.book_id = b.source_id
JOIN dim_members m ON l.member_id = m.source_id
WHERE l.loan_id NOT IN (SELECT source_loan_id FROM fact_loans);`}
                      </pre>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="scheduling" className="mt-6">
                    <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-xl border border-amber-500/20">
                      <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
                        ETL Scheduling and Monitoring
                      </h3>
                      <p className="text-zinc-400 mb-4">
                        How the ETL process is scheduled and monitored.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-medium text-amber-400 mb-2">Scheduling</h4>
                          <ul className="space-y-2 text-zinc-300">
                            <li className="flex items-start">
                              <span className="text-amber-500 mr-2">•</span>
                              <span>Full load: Weekly on Sunday at 2:00 AM</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-amber-500 mr-2">•</span>
                              <span>Incremental load: Daily at 3:00 AM</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-amber-500 mr-2">•</span>
                              <span>Real-time critical updates: Every 15 minutes</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-amber-500 mr-2">•</span>
                              <span>Automated retry mechanism for failed jobs</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-amber-400 mb-2">Monitoring</h4>
                          <ul className="space-y-2 text-zinc-300">
                            <li className="flex items-start">
                              <span className="text-amber-500 mr-2">•</span>
                              <span>ETL job logging with detailed execution metrics</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-amber-500 mr-2">•</span>
                              <span>Error notification system via email and SMS</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-amber-500 mr-2">•</span>
                              <span>Data quality checks with validation rules</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-amber-500 mr-2">•</span>
                              <span>Performance dashboards for ETL process metrics</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
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
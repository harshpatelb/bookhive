import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SchemaVisualization } from "@/components/SchemaVisualization";
import { ETLProcess } from "@/components/ETLProcess";

// Mock data for demonstration
const mockBooks = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", isbn: "9780061120084", publisher: "HarperCollins" },
  { id: 2, title: "1984", author: "George Orwell", genre: "Dystopian", isbn: "9780451524935", publisher: "Penguin Books" },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", isbn: "9780743273565", publisher: "Scribner" },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", isbn: "9780141439518", publisher: "Penguin Classics" },
  { id: 5, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", isbn: "9780547928227", publisher: "Houghton Mifflin" },
];

const mockMembers = [
  { id: 101, name: "John Smith", email: "john@example.com", joinDate: "2023-01-15", status: "Active" },
  { id: 102, name: "Sarah Johnson", email: "sarah@example.com", joinDate: "2023-02-20", status: "Active" },
  { id: 103, name: "Michael Brown", email: "michael@example.com", joinDate: "2023-03-10", status: "Inactive" },
  { id: 104, name: "Emily Davis", email: "emily@example.com", joinDate: "2023-04-05", status: "Active" },
];

const mockTransactions = [
  { id: 1001, bookId: 1, memberId: 101, borrowDate: "2023-05-01", dueDate: "2023-05-15", returnDate: "2023-05-14", status: "Returned" },
  { id: 1002, bookId: 2, memberId: 102, borrowDate: "2023-05-05", dueDate: "2023-05-19", returnDate: null, status: "Borrowed" },
  { id: 1003, bookId: 3, memberId: 101, borrowDate: "2023-05-10", dueDate: "2023-05-24", returnDate: null, status: "Borrowed" },
  { id: 1004, bookId: 4, memberId: 103, borrowDate: "2023-04-20", dueDate: "2023-05-04", returnDate: "2023-05-06", status: "Returned Late" },
];

export function LibraryDashboard() {
  const [activeTab, setActiveTab] = useState("books");
  const [searchTerm, setSearchTerm] = useState("");
  const [reportType, setReportType] = useState("overdue");

  // Filter books based on search term
  const filteredBooks = mockBooks.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter members based on search term
  const filteredMembers = mockMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate reports based on selected type
  const generateReport = () => {
    if (reportType === "overdue") {
      return mockTransactions.filter(t => 
        t.returnDate === null && new Date(t.dueDate) < new Date()
      );
    } else if (reportType === "borrowHistory") {
      return mockTransactions;
    }
    return [];
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Library Management System Data Warehouse</CardTitle>
          <CardDescription>
            A unified system integrating MySQL (transactional data) and MSSQL (data warehouse) for efficient library data management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <Input 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="books">Books</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="etl">ETL Process</TabsTrigger>
            </TabsList>
            
            <TabsContent value="books">
              <Card>
                <CardHeader>
                  <CardTitle>Books Database</CardTitle>
                  <CardDescription>Part of the Snowflake Schema in the data warehouse</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Genre</TableHead>
                        <TableHead>ISBN</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBooks.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell>{book.id}</TableCell>
                          <TableCell>{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>{book.genre}</TableCell>
                          <TableCell>{book.isbn}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="members">
              <Card>
                <CardHeader>
                  <CardTitle>Members Database</CardTitle>
                  <CardDescription>Part of the Snowflake Schema in the data warehouse</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMembers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>{member.id}</TableCell>
                          <TableCell>{member.name}</TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>{member.joinDate}</TableCell>
                          <TableCell>{member.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>Transactions Database</CardTitle>
                  <CardDescription>Implemented as a Star Schema in the data warehouse</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Book ID</TableHead>
                        <TableHead>Member ID</TableHead>
                        <TableHead>Borrow Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Return Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.id}</TableCell>
                          <TableCell>{transaction.bookId}</TableCell>
                          <TableCell>{transaction.memberId}</TableCell>
                          <TableCell>{transaction.borrowDate}</TableCell>
                          <TableCell>{transaction.dueDate}</TableCell>
                          <TableCell>{transaction.returnDate || "Not returned"}</TableCell>
                          <TableCell>{transaction.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>Data warehouse analytics and reporting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    <Select value={reportType} onValueChange={setReportType}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="overdue">Overdue Books</SelectItem>
                        <SelectItem value="borrowHistory">Borrow History</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button>Generate Report</Button>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Book ID</TableHead>
                        <TableHead>Member ID</TableHead>
                        <TableHead>Borrow Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {generateReport().map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>{report.id}</TableCell>
                          <TableCell>{report.bookId}</TableCell>
                          <TableCell>{report.memberId}</TableCell>
                          <TableCell>{report.borrowDate}</TableCell>
                          <TableCell>{report.dueDate}</TableCell>
                          <TableCell>{report.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="etl">
              <Card>
                <CardHeader>
                  <CardTitle>ETL Process</CardTitle>
                  <CardDescription>Extract, Transform, Load pipeline for data warehousing</CardDescription>
                </CardHeader>
                <CardContent>
                  <ETLProcess />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Warehouse Architecture</CardTitle>
          <CardDescription>Understanding the system's database structure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">MySQL (Source Databases)</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Stores transactional data from individual libraries including books, members, and transactions.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Books table (title, author, genre, ISBN, publisher)</li>
                <li>Members table (name, email, join date, status)</li>
                <li>Transactions table (borrow/return records)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">MSSQL (Data Warehouse)</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Consolidates data from multiple MySQL sources for advanced querying and reporting.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><strong>Star Schema:</strong> Used for transactions with a central fact table linked to dimension tables</li>
                <li><strong>Snowflake Schema:</strong> Used for books and members with normalized dimension tables</li>
                <li><strong>ETL Process:</strong> Extracts data from MySQL, transforms it, and loads into the MSSQL warehouse</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Star Schema (Transactions)</h3>
              <SchemaVisualization type="star" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Snowflake Schema (Books)</h3>
              <SchemaVisualization type="snowflake" />
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">ETL Process</h3>
            <div className="bg-slate-800 p-4 rounded-md">
              <pre className="text-xs text-slate-300 overflow-x-auto">
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
  );
}
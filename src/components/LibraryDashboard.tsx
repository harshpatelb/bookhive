import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SchemaVisualization } from "@/components/SchemaVisualization";

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
      <Card className="mb-6 shadow-lg border-slate-700">
        <CardHeader className="bg-slate-800 rounded-t-lg">
          <CardTitle className="text-2xl">Library Management System</CardTitle>
          <CardDescription>
            A comprehensive system for managing library resources and transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4 mb-6">
            <Input 
              placeholder="Search books, members..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button variant="outline" className="ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
              Search
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="books">Books</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="books">
              <Card className="shadow-md border-slate-700">
                <CardHeader className="bg-slate-800 rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
                    Books Collection
                  </CardTitle>
                  <CardDescription>
                    Manage your library's book inventory
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-4 bg-slate-900 flex justify-between items-center">
                    <div>
                      <span className="text-sm text-slate-400">Total Books: {filteredBooks.length}</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
                      Export
                    </Button>
                  </div>
                  <div className="p-4">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-800 hover:bg-slate-800">
                          <TableHead className="text-slate-300">ID</TableHead>
                          <TableHead className="text-slate-300">Title</TableHead>
                          <TableHead className="text-slate-300">Author</TableHead>
                          <TableHead className="text-slate-300">Genre</TableHead>
                          <TableHead className="text-slate-300">ISBN</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredBooks.map((book) => (
                          <TableRow key={book.id} className="hover:bg-slate-900">
                            <TableCell className="font-mono">{book.id}</TableCell>
                            <TableCell className="font-medium">{book.title}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full bg-slate-800 text-xs">
                                {book.genre}
                              </span>
                            </TableCell>
                            <TableCell className="font-mono text-xs">{book.isbn}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="members">
              <Card className="shadow-md border-slate-700">
                <CardHeader className="bg-slate-800 rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    Library Members
                  </CardTitle>
                  <CardDescription>
                    Manage your library's membership database
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-4 bg-slate-900 flex justify-between items-center">
                    <div>
                      <span className="text-sm text-slate-400">Total Members: {filteredMembers.length}</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      Add Member
                    </Button>
                  </div>
                  <div className="p-4">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-800 hover:bg-slate-800">
                          <TableHead className="text-slate-300">ID</TableHead>
                          <TableHead className="text-slate-300">Name</TableHead>
                          <TableHead className="text-slate-300">Email</TableHead>
                          <TableHead className="text-slate-300">Join Date</TableHead>
                          <TableHead className="text-slate-300">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredMembers.map((member) => (
                          <TableRow key={member.id} className="hover:bg-slate-900">
                            <TableCell className="font-mono">{member.id}</TableCell>
                            <TableCell className="font-medium">{member.name}</TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>{member.joinDate}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                member.status === "Active" 
                                  ? "bg-green-900 text-green-200" 
                                  : "bg-red-900 text-red-200"
                              }`}>
                                {member.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="transactions">
              <Card className="shadow-md border-slate-700">
                <CardHeader className="bg-slate-800 rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    Transactions
                  </CardTitle>
                  <CardDescription>
                    Track book borrowing and returns
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-4 bg-slate-900 flex justify-between items-center">
                    <div>
                      <span className="text-sm text-slate-400">Total Transactions: {mockTransactions.length}</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
                      New Transaction
                    </Button>
                  </div>
                  <div className="p-4">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-800 hover:bg-slate-800">
                          <TableHead className="text-slate-300">ID</TableHead>
                          <TableHead className="text-slate-300">Book ID</TableHead>
                          <TableHead className="text-slate-300">Member ID</TableHead>
                          <TableHead className="text-slate-300">Borrow Date</TableHead>
                          <TableHead className="text-slate-300">Due Date</TableHead>
                          <TableHead className="text-slate-300">Return Date</TableHead>
                          <TableHead className="text-slate-300">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockTransactions.map((transaction) => (
                          <TableRow key={transaction.id} className="hover:bg-slate-900">
                            <TableCell className="font-mono">{transaction.id}</TableCell>
                            <TableCell className="font-mono">{transaction.bookId}</TableCell>
                            <TableCell className="font-mono">{transaction.memberId}</TableCell>
                            <TableCell>{transaction.borrowDate}</TableCell>
                            <TableCell>{transaction.dueDate}</TableCell>
                            <TableCell>{transaction.returnDate || "Not returned"}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                transaction.status === "Returned" 
                                  ? "bg-green-900 text-green-200" 
                                  : transaction.status === "Borrowed"
                                  ? "bg-blue-900 text-blue-200"
                                  : "bg-red-900 text-red-200"
                              }`}>
                                {transaction.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
              <Card className="shadow-md border-slate-700">
                <CardHeader className="bg-slate-800 rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
                    Reports & Analytics
                  </CardTitle>
                  <CardDescription>
                    Generate insights from your library data
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-4 bg-slate-900 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <Select value={reportType} onValueChange={setReportType}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="overdue">Overdue Books</SelectItem>
                          <SelectItem value="borrowHistory">Borrow History</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button size="sm" variant="default" className="h-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path><line x1="16" x2="22" y1="5" y2="5"></line><line x1="19" x2="19" y1="2" y2="8"></line><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
                        Generate Report
                      </Button>
                    </div>
                    <Button size="sm" variant="outline" className="h-8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
                      Export PDF
                    </Button>
                  </div>
                  <div className="p-4">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-800 hover:bg-slate-800">
                          <TableHead className="text-slate-300">Transaction ID</TableHead>
                          <TableHead className="text-slate-300">Book ID</TableHead>
                          <TableHead className="text-slate-300">Member ID</TableHead>
                          <TableHead className="text-slate-300">Borrow Date</TableHead>
                          <TableHead className="text-slate-300">Due Date</TableHead>
                          <TableHead className="text-slate-300">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {generateReport().map((report) => (
                          <TableRow key={report.id} className="hover:bg-slate-900">
                            <TableCell className="font-mono">{report.id}</TableCell>
                            <TableCell className="font-mono">{report.bookId}</TableCell>
                            <TableCell className="font-mono">{report.memberId}</TableCell>
                            <TableCell>{report.borrowDate}</TableCell>
                            <TableCell>{report.dueDate}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                report.status === "Returned" 
                                  ? "bg-green-900 text-green-200" 
                                  : report.status === "Borrowed"
                                  ? "bg-blue-900 text-blue-200"
                                  : "bg-red-900 text-red-200"
                              }`}>
                                {report.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
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
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  // Handle search functionality
  const handleSearch = () => {
    // In a real application, this would make an API call to search the database
    // For now, we're just filtering the mock data
    if (!searchTerm) return;
    
    // Filter books based on search term
    const filteredBooks = mockBooks.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Set the active tab to books to show the search results
    setActiveTab("books");
  };

  const handleExport = (type: string) => {
    alert(`Exporting ${type} data...`);
  };

  const handleAddMember = () => {
    alert("Opening add member form...");
  };

  const handleNewTransaction = () => {
    alert("Creating new transaction...");
  };

  const handleGenerateReport = () => {
    alert(`Generating ${reportType} report...`);
  };

  const handleExportPDF = () => {
    alert("Exporting report as PDF...");
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="mb-6 shadow-lg border-amber-500/20 bg-gradient-to-br from-zinc-900 to-black">
        <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-t-lg border-b border-amber-500/20">
          <CardTitle className="text-2xl bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-transparent bg-clip-text">
            BookHIVE Dashboard
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Manage your library resources and transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4 mb-6">
            <Input 
              placeholder="Search books, members..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm bg-black border-amber-500/30 focus-visible:ring-amber-500/30"
            />
            <Button 
              variant="outline" 
              className="ml-2 border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
              onClick={handleSearch}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
              Search
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6 bg-black border border-amber-500/20">
              <TabsTrigger 
                value="books" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500/20 data-[state=active]:to-orange-500/20 data-[state=active]:text-amber-400"
              >
                Books
              </TabsTrigger>
              <TabsTrigger 
                value="members" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500/20 data-[state=active]:to-orange-500/20 data-[state=active]:text-amber-400"
              >
                Members
              </TabsTrigger>
              <TabsTrigger 
                value="transactions" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500/20 data-[state=active]:to-orange-500/20 data-[state=active]:text-amber-400"
              >
                Transactions
              </TabsTrigger>
              <TabsTrigger 
                value="reports" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500/20 data-[state=active]:to-orange-500/20 data-[state=active]:text-amber-400"
              >
                Reports
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="books">
              <Card className="shadow-md border-amber-500/20 bg-gradient-to-br from-zinc-900 to-black">
                <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-t-lg border-b border-amber-500/20">
                  <CardTitle className="flex items-center text-amber-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
                    Books Collection
                  </CardTitle>
                  <CardDescription className="text-zinc-400">
                    Manage your library's book inventory
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-4 bg-black/50 flex justify-between items-center border-b border-amber-500/10">
                    <div>
                      <span className="text-sm text-amber-400/80">Total Books: {filteredBooks.length}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-black hover:bg-black border-amber-500/20">
                          <TableHead className="text-amber-400">ID</TableHead>
                          <TableHead className="text-amber-400">Title</TableHead>
                          <TableHead className="text-amber-400">Author</TableHead>
                          <TableHead className="text-amber-400">Genre</TableHead>
                          <TableHead className="text-amber-400">ISBN</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredBooks.map((book) => (
                          <TableRow key={book.id} className="hover:bg-amber-500/5 border-amber-500/10">
                            <TableCell className="font-mono text-zinc-400">{book.id}</TableCell>
                            <TableCell className="font-medium text-zinc-300">{book.title}</TableCell>
                            <TableCell className="text-zinc-400">{book.author}</TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 text-xs">
                                {book.genre}
                              </span>
                            </TableCell>
                            <TableCell className="font-mono text-xs text-zinc-500">{book.isbn}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="members">
              <Card className="shadow-md border-amber-500/20 bg-gradient-to-br from-zinc-900 to-black">
                <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-t-lg border-b border-amber-500/20">
                  <CardTitle className="flex items-center text-amber-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    Library Members
                  </CardTitle>
                  <CardDescription className="text-zinc-400">
                    Manage your library's membership database
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-4 bg-black/50 flex justify-between items-center border-b border-amber-500/10">
                    <div>
                      <span className="text-sm text-amber-400/80">Total Members: {filteredMembers.length}</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-8 border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
                      onClick={handleAddMember}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      Add Member
                    </Button>
                  </div>
                  <div className="p-4">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-black hover:bg-black border-amber-500/20">
                          <TableHead className="text-amber-400">ID</TableHead>
                          <TableHead className="text-amber-400">Name</TableHead>
                          <TableHead className="text-amber-400">Email</TableHead>
                          <TableHead className="text-amber-400">Join Date</TableHead>
                          <TableHead className="text-amber-400">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredMembers.map((member) => (
                          <TableRow key={member.id} className="hover:bg-amber-500/5 border-amber-500/10">
                            <TableCell className="font-mono text-zinc-400">{member.id}</TableCell>
                            <TableCell className="font-medium text-zinc-300">{member.name}</TableCell>
                            <TableCell className="text-zinc-400">{member.email}</TableCell>
                            <TableCell className="text-zinc-400">{member.joinDate}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                member.status === "Active" 
                                  ? "bg-green-900/30 text-green-400 border border-green-500/30" 
                                  : "bg-red-900/30 text-red-400 border border-red-500/30"
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
              <Card className="shadow-md border-amber-500/20 bg-gradient-to-br from-zinc-900 to-black">
                <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-t-lg border-b border-amber-500/20">
                  <CardTitle className="flex items-center text-amber-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    Transactions
                  </CardTitle>
                  <CardDescription className="text-zinc-400">
                    Track book borrowing and returns
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-4 bg-black/50 flex justify-between items-center border-b border-amber-500/10">
                    <div>
                      <span className="text-sm text-amber-400/80">Total Transactions: {mockTransactions.length}</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-8 border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
                      onClick={handleNewTransaction}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
                      New Transaction
                    </Button>
                  </div>
                  <div className="p-4">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-black hover:bg-black border-amber-500/20">
                          <TableHead className="text-amber-400">ID</TableHead>
                          <TableHead className="text-amber-400">Book ID</TableHead>
                          <TableHead className="text-amber-400">Member ID</TableHead>
                          <TableHead className="text-amber-400">Borrow Date</TableHead>
                          <TableHead className="text-amber-400">Due Date</TableHead>
                          <TableHead className="text-amber-400">Return Date</TableHead>
                          <TableHead className="text-amber-400">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockTransactions.map((transaction) => (
                          <TableRow key={transaction.id} className="hover:bg-amber-500/5 border-amber-500/10">
                            <TableCell className="font-mono text-zinc-400">{transaction.id}</TableCell>
                            <TableCell className="font-mono text-zinc-400">{transaction.bookId}</TableCell>
                            <TableCell className="font-mono text-zinc-400">{transaction.memberId}</TableCell>
                            <TableCell className="text-zinc-400">{transaction.borrowDate}</TableCell>
                            <TableCell className="text-zinc-400">{transaction.dueDate}</TableCell>
                            <TableCell className="text-zinc-400">{transaction.returnDate || "Not returned"}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                transaction.status === "Returned" 
                                  ? "bg-green-900/30 text-green-400 border border-green-500/30" 
                                  : transaction.status === "Borrowed"
                                  ? "bg-blue-900/30 text-blue-400 border border-blue-500/30"
                                  : "bg-red-900/30 text-red-400 border border-red-500/30"
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
              <Card className="shadow-md border-amber-500/20 bg-gradient-to-br from-zinc-900 to-black">
                <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-t-lg border-b border-amber-500/20">
                  <CardTitle className="flex items-center text-amber-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
                    Reports & Analytics
                  </CardTitle>
                  <CardDescription className="text-zinc-400">
                    Generate insights from your library data
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-4 bg-black/50 flex justify-between items-center border-b border-amber-500/10">
                    <div className="flex items-center space-x-4">
                      <Select value={reportType} onValueChange={setReportType}>
                        <SelectTrigger className="w-[180px] bg-black border-amber-500/30 text-zinc-300 focus:ring-amber-500/30">
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-amber-500/30">
                          <SelectItem value="overdue" className="text-zinc-300 focus:bg-amber-500/10 focus:text-amber-400">Overdue Books</SelectItem>
                          <SelectItem value="borrowHistory" className="text-zinc-300 focus:bg-amber-500/10 focus:text-amber-400">Borrow History</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        size="sm" 
                        variant="default" 
                        className="h-8 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black"
                        onClick={handleGenerateReport}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path><line x1="16" x2="22" y1="5" y2="5"></line><line x1="19" x2="19" y1="2" y2="8"></line><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
                        Generate Report
                      </Button>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-8 border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
                      onClick={handleExportPDF}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
                      Export PDF
                    </Button>
                  </div>
                  <div className="p-4">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-black hover:bg-black border-amber-500/20">
                          <TableHead className="text-amber-400">Transaction ID</TableHead>
                          <TableHead className="text-amber-400">Book ID</TableHead>
                          <TableHead className="text-amber-400">Member ID</TableHead>
                          <TableHead className="text-amber-400">Borrow Date</TableHead>
                          <TableHead className="text-amber-400">Due Date</TableHead>
                          <TableHead className="text-amber-400">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {generateReport().map((report) => (
                          <TableRow key={report.id} className="hover:bg-amber-500/5 border-amber-500/10">
                            <TableCell className="font-mono text-zinc-400">{report.id}</TableCell>
                            <TableCell className="font-mono text-zinc-400">{report.bookId}</TableCell>
                            <TableCell className="font-mono text-zinc-400">{report.memberId}</TableCell>
                            <TableCell className="text-zinc-400">{report.borrowDate}</TableCell>
                            <TableCell className="text-zinc-400">{report.dueDate}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                report.status === "Returned" 
                                  ? "bg-green-900/30 text-green-400 border border-green-500/30" 
                                  : report.status === "Borrowed"
                                  ? "bg-blue-900/30 text-blue-400 border border-blue-500/30"
                                  : "bg-red-900/30 text-red-400 border border-red-500/30"
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
    </div>
  );
}
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function DataEntry() {
  const router = useRouter();
  const [database, setDatabase] = useState("uwindsor");
  const [entryMethod, setEntryMethod] = useState("form");
  const [sqlQuery, setSqlQuery] = useState("");
  
  // Set the database based on the source parameter in the URL
  useEffect(() => {
    if (router.isReady) {
      const { source } = router.query;
      if (source === "uwindsor") {
        setDatabase("uwindsor");
      } else if (source === "public") {
        setDatabase("windsor");
      }
    }
  }, [router.isReady, router.query]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    genre: "",
    publicationYear: "",
    memberName: "",
    memberEmail: "",
    memberType: "student",
    bookId: "",
    memberId: "",
    loanDate: "",
    dueDate: "",
    transactionType: "borrow",
  });
  const [tableType, setTableType] = useState("books");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSqlSubmit = () => {
    if (!sqlQuery.trim()) {
      alert("Please enter a SQL query");
      return;
    }
    
    // Mock SQL execution
    console.log(`Executing SQL on ${database === "uwindsor" ? "UWindsor_Library" : "UToronto_Library"} database:`, sqlQuery);
    
    // Show success message
    setSuccessMessage(`Query executed successfully on ${database === "uwindsor" ? "UWindsor_Library" : "UToronto_Library"} database`);
    setTimeout(() => setSuccessMessage(""), 3000);
    
    // Clear the query
    setSqlQuery("");
  };

  const handleFormSubmit = () => {
    // Validate form based on table type
    if (tableType === "books") {
      if (!formData.title || !formData.author || !formData.isbn) {
        alert("Please fill in all required book fields");
        return;
      }
    } else if (tableType === "members") {
      if (!formData.memberName || !formData.memberEmail) {
        alert("Please fill in all required member fields");
        return;
      }
    } else if (tableType === "transactions") {
      if (!formData.bookId || !formData.memberId || !formData.loanDate || !formData.dueDate) {
        alert("Please fill in all required transaction fields");
        return;
      }
    }
    
    // Mock form submission
    console.log(`Adding ${tableType} to ${database === "uwindsor" ? "UWindsor_Library" : "UToronto_Library"} database:`, formData);
    
    // Show success message
    setSuccessMessage(`Data added successfully to ${database === "uwindsor" ? "UWindsor_Library" : "UToronto_Library"} database`);
    setTimeout(() => setSuccessMessage(""), 3000);
    
    // Clear the form based on table type
    if (tableType === "books") {
      setFormData({
        ...formData,
        title: "",
        author: "",
        isbn: "",
        publisher: "",
        genre: "",
        publicationYear: "",
      });
    } else if (tableType === "members") {
      setFormData({
        ...formData,
        memberName: "",
        memberEmail: "",
        memberType: "student",
      });
    } else if (tableType === "transactions") {
      setFormData({
        ...formData,
        bookId: "",
        memberId: "",
        loanDate: "",
        dueDate: "",
        transactionType: "borrow",
      });
    }
  };

  return (
    <>
      <Head>
        <title>Data Entry - BookHIVE</title>
        <meta name="description" content="Enter data into source databases for BookHIVE library management system" />
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
                  Source Database Data Entry
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Add data to UWindsor_Library and UToronto_Library source databases
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {successMessage && (
                  <div className="mb-6 p-4 bg-green-900/30 border border-green-500/30 rounded-lg text-green-400">
                    {successMessage}
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-amber-400">Select Source Database</h3>
                  <RadioGroup 
                    value={database} 
                    onValueChange={setDatabase} 
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="uwindsor" id="uwindsor" className="border-amber-500 text-amber-500" />
                      <Label htmlFor="uwindsor" className="text-zinc-300">UWindsor_Library</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="utoronto" id="utoronto" className="border-amber-500 text-amber-500" />
                      <Label htmlFor="utoronto" className="text-zinc-300">UToronto_Library</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-amber-400">Entry Method</h3>
                  <RadioGroup 
                    value={entryMethod} 
                    onValueChange={setEntryMethod} 
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="form" id="form" className="border-amber-500 text-amber-500" />
                      <Label htmlFor="form" className="text-zinc-300">Form Entry</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sql" id="sql" className="border-amber-500 text-amber-500" />
                      <Label htmlFor="sql" className="text-zinc-300">SQL Query</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {entryMethod === "form" ? (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-3 text-amber-400">Select Table</h3>
                      <RadioGroup 
                        value={tableType} 
                        onValueChange={setTableType} 
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="books" id="books" className="border-amber-500 text-amber-500" />
                          <Label htmlFor="books" className="text-zinc-300">Books</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="members" id="members" className="border-amber-500 text-amber-500" />
                          <Label htmlFor="members" className="text-zinc-300">Members</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="transactions" id="transactions" className="border-amber-500 text-amber-500" />
                          <Label htmlFor="transactions" className="text-zinc-300">Transactions</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    {tableType === "books" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="title" className="text-zinc-300">Book Title <span className="text-red-500">*</span></Label>
                            <Input 
                              id="title" 
                              name="title" 
                              value={formData.title}
                              onChange={handleFormChange}
                              placeholder="Enter book title" 
                              className="bg-black border-amber-500/30 focus-visible:ring-amber-500/30"
                            />
                          </div>
                          <div>
                            <Label htmlFor="author" className="text-zinc-300">Author <span className="text-red-500">*</span></Label>
                            <Input 
                              id="author" 
                              name="author" 
                              value={formData.author}
                              onChange={handleFormChange}
                              placeholder="Enter author name" 
                              className="bg-black border-amber-500/30 focus-visible:ring-amber-500/30"
                            />
                          </div>
                          <div>
                            <Label htmlFor="isbn" className="text-zinc-300">ISBN <span className="text-red-500">*</span></Label>
                            <Input 
                              id="isbn" 
                              name="isbn" 
                              value={formData.isbn}
                              onChange={handleFormChange}
                              placeholder="Enter ISBN" 
                              className="bg-black border-amber-500/30 focus-visible:ring-amber-500/30"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="publisher" className="text-zinc-300">Publisher</Label>
                            <Input 
                              id="publisher" 
                              name="publisher" 
                              value={formData.publisher}
                              onChange={handleFormChange}
                              placeholder="Enter publisher" 
                              className="bg-black border-amber-500/30 focus-visible:ring-amber-500/30"
                            />
                          </div>
                          <div>
                            <Label htmlFor="genre" className="text-zinc-300">Genre</Label>
                            <Select name="genre" value={formData.genre} onValueChange={(value) => setFormData({...formData, genre: value})}>
                              <SelectTrigger className="bg-black border-amber-500/30 focus:ring-amber-500/30">
                                <SelectValue placeholder="Select genre" />
                              </SelectTrigger>
                              <SelectContent className="bg-black border-amber-500/30">
                                <SelectItem value="fiction" className="text-zinc-300 focus:bg-amber-500/10 focus:text-amber-400">Fiction</SelectItem>
                                <SelectItem value="non-fiction" className="text-zinc-300 focus:bg-amber-500/10 focus:text-amber-400">Non-Fiction</SelectItem>
                                <SelectItem value="science" className="text-zinc-300 focus:bg-amber-500/10 focus:text-amber-400">Science</SelectItem>
                                <SelectItem value="history" className="text-zinc-300 focus:bg-amber-500/10 focus:text-amber-400">History</SelectItem>
                                <SelectItem value="biography" className="text-zinc-300 focus:bg-amber-500/10 focus:text-amber-400">Biography</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="publicationYear" className="text-zinc-300">Publication Year</Label>
                            <Input 
                              id="publicationYear" 
                              name="publicationYear" 
                              value={formData.publicationYear}
                              onChange={handleFormChange}
                              placeholder="Enter publication year" 
                              className="bg-black border-amber-500/30 focus-visible:ring-amber-500/30"
                            />
                          </div>
                        </div>
                      </div>
                    ) : tableType === "members" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="memberName" className="text-zinc-300">Member Name <span className="text-red-500">*</span></Label>
                            <Input 
                              id="memberName" 
                              name="memberName" 
                              value={formData.memberName}
                              onChange={handleFormChange}
                              placeholder="Enter member name" 
                              className="bg-black border-amber-500/30 focus-visible:ring-amber-500/30"
                            />
                          </div>
                          <div>
                            <Label htmlFor="memberEmail" className="text-zinc-300">Email <span className="text-red-500">*</span></Label>
                            <Input 
                              id="memberEmail" 
                              name="memberEmail" 
                              value={formData.memberEmail}
                              onChange={handleFormChange}
                              placeholder="Enter email address" 
                              className="bg-black border-amber-500/30 focus-visible:ring-amber-500/30"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="memberType" className="text-zinc-300">Member Type</Label>
                            <Select name="memberType" value={formData.memberType} onValueChange={(value) => setFormData({...formData, memberType: value})}>
                              <SelectTrigger className="bg-black border-amber-500/30 focus:ring-amber-500/30">
                                <SelectValue placeholder="Select member type" />
                              </SelectTrigger>
                              <SelectContent className="bg-black border-amber-500/30">
                                <SelectItem value="student" className="text-zinc-300 focus:bg-amber-500/10 focus:text-amber-400">Student</SelectItem>
                                <SelectItem value="faculty" className="text-zinc-300 focus:bg-amber-500/10 focus:text-amber-400">Faculty</SelectItem>
                                <SelectItem value="staff" className="text-zinc-300 focus:bg-amber-500/10 focus:text-amber-400">Staff</SelectItem>
                                <SelectItem value="public" className="text-zinc-300 focus:bg-amber-500/10 focus:text-amber-400">Public</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="bookId" className="text-zinc-300">Book ID <span className="text-red-500">*</span></Label>
                            <Input 
                              id="bookId" 
                              name="bookId" 
                              value={formData.bookId}
                              onChange={handleFormChange}
                              placeholder="Enter book ID" 
                              className="bg-black border-amber-500/30 focus-visible:ring-amber-500/30"
                            />
                          </div>
                          <div>
                            <Label htmlFor="memberId" className="text-zinc-300">Member ID <span className="text-red-500">*</span></Label>
                            <Input 
                              id="memberId" 
                              name="memberId" 
                              value={formData.memberId}
                              onChange={handleFormChange}
                              placeholder="Enter member ID" 
                              className="bg-black border-amber-500/30 focus-visible:ring-amber-500/30"
                            />
                          </div>
                          <div>
                            <Label htmlFor="transactionType" className="text-zinc-300">Transaction Type</Label>
                            <Select name="transactionType" value={formData.transactionType} onValueChange={(value) => setFormData({...formData, transactionType: value})}>
                              <SelectTrigger className="bg-black border-amber-500/30 focus:ring-amber-500/30">
                                <SelectValue placeholder="Select transaction type" />
                              </SelectTrigger>
                              <SelectContent className="bg-black border-amber-500/30">
                                <SelectItem value="borrow" className="text-zinc-300 focus:bg-amber-500/10 focus:text-amber-400">Borrow</SelectItem>
                                <SelectItem value="return" className="text-zinc-300 focus:bg-amber-500/10 focus:text-amber-400">Return</SelectItem>
                                <SelectItem value="renew" className="text-zinc-300 focus:bg-amber-500/10 focus:text-amber-400">Renew</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="loanDate" className="text-zinc-300">Loan Date <span className="text-red-500">*</span></Label>
                            <Input 
                              id="loanDate" 
                              name="loanDate" 
                              type="date"
                              value={formData.loanDate}
                              onChange={handleFormChange}
                              className="bg-black border-amber-500/30 focus-visible:ring-amber-500/30"
                            />
                          </div>
                          <div>
                            <Label htmlFor="dueDate" className="text-zinc-300">Due Date <span className="text-red-500">*</span></Label>
                            <Input 
                              id="dueDate" 
                              name="dueDate" 
                              type="date"
                              value={formData.dueDate}
                              onChange={handleFormChange}
                              className="bg-black border-amber-500/30 focus-visible:ring-amber-500/30"
                            />
                          </div>
                          <div className="pt-4">
                            <p className="text-xs text-amber-400/80 mb-2">Note: For returns, please specify the original loan date and the current date will be used as the return date.</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6">
                      <Button 
                        onClick={handleFormSubmit}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold"
                      >
                        Submit Data
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <Label htmlFor="sqlQuery" className="text-zinc-300 mb-2 block">SQL Query</Label>
                      <Textarea 
                        id="sqlQuery" 
                        value={sqlQuery}
                        onChange={(e) => setSqlQuery(e.target.value)}
                        placeholder={`-- Example queries:\n\n-- Insert a new book\nINSERT INTO books (title, author, isbn) VALUES ('Book Title', 'Author Name', '1234567890');\n\n-- Insert a new member\nINSERT INTO members (name, email, status) VALUES ('Member Name', 'email@example.com', 'Active');`} 
                        className="h-64 bg-black border-amber-500/30 focus-visible:ring-amber-500/30 font-mono"
                      />
                    </div>
                    
                    <div className="bg-gradient-to-br from-zinc-900 to-black p-4 rounded-lg border border-amber-500/20 mb-6">
                      <h4 className="text-amber-400 mb-2">Database Schema Reference</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-amber-400/80 text-sm mb-1">UWindsor_Library</h5>
                          <pre className="text-xs text-zinc-400 overflow-x-auto">
{`books (
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
                        <div>
                          <h5 className="text-amber-400/80 text-sm mb-1">UToronto_Library</h5>
                          <pre className="text-xs text-zinc-400 overflow-x-auto">
{`inventory (
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
                    
                    <div>
                      <Button 
                        onClick={handleSqlSubmit}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold"
                      >
                        Execute Query
                      </Button>
                    </div>
                  </div>
                )}
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
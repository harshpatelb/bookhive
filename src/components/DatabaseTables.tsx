import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Mock data for demonstration purposes
// In a real application, this would come from an API call to your backend
const mockData = {
  uwindsor: {
    books: [
      { id: 1, title: "Introduction to Computer Science", author: "John Smith", year: 2020, available: true, copies: 5 },
      { id: 2, title: "Advanced Database Systems", author: "Jane Doe", year: 2019, available: false, copies: 3 },
      { id: 3, title: "Machine Learning Fundamentals", author: "Robert Johnson", year: 2021, available: true, copies: 7 },
      { id: 4, title: "Algorithms and Data Structures", author: "Emily Chen", year: 2018, available: true, copies: 4 },
      { id: 5, title: "Software Engineering Principles", author: "Michael Brown", year: 2022, available: true, copies: 6 },
    ],
    members: [
      { id: 101, name: "Alex Johnson", type: "Student", joinDate: "2021-09-01", email: "alex.j@uwindsor.ca", department: "Computer Science", borrowedBooks: 3 },
      { id: 102, name: "Sarah Williams", type: "Faculty", joinDate: "2019-05-15", email: "s.williams@uwindsor.ca", department: "Engineering", borrowedBooks: 1 },
      { id: 103, name: "David Lee", type: "Student", joinDate: "2022-01-10", email: "david.lee@uwindsor.ca", department: "Business", borrowedBooks: 0 },
    ]
  },
  utoronto: {
    books: [
      { id: 1, title: "Canadian Literature Anthology", author: "Margaret Atwood (Editor)", year: 2018, available: true, copies: 10 },
      { id: 2, title: "Advanced Molecular Biology", author: "Richard Chen", year: 2020, available: true, copies: 7 },
      { id: 3, title: "Toronto: A Historical Perspective", author: "Emily Richardson", year: 2019, available: false, copies: 5 },
      { id: 4, title: "Quantum Computing Fundamentals", author: "David Singh", year: 2021, available: true, copies: 8 },
      { id: 5, title: "Modern Architecture and Design", author: "Sarah Wong", year: 2017, available: false, copies: 6 },
    ],
    members: [
      { id: 201, name: "Michael Zhang", type: "Graduate", joinDate: "2020-09-05", email: "m.zhang@utoronto.ca", department: "Physics", borrowedBooks: 2 },
      { id: 202, name: "Jennifer Patel", type: "Faculty", joinDate: "2018-08-15", email: "j.patel@utoronto.ca", department: "Medicine", borrowedBooks: 4 },
      { id: 203, name: "Thomas Wilson", type: "Undergraduate", joinDate: "2022-01-10", email: "t.wilson@utoronto.ca", department: "History", borrowedBooks: 1 },
    ]
  },
  warehouse: {
    books: [
      { id: 1, title: "Introduction to Computer Science", author: "John Smith", year: 2020, available: true, source: "UWindsor", copies: 5 },
      { id: 2, title: "Advanced Database Systems", author: "Jane Doe", year: 2019, available: false, source: "UWindsor", copies: 3 },
      { id: 3, title: "Canadian Literature Anthology", author: "Margaret Atwood (Editor)", year: 2018, available: true, source: "UToronto", copies: 10 },
      { id: 4, title: "Advanced Molecular Biology", author: "Richard Chen", year: 2020, available: true, source: "UToronto", copies: 7 },
      { id: 5, title: "Machine Learning Fundamentals", author: "Robert Johnson", year: 2021, available: true, source: "UWindsor", copies: 7 },
      { id: 6, title: "Toronto: A Historical Perspective", author: "Emily Richardson", year: 2019, available: false, source: "UToronto", copies: 5 },
    ],
    members: [
      { id: 101, name: "Alex Johnson", type: "Student", joinDate: "2021-09-01", source: "UWindsor", email: "alex.j@uwindsor.ca", department: "Computer Science", borrowedBooks: 3 },
      { id: 201, name: "Michael Zhang", type: "Graduate", joinDate: "2020-09-05", source: "UToronto", email: "m.zhang@utoronto.ca", department: "Physics", borrowedBooks: 2 },
      { id: 102, name: "Sarah Williams", type: "Faculty", joinDate: "2019-05-15", source: "UWindsor", email: "s.williams@uwindsor.ca", department: "Engineering", borrowedBooks: 1 },
      { id: 202, name: "Jennifer Patel", type: "Faculty", joinDate: "2018-08-15", source: "UToronto", email: "j.patel@utoronto.ca", department: "Medicine", borrowedBooks: 4 },
    ]
  }
};

export function DatabaseTables() {
  const [activeDatabase, setActiveDatabase] = useState("uwindsor");
  const [activeTable, setActiveTable] = useState("books");
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showMemberDetails, setShowMemberDetails] = useState(false);
  const [databaseConnected, setDatabaseConnected] = useState(true); // Simulate database connection status
  
  // Ensure the active table is properly set when changing databases
  useEffect(() => {
    // Keep the current active table when switching databases
    // This ensures members table stays selected when switching between databases
  }, [activeDatabase]);

  const getSourceBadge = (source: string) => {
    switch (source) {
      case "UWindsor":
        return <Badge className="bg-blue-600 hover:bg-blue-700">UWindsor</Badge>;
      case "UToronto":
        return <Badge className="bg-purple-600 hover:bg-purple-700">UToronto</Badge>;
      default:
        return null;
    }
  };

  // Function to simulate checking database connection
  useEffect(() => {
    // In a real application, this would check the actual database connection
    // For demonstration purposes, we're just using a state variable
    const checkDatabaseConnection = () => {
      // Simulate database connection check
      // In a real app, this would be an API call to check the connection
      setDatabaseConnected(true); // Set to false to simulate a connection error
    };
    
    checkDatabaseConnection();
  }, []);

  // If database is not connected, show an error message
  if (!databaseConnected) {
    return (
      <div className="w-full max-w-6xl mx-auto mb-8">
        <Card className="shadow-lg border-red-500/20 bg-gradient-to-br from-zinc-900 to-black">
          <CardHeader className="bg-gradient-to-r from-red-500/10 to-red-700/10 rounded-t-lg border-b border-red-500/20">
            <CardTitle className="text-2xl text-red-400">
              Database Connection Error
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Unable to connect to the library database
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 mb-4">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h3 className="text-xl font-medium text-red-400 mb-2">Database Connection Failed</h3>
              <p className="text-zinc-400 mb-6">
                Unable to establish a connection to the MySQL database. Please check your database configuration and try again.
              </p>
              <Button 
                variant="outline" 
                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                onClick={() => setDatabaseConnected(true)} // In a real app, this would retry the connection
              >
                Retry Connection
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <Card className="shadow-lg border-amber-500/20 bg-gradient-to-br from-zinc-900 to-black">
        <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-t-lg border-b border-amber-500/20">
          <CardTitle className="text-2xl bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-transparent bg-clip-text">
            Database Tables
          </CardTitle>
          <CardDescription className="text-zinc-400">
            View and explore data from different library databases
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="uwindsor" onValueChange={setActiveDatabase}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="uwindsor" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-black">
                UWindsor Library
              </TabsTrigger>
              <TabsTrigger value="utoronto" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-black">
                UToronto Library
              </TabsTrigger>
              <TabsTrigger value="warehouse" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-black">
                Data Warehouse
              </TabsTrigger>
            </TabsList>

            {/* UWindsor Library Content */}
            <TabsContent value="uwindsor">
              <div className="mb-4">
                <TabsList>
                  <TabsTrigger 
                    value="books" 
                    onClick={() => setActiveTable("books")}
                    className={activeTable === "books" ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black" : ""}
                  >
                    Books
                  </TabsTrigger>
                  <TabsTrigger 
                    value="members" 
                    onClick={() => setActiveTable("members")}
                    className={activeTable === "members" ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black" : ""}
                  >
                    Members
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="rounded-md border border-amber-500/20 overflow-hidden">
                <Table>
                  <TableHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10">
                    {activeTable === "books" ? (
                      <TableRow>
                        <TableHead className="text-amber-400">ID</TableHead>
                        <TableHead className="text-amber-400">Title</TableHead>
                        <TableHead className="text-amber-400">Author</TableHead>
                        <TableHead className="text-amber-400">Year</TableHead>
                        <TableHead className="text-amber-400">Status</TableHead>
                        <TableHead className="text-amber-400">Copies</TableHead>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableHead className="text-amber-400">ID</TableHead>
                        <TableHead className="text-amber-400">Name</TableHead>
                        <TableHead className="text-amber-400">Type</TableHead>
                        <TableHead className="text-amber-400">Join Date</TableHead>
                      </TableRow>
                    )}
                  </TableHeader>
                  <TableBody>
                    {activeTable === "books" ? (
                      mockData.uwindsor.books.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell>{book.id}</TableCell>
                          <TableCell>{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>{book.year}</TableCell>
                          <TableCell>
                            <Badge className={book.available ? "bg-green-600" : "bg-red-600"}>
                              {book.available ? "Available" : "Checked Out"}
                            </Badge>
                          </TableCell>
                          <TableCell>{book.copies}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      mockData.uwindsor.members.map((member) => (
                        <TableRow 
                          key={member.id} 
                          className="cursor-pointer hover:bg-amber-500/10"
                          onClick={() => {
                            setSelectedMember(member);
                            setShowMemberDetails(true);
                          }}
                        >
                          <TableCell>{member.id}</TableCell>
                          <TableCell>{member.name}</TableCell>
                          <TableCell>{member.type}</TableCell>
                          <TableCell>{member.joinDate}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-2 flex justify-end">
                <Badge variant="outline" className="border-blue-600 text-blue-400">
                  UWindsor Library Database
                </Badge>
              </div>
            </TabsContent>

            {/* UToronto Library Content */}
            <TabsContent value="utoronto">
              <div className="mb-4">
                <TabsList>
                  <TabsTrigger 
                    value="books" 
                    onClick={() => setActiveTable("books")}
                    className={activeTable === "books" ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black" : ""}
                  >
                    Books
                  </TabsTrigger>
                  <TabsTrigger 
                    value="members" 
                    onClick={() => setActiveTable("members")}
                    className={activeTable === "members" ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black" : ""}
                  >
                    Members
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="rounded-md border border-amber-500/20 overflow-hidden">
                <Table>
                  <TableHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10">
                    {activeTable === "books" ? (
                      <TableRow>
                        <TableHead className="text-amber-400">ID</TableHead>
                        <TableHead className="text-amber-400">Title</TableHead>
                        <TableHead className="text-amber-400">Author</TableHead>
                        <TableHead className="text-amber-400">Year</TableHead>
                        <TableHead className="text-amber-400">Status</TableHead>
                        <TableHead className="text-amber-400">Copies</TableHead>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableHead className="text-amber-400">ID</TableHead>
                        <TableHead className="text-amber-400">Name</TableHead>
                        <TableHead className="text-amber-400">Type</TableHead>
                        <TableHead className="text-amber-400">Join Date</TableHead>
                      </TableRow>
                    )}
                  </TableHeader>
                  <TableBody>
                    {activeTable === "books" ? (
                      mockData.utoronto.books.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell>{book.id}</TableCell>
                          <TableCell>{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>{book.year}</TableCell>
                          <TableCell>
                            <Badge className={book.available ? "bg-green-600" : "bg-red-600"}>
                              {book.available ? "Available" : "Checked Out"}
                            </Badge>
                          </TableCell>
                          <TableCell>{book.copies}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      mockData.utoronto.members.map((member) => (
                        <TableRow 
                          key={member.id} 
                          className="cursor-pointer hover:bg-amber-500/10"
                          onClick={() => {
                            setSelectedMember(member);
                            setShowMemberDetails(true);
                          }}
                        >
                          <TableCell>{member.id}</TableCell>
                          <TableCell>{member.name}</TableCell>
                          <TableCell>{member.type}</TableCell>
                          <TableCell>{member.joinDate}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-2 flex justify-end">
                <Badge variant="outline" className="border-purple-600 text-purple-400">
                  University of Toronto Library Database
                </Badge>
              </div>
            </TabsContent>

            {/* Data Warehouse Content */}
            <TabsContent value="warehouse">
              <div className="mb-4">
                <TabsList>
                  <TabsTrigger 
                    value="books" 
                    onClick={() => setActiveTable("books")}
                    className={activeTable === "books" ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black" : ""}
                  >
                    Books
                  </TabsTrigger>
                  <TabsTrigger 
                    value="members" 
                    onClick={() => setActiveTable("members")}
                    className={activeTable === "members" ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black" : ""}
                  >
                    Members
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="rounded-md border border-amber-500/20 overflow-hidden">
                <Table>
                  <TableHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10">
                    {activeTable === "books" ? (
                      <TableRow>
                        <TableHead className="text-amber-400">ID</TableHead>
                        <TableHead className="text-amber-400">Title</TableHead>
                        <TableHead className="text-amber-400">Author</TableHead>
                        <TableHead className="text-amber-400">Year</TableHead>
                        <TableHead className="text-amber-400">Status</TableHead>
                        <TableHead className="text-amber-400">Copies</TableHead>
                        <TableHead className="text-amber-400">Source</TableHead>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableHead className="text-amber-400">ID</TableHead>
                        <TableHead className="text-amber-400">Name</TableHead>
                        <TableHead className="text-amber-400">Type</TableHead>
                        <TableHead className="text-amber-400">Join Date</TableHead>
                        <TableHead className="text-amber-400">Source</TableHead>
                      </TableRow>
                    )}
                  </TableHeader>
                  <TableBody>
                    {activeTable === "books" ? (
                      mockData.warehouse.books.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell>{book.id}</TableCell>
                          <TableCell>{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>{book.year}</TableCell>
                          <TableCell>
                            <Badge className={book.available ? "bg-green-600" : "bg-red-600"}>
                              {book.available ? "Available" : "Checked Out"}
                            </Badge>
                          </TableCell>
                          <TableCell>{book.copies}</TableCell>
                          <TableCell>{getSourceBadge(book.source)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      mockData.warehouse.members.map((member) => (
                        <TableRow 
                          key={member.id}
                          className="cursor-pointer hover:bg-amber-500/10"
                          onClick={() => {
                            setSelectedMember(member);
                            setShowMemberDetails(true);
                          }}
                        >
                          <TableCell>{member.id}</TableCell>
                          <TableCell>{member.name}</TableCell>
                          <TableCell>{member.type}</TableCell>
                          <TableCell>{member.joinDate}</TableCell>
                          <TableCell>{getSourceBadge(member.source)}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-2 flex justify-end">
                <Badge variant="outline" className="border-amber-500 text-amber-400">
                  Data Warehouse (Consolidated)
                </Badge>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Member Details Dialog */}
      <Dialog open={showMemberDetails} onOpenChange={setShowMemberDetails}>
        <DialogContent className="bg-gradient-to-br from-zinc-900 to-black border border-amber-500/20">
          <DialogHeader>
            <DialogTitle className="text-xl bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-transparent bg-clip-text">
              Member Details
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Detailed information about the selected member
            </DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-amber-400/80">Member ID</p>
                  <p className="text-zinc-300">{selectedMember.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-amber-400/80">Name</p>
                  <p className="text-zinc-300">{selectedMember.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-amber-400/80">Type</p>
                  <p className="text-zinc-300">{selectedMember.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-amber-400/80">Join Date</p>
                  <p className="text-zinc-300">{selectedMember.joinDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-amber-400/80">Email</p>
                  <p className="text-zinc-300">{selectedMember.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-amber-400/80">Department</p>
                  <p className="text-zinc-300">{selectedMember.department}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-amber-400/80">Borrowed Books</p>
                  <p className="text-zinc-300">{selectedMember.borrowedBooks}</p>
                </div>
                {selectedMember.source && (
                  <div className="space-y-1">
                    <p className="text-xs text-amber-400/80">Source</p>
                    <div>{getSourceBadge(selectedMember.source)}</div>
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t border-amber-500/20">
                <h4 className="text-sm font-medium text-amber-400 mb-2">Member Status</h4>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${selectedMember.borrowedBooks > 0 ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                  <span className="text-zinc-300 text-sm">
                    {selectedMember.borrowedBooks > 0 ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
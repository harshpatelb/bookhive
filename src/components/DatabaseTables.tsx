import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      { id: 101, name: "Alex Johnson", type: "Student", joinDate: "2021-09-01" },
      { id: 102, name: "Sarah Williams", type: "Faculty", joinDate: "2019-05-15" },
      { id: 103, name: "David Lee", type: "Student", joinDate: "2022-01-10" },
    ]
  },
  public: {
    books: [
      { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, available: true, copies: 8 },
      { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, available: true, copies: 12 },
      { id: 3, title: "1984", author: "George Orwell", year: 1949, available: false, copies: 6 },
      { id: 4, title: "Pride and Prejudice", author: "Jane Austen", year: 1813, available: true, copies: 4 },
      { id: 5, title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937, available: false, copies: 9 },
    ],
    members: [
      { id: 201, name: "James Wilson", type: "Adult", joinDate: "2020-03-12" },
      { id: 202, name: "Emma Thompson", type: "Senior", joinDate: "2018-11-05" },
      { id: 203, name: "Noah Garcia", type: "Child", joinDate: "2022-06-30" },
    ]
  },
  warehouse: {
    books: [
      { id: 1, title: "Introduction to Computer Science", author: "John Smith", year: 2020, available: true, source: "UWindsor", copies: 5 },
      { id: 2, title: "Advanced Database Systems", author: "Jane Doe", year: 2019, available: false, source: "UWindsor", copies: 3 },
      { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, available: true, source: "Public", copies: 8 },
      { id: 4, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, available: true, source: "Public", copies: 12 },
      { id: 5, title: "Machine Learning Fundamentals", author: "Robert Johnson", year: 2021, available: true, source: "UWindsor", copies: 7 },
      { id: 6, title: "1984", author: "George Orwell", year: 1949, available: false, source: "Public", copies: 6 },
    ],
    members: [
      { id: 101, name: "Alex Johnson", type: "Student", joinDate: "2021-09-01", source: "UWindsor" },
      { id: 201, name: "James Wilson", type: "Adult", joinDate: "2020-03-12", source: "Public" },
      { id: 102, name: "Sarah Williams", type: "Faculty", joinDate: "2019-05-15", source: "UWindsor" },
      { id: 202, name: "Emma Thompson", type: "Senior", joinDate: "2018-11-05", source: "Public" },
    ]
  }
};

export function DatabaseTables() {
  const [activeDatabase, setActiveDatabase] = useState("uwindsor");
  const [activeTable, setActiveTable] = useState("books");

  const getSourceBadge = (source: string) => {
    switch (source) {
      case "UWindsor":
        return <Badge className="bg-blue-600 hover:bg-blue-700">UWindsor</Badge>;
      case "Public":
        return <Badge className="bg-green-600 hover:bg-green-700">Public Library</Badge>;
      default:
        return null;
    }
  };

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
              <TabsTrigger value="public" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-black">
                Public Library
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
                        <TableRow key={member.id}>
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

            {/* Public Library Content */}
            <TabsContent value="public">
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
                      mockData.public.books.map((book) => (
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
                      mockData.public.members.map((member) => (
                        <TableRow key={member.id}>
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
                <Badge variant="outline" className="border-green-600 text-green-400">
                  Windsor Public Library Database
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
                        <TableRow key={member.id}>
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
    </div>
  );
}
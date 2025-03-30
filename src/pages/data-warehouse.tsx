import { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Mock database schemas
const databaseSchemas = {
  uwindsor_library: [
    { table: 'books', columns: ['book_id', 'title', 'author', 'isbn', 'publication_year', 'status'] },
    { table: 'members', columns: ['member_id', 'first_name', 'last_name', 'email', 'join_date'] },
    { table: 'loans', columns: ['loan_id', 'book_id', 'member_id', 'loan_date', 'return_date'] },
  ],
  windsor_plibrary: [
    { table: 'inventory', columns: ['item_id', 'title', 'creator', 'type', 'acquisition_date', 'status'] },
    { table: 'patrons', columns: ['patron_id', 'name', 'address', 'phone', 'registration_date'] },
    { table: 'checkouts', columns: ['checkout_id', 'item_id', 'patron_id', 'checkout_date', 'due_date'] },
  ],
  data_warehouse: [
    { table: 'dim_books', columns: ['book_key', 'source_id', 'title', 'author', 'isbn', 'publication_year', 'source_system'] },
    { table: 'dim_members', columns: ['member_key', 'source_id', 'first_name', 'last_name', 'email', 'join_date', 'source_system'] },
    { table: 'fact_loans', columns: ['loan_key', 'book_key', 'member_key', 'loan_date', 'return_date', 'loan_duration_days', 'source_system'] },
    { table: 'dim_date', columns: ['date_key', 'full_date', 'day', 'month', 'year', 'quarter', 'is_weekend'] },
  ]
};

// Mock predefined queries
const predefinedQueries = [
  { 
    id: 'popular_books', 
    name: 'Most Popular Books', 
    query: 'SELECT b.title, b.author, COUNT(*) as loan_count\nFROM fact_loans fl\nJOIN dim_books b ON fl.book_key = b.book_key\nGROUP BY b.title, b.author\nORDER BY loan_count DESC\nLIMIT 10;',
    description: 'Shows the top 10 most frequently borrowed books'
  },
  { 
    id: 'active_members', 
    name: 'Most Active Members', 
    query: 'SELECT m.first_name, m.last_name, COUNT(*) as checkout_count\nFROM fact_loans fl\nJOIN dim_members m ON fl.member_key = m.member_key\nGROUP BY m.first_name, m.last_name\nORDER BY checkout_count DESC\nLIMIT 10;',
    description: 'Lists the top 10 members with the most checkouts'
  },
  { 
    id: 'monthly_loans', 
    name: 'Monthly Loan Trends', 
    query: 'SELECT d.month, d.year, COUNT(*) as loan_count\nFROM fact_loans fl\nJOIN dim_date d ON fl.loan_date = d.date_key\nGROUP BY d.month, d.year\nORDER BY d.year, d.month;',
    description: 'Shows the number of loans per month over time'
  },
  { 
    id: 'source_comparison', 
    name: 'Source System Comparison', 
    query: 'SELECT source_system, COUNT(*) as record_count\nFROM fact_loans\nGROUP BY source_system;',
    description: 'Compares the number of records from each source system'
  },
];

// Mock query results
const mockResults = {
  popular_books: [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', loan_count: 42 },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', loan_count: 38 },
    { title: '1984', author: 'George Orwell', loan_count: 35 },
    { title: 'Pride and Prejudice', author: 'Jane Austen', loan_count: 33 },
    { title: 'The Catcher in the Rye', author: 'J.D. Salinger', loan_count: 29 },
  ],
  active_members: [
    { first_name: 'John', last_name: 'Smith', checkout_count: 23 },
    { first_name: 'Emma', last_name: 'Johnson', checkout_count: 19 },
    { first_name: 'Michael', last_name: 'Williams', checkout_count: 17 },
    { first_name: 'Sophia', last_name: 'Brown', checkout_count: 15 },
    { first_name: 'William', last_name: 'Jones', checkout_count: 14 },
  ],
  monthly_loans: [
    { month: 1, year: 2023, loan_count: 156 },
    { month: 2, year: 2023, loan_count: 142 },
    { month: 3, year: 2023, loan_count: 168 },
    { month: 4, year: 2023, loan_count: 175 },
    { month: 5, year: 2023, loan_count: 189 },
  ],
  source_comparison: [
    { source_system: 'UWindsor_Library', record_count: 2345 },
    { source_system: 'Windsor_PLibrary', record_count: 3127 },
  ],
  custom: [
    { book_key: 1001, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', source_system: 'UWindsor_Library' },
    { book_key: 1002, title: 'To Kill a Mockingbird', author: 'Harper Lee', source_system: 'Windsor_PLibrary' },
    { book_key: 1003, title: '1984', author: 'George Orwell', source_system: 'UWindsor_Library' },
  ]
};

const DataWarehouse = () => {
  const [activeTab, setActiveTab] = useState('custom');
  const [customQuery, setCustomQuery] = useState('');
  const [selectedQuery, setSelectedQuery] = useState('');
  const [queryToDisplay, setQueryToDisplay] = useState('');
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [resultColumns, setResultColumns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const executeCustomQuery = () => {
    if (!customQuery.trim()) return;
    
    setIsLoading(true);
    setQueryToDisplay(customQuery);
    
    // Simulate API call delay
    setTimeout(() => {
      setQueryResults(mockResults.custom);
      setResultColumns(Object.keys(mockResults.custom[0]));
      setIsLoading(false);
    }, 800);
  };

  const executePredefinedQuery = (queryId: string) => {
    if (!queryId) return;
    
    const selectedPredefinedQuery = predefinedQueries.find(q => q.id === queryId);
    if (!selectedPredefinedQuery) return;
    
    setIsLoading(true);
    setQueryToDisplay(selectedPredefinedQuery.query);
    
    // Simulate API call delay
    setTimeout(() => {
      setQueryResults(mockResults[queryId as keyof typeof mockResults] || []);
      if (mockResults[queryId as keyof typeof mockResults]) {
        setResultColumns(Object.keys(mockResults[queryId as keyof typeof mockResults][0]));
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Data Warehouse | BookHIVE</title>
        <meta name="description" content="BookHIVE Data Warehouse and SQL Query Interface" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
            Data Warehouse Explorer
          </h1>
          <p className="text-zinc-400 mt-2">
            Query and analyze data from UWindsor Library and Windsor Public Library systems
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Database Schema Sidebar */}
          <Card className="bg-zinc-900 border-amber-500/20 lg:col-span-1">
            <CardHeader className="bg-gradient-to-r from-amber-950 to-zinc-900 pb-4">
              <CardTitle className="text-amber-400">Database Schema</CardTitle>
              <CardDescription>Available tables and columns</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Tabs defaultValue="data_warehouse">
                <TabsList className="w-full bg-zinc-800">
                  <TabsTrigger value="data_warehouse" className="data-[state=active]:bg-amber-900/50">Data Warehouse</TabsTrigger>
                  <TabsTrigger value="uwindsor_library" className="data-[state=active]:bg-amber-900/50">UWindsor Library</TabsTrigger>
                  <TabsTrigger value="windsor_plibrary" className="data-[state=active]:bg-amber-900/50">Windsor P. Library</TabsTrigger>
                </TabsList>
                
                <TabsContent value="data_warehouse" className="mt-4">
                  {databaseSchemas.data_warehouse.map((table) => (
                    <div key={table.table} className="mb-4">
                      <h3 className="text-amber-400 font-medium mb-2">{table.table}</h3>
                      <div className="pl-4 border-l border-amber-500/20">
                        {table.columns.map((column) => (
                          <div key={column} className="text-sm text-zinc-400 py-1">{column}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="uwindsor_library" className="mt-4">
                  {databaseSchemas.uwindsor_library.map((table) => (
                    <div key={table.table} className="mb-4">
                      <h3 className="text-amber-400 font-medium mb-2">{table.table}</h3>
                      <div className="pl-4 border-l border-amber-500/20">
                        {table.columns.map((column) => (
                          <div key={column} className="text-sm text-zinc-400 py-1">{column}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="windsor_plibrary" className="mt-4">
                  {databaseSchemas.windsor_plibrary.map((table) => (
                    <div key={table.table} className="mb-4">
                      <h3 className="text-amber-400 font-medium mb-2">{table.table}</h3>
                      <div className="pl-4 border-l border-amber-500/20">
                        {table.columns.map((column) => (
                          <div key={column} className="text-sm text-zinc-400 py-1">{column}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Query Interface and Results */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="bg-zinc-900 border-amber-500/20">
              <CardHeader className="bg-gradient-to-r from-amber-950 to-zinc-900">
                <CardTitle className="text-amber-400">SQL Query Interface</CardTitle>
                <CardDescription>Run custom queries or select from predefined options</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full bg-zinc-800">
                    <TabsTrigger value="custom" className="data-[state=active]:bg-amber-900/50">Custom Query</TabsTrigger>
                    <TabsTrigger value="predefined" className="data-[state=active]:bg-amber-900/50">Predefined Queries</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="custom" className="mt-4 space-y-4">
                    <Textarea 
                      placeholder="Enter your SQL query here..." 
                      className="min-h-[150px] bg-zinc-800 border-zinc-700 focus:border-amber-500"
                      value={customQuery}
                      onChange={(e) => setCustomQuery(e.target.value)}
                    />
                    <Button 
                      className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                      onClick={executeCustomQuery}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Executing...' : 'Execute Query'}
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="predefined" className="mt-4 space-y-4">
                    <div className="space-y-4">
                      <Select value={selectedQuery} onValueChange={(value) => {
                        setSelectedQuery(value);
                        executePredefinedQuery(value);
                      }}>
                        <SelectTrigger className="bg-zinc-800 border-zinc-700">
                          <SelectValue placeholder="Select a predefined query" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          {predefinedQueries.map((query) => (
                            <SelectItem key={query.id} value={query.id}>
                              {query.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {selectedQuery && (
                        <div className="p-3 bg-zinc-800 rounded-md">
                          <p className="text-sm text-zinc-400 mb-2">
                            {predefinedQueries.find(q => q.id === selectedQuery)?.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* SQL Query Display */}
            {queryToDisplay && (
              <Card className="bg-zinc-900 border-amber-500/20">
                <CardHeader className="bg-gradient-to-r from-amber-950 to-zinc-900 py-3">
                  <CardTitle className="text-amber-400 text-sm">SQL Query</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <pre className="bg-zinc-800 p-4 rounded-md overflow-x-auto text-sm text-zinc-300 whitespace-pre-wrap">
                    {queryToDisplay}
                  </pre>
                </CardContent>
              </Card>
            )}

            {/* Results Display */}
            {queryResults.length > 0 && (
              <Card className="bg-zinc-900 border-amber-500/20">
                <CardHeader className="bg-gradient-to-r from-amber-950 to-zinc-900 py-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-amber-400">Query Results</CardTitle>
                    <Badge variant="outline" className="border-amber-500/50 text-amber-400">
                      {queryResults.length} rows
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="rounded-md overflow-hidden border border-zinc-800">
                    <Table>
                      <TableHeader className="bg-zinc-800">
                        <TableRow>
                          {resultColumns.map((column) => (
                            <TableHead key={column} className="text-amber-400">
                              {column}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {queryResults.map((row, index) => (
                          <TableRow key={index} className="border-zinc-800 hover:bg-zinc-800/50">
                            {resultColumns.map((column) => (
                              <TableCell key={column} className="text-zinc-300">
                                {row[column]}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataWarehouse;
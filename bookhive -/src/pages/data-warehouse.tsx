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
import { CustomQueryBuilder } from '@/components/CustomQueryBuilder';

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
  { 
    id: 'overdue_books', 
    name: 'Overdue Books', 
    query: 'SELECT b.title, b.author, m.first_name, m.last_name, \nDATEDIFF(CURRENT_DATE, fl.loan_date) as days_overdue\nFROM fact_loans fl\nJOIN dim_books b ON fl.book_key = b.book_key\nJOIN dim_members m ON fl.member_key = m.member_key\nWHERE fl.return_date IS NULL\nAND DATEDIFF(CURRENT_DATE, fl.loan_date) > 14\nORDER BY days_overdue DESC;',
    description: 'Lists all books that are overdue (more than 14 days since checkout)'
  },
  { 
    id: 'genre_popularity', 
    name: 'Genre Popularity', 
    query: 'SELECT b.genre, COUNT(*) as loan_count\nFROM fact_loans fl\nJOIN dim_books b ON fl.book_key = b.book_key\nGROUP BY b.genre\nORDER BY loan_count DESC;',
    description: 'Shows which book genres are most popular based on checkout frequency'
  },
  { 
    id: 'seasonal_trends', 
    name: 'Seasonal Borrowing Trends', 
    query: 'SELECT \n  CASE \n    WHEN d.month IN (12, 1, 2) THEN \'Winter\'\n    WHEN d.month IN (3, 4, 5) THEN \'Spring\'\n    WHEN d.month IN (6, 7, 8) THEN \'Summer\'\n    ELSE \'Fall\'\n  END as season,\n  COUNT(*) as loan_count\nFROM fact_loans fl\nJOIN dim_date d ON fl.loan_date = d.date_key\nGROUP BY season\nORDER BY loan_count DESC;',
    description: 'Analyzes borrowing patterns across different seasons'
  },
  { 
    id: 'library_comparison', 
    name: 'Library System Comparison', 
    query: 'SELECT \n  source_system,\n  COUNT(DISTINCT book_key) as unique_books,\n  COUNT(DISTINCT member_key) as unique_members,\n  COUNT(*) as total_transactions\nFROM fact_loans\nGROUP BY source_system;',
    description: 'Compares the two library systems by books, members, and transaction volume'
  },
  { 
    id: 'loan_duration', 
    name: 'Average Loan Duration', 
    query: 'SELECT \n  source_system,\n  AVG(loan_duration_days) as avg_days_borrowed\nFROM fact_loans\nWHERE return_date IS NOT NULL\nGROUP BY source_system;',
    description: 'Calculates the average number of days books are kept before being returned'
  },
  { 
    id: 'author_popularity', 
    name: 'Most Popular Authors', 
    query: 'SELECT a.author_name, COUNT(*) as loan_count\nFROM fact_loans fl\nJOIN dim_books b ON fl.book_key = b.book_key\nJOIN dim_authors a ON b.author_key = a.author_key\nGROUP BY a.author_name\nORDER BY loan_count DESC\nLIMIT 10;',
    description: 'Shows the top 10 most popular authors based on book checkouts'
  },
  { 
    id: 'publisher_analysis', 
    name: 'Publisher Analysis', 
    query: 'SELECT p.publisher_name, COUNT(DISTINCT b.book_key) as book_count, COUNT(*) as loan_count\nFROM fact_loans fl\nJOIN dim_books b ON fl.book_key = b.book_key\nJOIN dim_publishers p ON b.publisher_key = p.publisher_key\nGROUP BY p.publisher_name\nORDER BY loan_count DESC\nLIMIT 10;',
    description: 'Analyzes which publishers have the most books and loans'
  },
  { 
    id: 'member_demographics', 
    name: 'Member Demographics', 
    query: 'SELECT \n  YEAR(CURRENT_DATE) - YEAR(join_date) as membership_years,\n  COUNT(*) as member_count,\n  source_system\nFROM dim_members\nGROUP BY membership_years, source_system\nORDER BY membership_years;',
    description: 'Shows member distribution by years of membership and source system'
  },
  { 
    id: 'weekend_vs_weekday', 
    name: 'Weekend vs Weekday Loans', 
    query: 'SELECT \n  CASE WHEN d.is_weekend = 1 THEN \'Weekend\' ELSE \'Weekday\' END as day_type,\n  COUNT(*) as loan_count,\n  source_system\nFROM fact_loans fl\nJOIN dim_date d ON fl.loan_date = d.date_key\nGROUP BY day_type, source_system;',
    description: 'Compares loan patterns between weekends and weekdays'
  },
  { 
    id: 'book_age_analysis', 
    name: 'Book Age Analysis', 
    query: 'SELECT \n  FLOOR((YEAR(CURRENT_DATE) - publication_year) / 10) * 10 as decade_age,\n  COUNT(*) as book_count,\n  AVG(loan_duration_days) as avg_loan_duration\nFROM fact_loans fl\nJOIN dim_books b ON fl.book_key = b.book_key\nWHERE publication_year IS NOT NULL\nGROUP BY decade_age\nORDER BY decade_age;',
    description: 'Analyzes book popularity by age in decades'
  },
  { 
    id: 'quarterly_trends', 
    name: 'Quarterly Loan Trends', 
    query: 'SELECT \n  d.year,\n  d.quarter,\n  COUNT(*) as loan_count,\n  COUNT(DISTINCT fl.member_key) as unique_members\nFROM fact_loans fl\nJOIN dim_date d ON fl.loan_date = d.date_key\nGROUP BY d.year, d.quarter\nORDER BY d.year, d.quarter;',
    description: 'Shows loan trends by quarter with unique member counts'
  },
  { 
    id: 'genre_by_library', 
    name: 'Genre Popularity by Library', 
    query: 'SELECT \n  g.genre_name,\n  fl.source_system,\n  COUNT(*) as loan_count\nFROM fact_loans fl\nJOIN dim_books b ON fl.book_key = b.book_key\nJOIN dim_genres g ON b.genre_key = g.genre_key\nGROUP BY g.genre_name, fl.source_system\nORDER BY g.genre_name, loan_count DESC;',
    description: 'Compares genre popularity between the two library systems'
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
  overdue_books: [
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', first_name: 'Robert', last_name: 'Johnson', days_overdue: 45 },
    { title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', first_name: 'Sarah', last_name: 'Williams', days_overdue: 32 },
    { title: 'The Da Vinci Code', author: 'Dan Brown', first_name: 'Thomas', last_name: 'Anderson', days_overdue: 28 },
    { title: 'The Alchemist', author: 'Paulo Coelho', first_name: 'Jennifer', last_name: 'Smith', days_overdue: 21 },
    { title: 'The Hunger Games', author: 'Suzanne Collins', first_name: 'David', last_name: 'Brown', days_overdue: 18 },
  ],
  genre_popularity: [
    { genre: 'Fiction', loan_count: 1245 },
    { genre: 'Mystery', loan_count: 876 },
    { genre: 'Science Fiction', loan_count: 743 },
    { genre: 'Romance', loan_count: 652 },
    { genre: 'Biography', loan_count: 521 },
    { genre: 'History', loan_count: 498 },
  ],
  seasonal_trends: [
    { season: 'Summer', loan_count: 1876 },
    { season: 'Winter', loan_count: 1654 },
    { season: 'Fall', loan_count: 1432 },
    { season: 'Spring', loan_count: 1298 },
  ],
  library_comparison: [
    { source_system: 'UWindsor_Library', unique_books: 12500, unique_members: 3200, total_transactions: 28450 },
    { source_system: 'Windsor_PLibrary', unique_books: 18700, unique_members: 5400, total_transactions: 42680 },
  ],
  loan_duration: [
    { source_system: 'UWindsor_Library', avg_days_borrowed: 12.7 },
    { source_system: 'Windsor_PLibrary', avg_days_borrowed: 14.3 },
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
                    <TabsTrigger value="builder" className="data-[state=active]:bg-amber-900/50">Query Builder</TabsTrigger>
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
                  
                  <TabsContent value="builder" className="mt-4">
                    <CustomQueryBuilder 
                      onQueryGenerated={(query) => {
                        setCustomQuery(query);
                        setQueryToDisplay(query);
                        setActiveTab('custom');
                      }} 
                    />
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
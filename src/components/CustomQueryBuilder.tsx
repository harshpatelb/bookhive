import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface CustomQueryBuilderProps {
  onQueryGenerated: (query: string) => void;
}

export function CustomQueryBuilder({ onQueryGenerated }: CustomQueryBuilderProps) {
  const [queryType, setQueryType] = useState('popular_books');
  const [timeFrame, setTimeFrame] = useState('all_time');
  const [customYear, setCustomYear] = useState(new Date().getFullYear().toString());
  const [customMonth, setCustomMonth] = useState('1');
  const [customQuarter, setCustomQuarter] = useState('1');
  const [limit, setLimit] = useState('10');
  const [sourceSystem, setSourceSystem] = useState('all');
  const [includeGenre, setIncludeGenre] = useState(false);
  const [includeAuthor, setIncludeAuthor] = useState(false);
  const [includePublisher, setIncludePublisher] = useState(false);

  const generateQuery = () => {
    let query = '';
    
    // Base query parts based on query type
    switch (queryType) {
      case 'popular_books':
        query = `SELECT b.title`;
        
        if (includeAuthor) {
          query += `, a.author_name`;
        }
        
        if (includeGenre) {
          query += `, g.genre_name`;
        }
        
        if (includePublisher) {
          query += `, p.publisher_name`;
        }
        
        query += `, COUNT(*) as loan_count\nFROM fact_loans fl\nJOIN dim_books b ON fl.book_key = b.book_key`;
        
        if (includeAuthor) {
          query += `\nJOIN dim_authors a ON b.author_key = a.author_key`;
        }
        
        if (includeGenre) {
          query += `\nJOIN dim_genres g ON b.genre_key = g.genre_key`;
        }
        
        if (includePublisher) {
          query += `\nJOIN dim_publishers p ON b.publisher_key = p.publisher_key`;
        }
        
        query += `\nJOIN dim_date d ON fl.loan_date = d.date_key`;
        
        // Add time frame conditions
        if (timeFrame !== 'all_time') {
          query += `\nWHERE `;
          
          switch (timeFrame) {
            case 'current_year':
              query += `d.year = YEAR(CURRENT_DATE)`;
              break;
            case 'current_month':
              query += `d.year = YEAR(CURRENT_DATE) AND d.month = MONTH(CURRENT_DATE)`;
              break;
            case 'current_quarter':
              query += `d.year = YEAR(CURRENT_DATE) AND d.quarter = QUARTER(CURRENT_DATE)`;
              break;
            case 'custom_year':
              query += `d.year = ${customYear}`;
              break;
            case 'custom_month':
              query += `d.year = ${customYear} AND d.month = ${customMonth}`;
              break;
            case 'custom_quarter':
              query += `d.year = ${customYear} AND d.quarter = ${customQuarter}`;
              break;
          }
          
          // Add source system filter if selected
          if (sourceSystem !== 'all') {
            query += `\nAND fl.source_system = '${sourceSystem}'`;
          }
        } else if (sourceSystem !== 'all') {
          // If no time frame but source system is selected
          query += `\nWHERE fl.source_system = '${sourceSystem}'`;
        }
        
        // Group by and order by
        query += `\nGROUP BY b.title`;
        
        if (includeAuthor) {
          query += `, a.author_name`;
        }
        
        if (includeGenre) {
          query += `, g.genre_name`;
        }
        
        if (includePublisher) {
          query += `, p.publisher_name`;
        }
        
        query += `\nORDER BY loan_count DESC\nLIMIT ${limit};`;
        break;
        
      case 'active_members':
        query = `SELECT m.first_name, m.last_name, COUNT(*) as checkout_count\nFROM fact_loans fl\nJOIN dim_members m ON fl.member_key = m.member_key\nJOIN dim_date d ON fl.loan_date = d.date_key`;
        
        // Add time frame conditions
        if (timeFrame !== 'all_time') {
          query += `\nWHERE `;
          
          switch (timeFrame) {
            case 'current_year':
              query += `d.year = YEAR(CURRENT_DATE)`;
              break;
            case 'current_month':
              query += `d.year = YEAR(CURRENT_DATE) AND d.month = MONTH(CURRENT_DATE)`;
              break;
            case 'current_quarter':
              query += `d.year = YEAR(CURRENT_DATE) AND d.quarter = QUARTER(CURRENT_DATE)`;
              break;
            case 'custom_year':
              query += `d.year = ${customYear}`;
              break;
            case 'custom_month':
              query += `d.year = ${customYear} AND d.month = ${customMonth}`;
              break;
            case 'custom_quarter':
              query += `d.year = ${customYear} AND d.quarter = ${customQuarter}`;
              break;
          }
          
          // Add source system filter if selected
          if (sourceSystem !== 'all') {
            query += `\nAND fl.source_system = '${sourceSystem}'`;
          }
        } else if (sourceSystem !== 'all') {
          // If no time frame but source system is selected
          query += `\nWHERE fl.source_system = '${sourceSystem}'`;
        }
        
        // Group by and order by
        query += `\nGROUP BY m.first_name, m.last_name\nORDER BY checkout_count DESC\nLIMIT ${limit};`;
        break;
        
      case 'loan_trends':
        query = `SELECT `;
        
        switch (timeFrame) {
          case 'by_month':
            query += `d.month, d.year`;
            break;
          case 'by_quarter':
            query += `d.quarter, d.year`;
            break;
          case 'by_year':
            query += `d.year`;
            break;
          default:
            query += `d.month, d.year`;
        }
        
        query += `, COUNT(*) as loan_count`;
        
        if (sourceSystem !== 'all') {
          query += `, '${sourceSystem}' as source`;
        } else {
          query += `, fl.source_system`;
        }
        
        query += `\nFROM fact_loans fl\nJOIN dim_date d ON fl.loan_date = d.date_key`;
        
        // Add source system filter if selected
        if (sourceSystem !== 'all') {
          query += `\nWHERE fl.source_system = '${sourceSystem}'`;
        }
        
        // Group by
        query += `\nGROUP BY `;
        
        switch (timeFrame) {
          case 'by_month':
            query += `d.month, d.year`;
            break;
          case 'by_quarter':
            query += `d.quarter, d.year`;
            break;
          case 'by_year':
            query += `d.year`;
            break;
          default:
            query += `d.month, d.year`;
        }
        
        if (sourceSystem !== 'all') {
          query += `, source`;
        } else {
          query += `, fl.source_system`;
        }
        
        // Order by
        switch (timeFrame) {
          case 'by_month':
            query += `\nORDER BY d.year, d.month`;
            break;
          case 'by_quarter':
            query += `\nORDER BY d.year, d.quarter`;
            break;
          case 'by_year':
            query += `\nORDER BY d.year`;
            break;
          default:
            query += `\nORDER BY d.year, d.month`;
        }
        
        query += `;`;
        break;
    }
    
    onQueryGenerated(query);
  };

  return (
    <Card className="bg-zinc-900 border-amber-500/20">
      <CardHeader className="bg-gradient-to-r from-amber-950 to-zinc-900">
        <CardTitle className="text-amber-400">Custom Query Builder</CardTitle>
        <CardDescription>Build custom queries without writing SQL</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-3">
          <Label htmlFor="query-type">Query Type</Label>
          <Select value={queryType} onValueChange={setQueryType}>
            <SelectTrigger id="query-type" className="bg-zinc-800 border-zinc-700">
              <SelectValue placeholder="Select query type" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700">
              <SelectItem value="popular_books">Most Popular Books</SelectItem>
              <SelectItem value="active_members">Most Active Members</SelectItem>
              <SelectItem value="loan_trends">Loan Trends Analysis</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {queryType === 'loan_trends' ? (
          <div className="space-y-3">
            <Label>Time Aggregation</Label>
            <RadioGroup value={timeFrame} onValueChange={setTimeFrame} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="by_month" id="by_month" />
                <Label htmlFor="by_month">By Month</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="by_quarter" id="by_quarter" />
                <Label htmlFor="by_quarter">By Quarter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="by_year" id="by_year" />
                <Label htmlFor="by_year">By Year</Label>
              </div>
            </RadioGroup>
          </div>
        ) : (
          <div className="space-y-3">
            <Label>Time Frame</Label>
            <RadioGroup value={timeFrame} onValueChange={setTimeFrame} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all_time" id="all_time" />
                <Label htmlFor="all_time">All Time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="current_year" id="current_year" />
                <Label htmlFor="current_year">Current Year</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="current_month" id="current_month" />
                <Label htmlFor="current_month">Current Month</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="current_quarter" id="current_quarter" />
                <Label htmlFor="current_quarter">Current Quarter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom_year" id="custom_year" />
                <Label htmlFor="custom_year">Custom Year</Label>
                {timeFrame === 'custom_year' && (
                  <Input 
                    type="number" 
                    value={customYear} 
                    onChange={(e) => setCustomYear(e.target.value)}
                    className="w-24 ml-2 bg-zinc-800 border-zinc-700"
                    min="2000"
                    max="2030"
                  />
                )}
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom_month" id="custom_month" />
                <Label htmlFor="custom_month">Custom Month & Year</Label>
                {timeFrame === 'custom_month' && (
                  <div className="flex space-x-2 ml-2">
                    <Select value={customMonth} onValueChange={setCustomMonth}>
                      <SelectTrigger className="w-24 bg-zinc-800 border-zinc-700">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
                          <SelectItem key={month} value={month.toString()}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input 
                      type="number" 
                      value={customYear} 
                      onChange={(e) => setCustomYear(e.target.value)}
                      className="w-24 bg-zinc-800 border-zinc-700"
                      min="2000"
                      max="2030"
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom_quarter" id="custom_quarter" />
                <Label htmlFor="custom_quarter">Custom Quarter & Year</Label>
                {timeFrame === 'custom_quarter' && (
                  <div className="flex space-x-2 ml-2">
                    <Select value={customQuarter} onValueChange={setCustomQuarter}>
                      <SelectTrigger className="w-24 bg-zinc-800 border-zinc-700">
                        <SelectValue placeholder="Quarter" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        {[1, 2, 3, 4].map((quarter) => (
                          <SelectItem key={quarter} value={quarter.toString()}>
                            Q{quarter}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input 
                      type="number" 
                      value={customYear} 
                      onChange={(e) => setCustomYear(e.target.value)}
                      className="w-24 bg-zinc-800 border-zinc-700"
                      min="2000"
                      max="2030"
                    />
                  </div>
                )}
              </div>
            </RadioGroup>
          </div>
        )}

        <div className="space-y-3">
          <Label htmlFor="source-system">Source System</Label>
          <Select value={sourceSystem} onValueChange={setSourceSystem}>
            <SelectTrigger id="source-system" className="bg-zinc-800 border-zinc-700">
              <SelectValue placeholder="Select source system" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700">
              <SelectItem value="all">All Systems</SelectItem>
              <SelectItem value="UWindsor_Library">UWindsor Library</SelectItem>
              <SelectItem value="Windsor_PLibrary">Windsor Public Library</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {queryType === 'popular_books' && (
          <div className="space-y-3">
            <Label>Include Additional Information</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-author" 
                  checked={includeAuthor} 
                  onCheckedChange={(checked) => setIncludeAuthor(checked as boolean)}
                />
                <Label htmlFor="include-author">Include Author</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-genre" 
                  checked={includeGenre} 
                  onCheckedChange={(checked) => setIncludeGenre(checked as boolean)}
                />
                <Label htmlFor="include-genre">Include Genre</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-publisher" 
                  checked={includePublisher} 
                  onCheckedChange={(checked) => setIncludePublisher(checked as boolean)}
                />
                <Label htmlFor="include-publisher">Include Publisher</Label>
              </div>
            </div>
          </div>
        )}

        {(queryType === 'popular_books' || queryType === 'active_members') && (
          <div className="space-y-3">
            <Label htmlFor="limit">Result Limit</Label>
            <Input 
              id="limit"
              type="number" 
              value={limit} 
              onChange={(e) => setLimit(e.target.value)}
              className="w-full bg-zinc-800 border-zinc-700"
              min="1"
              max="100"
            />
          </div>
        )}

        <Button 
          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
          onClick={generateQuery}
        >
          Generate Query
        </Button>
      </CardContent>
    </Card>
  );
}
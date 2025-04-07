# BookHIVE - Library Management System with Data Warehouse

BookHIVE is a comprehensive library management system with an integrated data warehouse solution that combines data from multiple library sources (UWindsor Library and Windsor Public Library) for advanced analytics and reporting.

> **Looking to run the application locally?** Check out the [Local Setup Guide](LOCAL_SETUP.md) for instructions on running the web application on your local machine.

## Technical Stack

### Frontend
- **Framework**: Next.js - A React framework for production-grade applications
- **UI Components**: shadcn/ui - A collection of reusable UI components built with Radix UI and Tailwind CSS
- **Styling**: Tailwind CSS - A utility-first CSS framework for rapid UI development
- **State Management**: React Hooks for local state management
- **Data Fetching**: Next.js API routes for server-side data fetching

## Application Pages

### Home Page
The main landing page that provides an overview of the BookHIVE system and its features.

### Architecture Page (`/architecture`)
Detailed explanation of the system architecture, including source databases, data warehouse structure, and database schemas. This page shows how data flows between different components of the system.

### ETL Process Page (`/etl-process`)
Explains the Extract, Transform, Load process used to integrate data from multiple library sources into the unified data warehouse. Includes detailed SQL examples and process diagrams.

### Data Entry Page (`/data-entry`)
Allows users to add data to source databases (UWindsor_Library and UToronto_Library) through forms or direct SQL queries. Supports adding:
- Books
- Members
- Transactions (borrowing, returning, and renewing books)

### Data Warehouse Page (`/data-warehouse`)
Provides tools for querying and analyzing the integrated data warehouse, with predefined queries and custom query capabilities.

### Backend
- **API Routes**: Next.js API routes for handling server-side logic
- **Database ORM**: Prisma - A next-generation ORM for Node.js and TypeScript
- **Authentication**: (To be implemented based on requirements)

### Database
- **Database System**: MySQL - A robust relational database management system
- **Data Warehouse**: MySQL-based data warehouse with star and snowflake schemas
- **ETL Process**: Custom ETL procedures for data extraction, transformation, and loading

## Database Connection

BookHIVE connects to MySQL databases using Prisma ORM. The connection is configured in the Prisma schema file and uses environment variables for secure credential management.

### Connection Configuration

The application connects to three different MySQL databases:
1. **UWindsor Library Database** - Contains academic library data
2. **UToronto Library Database** - Contains University of Toronto library data
3. **Data Warehouse** - Consolidated data from both sources

### Connection Setup

To set up the database connection:

1. Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL_UWINDSOR="mysql://username:password@localhost:3306/UWindsor_Library"
   DATABASE_URL_PUBLIC="mysql://username:password@localhost:3306/Windsor_PLibrary"
   DATABASE_URL_WAREHOUSE="mysql://username:password@localhost:3306/BookHIVE_DW"
   ```

2. Replace `username` and `password` with your MySQL credentials

3. The application uses Prisma to connect to these databases:
   ```typescript
   // Example Prisma client initialization
   import { PrismaClient } from '@prisma/client'
   
   const prismaUWindsor = new PrismaClient({
     datasources: {
       db: {
         url: process.env.DATABASE_URL_UWINDSOR,
       },
     },
   })
   
   const prismaPublic = new PrismaClient({
     datasources: {
       db: {
         url: process.env.DATABASE_URL_PUBLIC,
       },
     },
   })
   
   const prismaWarehouse = new PrismaClient({
     datasources: {
       db: {
         url: process.env.DATABASE_URL_WAREHOUSE,
       },
     },
   })
   ```

## System Overview

BookHIVE integrates data from two separate source databases into a unified data warehouse for comprehensive library management and analytics. The entire system is implemented using MySQL Workbench.

### Architecture Components

1. **Source Databases (MySQL)**
   - UWindsor_Library: University library system with academic resources
   - UToronto_Library: University of Toronto library system with academic and research resources

2. **ETL Processing Layer**
   - Data extraction from source databases
   - Data transformation and standardization
   - Loading into the data warehouse

3. **Data Warehouse (MySQL)**
   - Star Schema for transaction analysis
   - Snowflake Schema for book information
   - Optimized for analytics and reporting

## How to Run the BookHIVE System

### Prerequisites

- MySQL Server (version 8.0 or higher)
- MySQL Workbench (version 8.0 or higher)

### Step 1: Install MySQL and MySQL Workbench

1. Download and install MySQL Server from the [official MySQL website](https://dev.mysql.com/downloads/mysql/)
2. Download and install MySQL Workbench from the [official MySQL website](https://dev.mysql.com/downloads/workbench/)
3. Configure MySQL Server with a root password and remember it for later use

### Step 2: Set Up Source Databases

1. Open MySQL Workbench and connect to your MySQL Server instance
2. Create the UWindsor_Library database:
   ```sql
   CREATE DATABASE UWindsor_Library;
   USE UWindsor_Library;

   CREATE TABLE books (
     id INT PRIMARY KEY AUTO_INCREMENT,
     title VARCHAR(255) NOT NULL,
     author VARCHAR(255) NOT NULL,
     isbn VARCHAR(13),
     publisher VARCHAR(255),
     genre VARCHAR(100),
     publication_year INT,
     INDEX idx_isbn (isbn),
     INDEX idx_author (author)
   );

   CREATE TABLE members (
     id INT PRIMARY KEY AUTO_INCREMENT,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     join_date DATE NOT NULL,
     member_type VARCHAR(50) NOT NULL,
     status VARCHAR(20) DEFAULT 'active',
     UNIQUE INDEX idx_email (email)
   );

   CREATE TABLE loans (
     id INT PRIMARY KEY AUTO_INCREMENT,
     book_id INT NOT NULL,
     member_id INT NOT NULL,
     loan_date DATE NOT NULL,
     due_date DATE NOT NULL,
     return_date DATE,
     status VARCHAR(20) DEFAULT 'active',
     FOREIGN KEY (book_id) REFERENCES books(id),
     FOREIGN KEY (member_id) REFERENCES members(id),
     INDEX idx_loan_date (loan_date),
     INDEX idx_status (status)
   );
   ```

3. Create the UToronto_Library database:
   ```sql
   CREATE DATABASE UToronto_Library;
   USE UToronto_Library;

   CREATE TABLE inventory (
     item_id INT PRIMARY KEY AUTO_INCREMENT,
     title VARCHAR(255) NOT NULL,
     creator VARCHAR(255) NOT NULL,
     isbn VARCHAR(13),
     publisher VARCHAR(255),
     category VARCHAR(100),
     year_published INT,
     acquisition_date DATE,
     INDEX idx_isbn (isbn),
     INDEX idx_category (category)
   );

   CREATE TABLE patrons (
     patron_id INT PRIMARY KEY AUTO_INCREMENT,
     full_name VARCHAR(255) NOT NULL,
     contact_email VARCHAR(255) NOT NULL,
     registration_date DATE NOT NULL,
     patron_type VARCHAR(50) NOT NULL,
     is_active BOOLEAN DEFAULT TRUE,
     UNIQUE INDEX idx_email (contact_email)
   );

   CREATE TABLE checkouts (
     checkout_id INT PRIMARY KEY AUTO_INCREMENT,
     item_id INT NOT NULL,
     patron_id INT NOT NULL,
     checkout_date DATE NOT NULL,
     expected_return DATE NOT NULL,
     actual_return DATE,
     checkout_status VARCHAR(20) DEFAULT 'active',
     FOREIGN KEY (item_id) REFERENCES inventory(item_id),
     FOREIGN KEY (patron_id) REFERENCES patrons(patron_id),
     INDEX idx_checkout_date (checkout_date),
     INDEX idx_status (checkout_status)
   );
   ```

### Step 3: Create the Data Warehouse

1. Create the BookHIVE_DW database:
   ```sql
   CREATE DATABASE BookHIVE_DW;
   USE BookHIVE_DW;

   -- Star Schema for Transactions
   CREATE TABLE Dim_Books (
     book_key INT PRIMARY KEY AUTO_INCREMENT,
     source_id VARCHAR(50) NOT NULL,
     title VARCHAR(255) NOT NULL,
     isbn VARCHAR(13),
     author_key INT,
     publisher_key INT,
     genre_key INT,
     publication_year INT,
     source_system VARCHAR(50) NOT NULL,
     UNIQUE INDEX idx_source_id (source_id),
     INDEX idx_title (title),
     INDEX idx_isbn (isbn)
   );

   CREATE TABLE Dim_Members (
     member_key INT PRIMARY KEY AUTO_INCREMENT,
     source_id VARCHAR(50) NOT NULL,
     first_name VARCHAR(100) NOT NULL,
     last_name VARCHAR(100) NOT NULL,
     email VARCHAR(255),
     join_date DATE,
     member_type VARCHAR(50),
     source_system VARCHAR(50) NOT NULL,
     UNIQUE INDEX idx_source_id (source_id),
     INDEX idx_name (last_name, first_name)
   );

   CREATE TABLE Dim_Dates (
     date_key INT PRIMARY KEY AUTO_INCREMENT,
     full_date DATE NOT NULL,
     day INT NOT NULL,
     month INT NOT NULL,
     year INT NOT NULL,
     quarter INT NOT NULL,
     is_weekend BOOLEAN NOT NULL,
     UNIQUE INDEX idx_full_date (full_date)
   );

   CREATE TABLE Fact_Transactions (
     transaction_id INT PRIMARY KEY AUTO_INCREMENT,
     book_key INT NOT NULL,
     member_key INT NOT NULL,
     date_key INT NOT NULL,
     transaction_type VARCHAR(20) NOT NULL,
     source_system VARCHAR(50) NOT NULL,
     loan_duration_days INT,
     is_overdue BOOLEAN,
     fine_amount DECIMAL(10,2),
     FOREIGN KEY (book_key) REFERENCES Dim_Books(book_key),
     FOREIGN KEY (member_key) REFERENCES Dim_Members(member_key),
     FOREIGN KEY (date_key) REFERENCES Dim_Dates(date_key),
     INDEX idx_transaction_type (transaction_type),
     INDEX idx_source_system (source_system)
   );

   -- Snowflake Schema for Books
   CREATE TABLE Dim_Authors (
     author_key INT PRIMARY KEY AUTO_INCREMENT,
     author_name VARCHAR(255) NOT NULL,
     author_nationality VARCHAR(100),
     UNIQUE INDEX idx_author_name (author_name)
   );

   CREATE TABLE Dim_Publishers (
     publisher_key INT PRIMARY KEY AUTO_INCREMENT,
     publisher_name VARCHAR(255) NOT NULL,
     publisher_location VARCHAR(100),
     UNIQUE INDEX idx_publisher_name (publisher_name)
   );

   CREATE TABLE Dim_Genres (
     genre_key INT PRIMARY KEY AUTO_INCREMENT,
     genre_name VARCHAR(100) NOT NULL,
     genre_category VARCHAR(100),
     parent_genre_key INT,
     UNIQUE INDEX idx_genre_name (genre_name),
     FOREIGN KEY (parent_genre_key) REFERENCES Dim_Genres(genre_key)
   );

   -- Add foreign key constraints to Dim_Books
   ALTER TABLE Dim_Books
   ADD CONSTRAINT fk_author_key FOREIGN KEY (author_key) REFERENCES Dim_Authors(author_key),
   ADD CONSTRAINT fk_publisher_key FOREIGN KEY (publisher_key) REFERENCES Dim_Publishers(publisher_key),
   ADD CONSTRAINT fk_genre_key FOREIGN KEY (genre_key) REFERENCES Dim_Genres(genre_key);
   ```

### Step 4: Create ETL Stored Procedures

1. Create a stored procedure for extraction:
   ```sql
   DELIMITER //
   CREATE PROCEDURE BookHIVE_DW.extract_source_data()
   BEGIN
     -- Create temporary tables to hold extracted data
     CREATE TEMPORARY TABLE temp_uwindsor_books AS
     SELECT 
       b.id, 
       b.title, 
       b.isbn, 
       b.author, 
       b.publisher, 
       b.genre,
       b.publication_year,
       'UWindsor_Library' as source
     FROM UWindsor_Library.books b;

     CREATE TEMPORARY TABLE temp_windsor_plibrary_books AS
     SELECT 
       i.item_id, 
       i.title, 
       i.isbn, 
       i.creator as author, 
       i.publisher, 
       i.category as genre,
       i.year_published,
       'Windsor_PLibrary' as source
     FROM Windsor_PLibrary.inventory i
     WHERE i.category IN ('Book', 'Textbook', 'Reference');
   END //
   DELIMITER ;
   ```

2. Create a stored procedure for transformation:
   ```sql
   DELIMITER //
   CREATE PROCEDURE BookHIVE_DW.transform_staging_data()
   BEGIN
     -- Create staging table if it doesn't exist
     CREATE TABLE IF NOT EXISTS BookHIVE_DW.staging_books (
       source_id VARCHAR(50) NOT NULL,
       title VARCHAR(255) NOT NULL,
       isbn VARCHAR(13),
       author VARCHAR(255) NOT NULL,
       publisher VARCHAR(255),
       genre VARCHAR(100),
       publication_year INT,
       source_system VARCHAR(50) NOT NULL,
       PRIMARY KEY (source_id)
     );

     -- Clear staging table
     TRUNCATE TABLE BookHIVE_DW.staging_books;

     -- Transform UWindsor data and insert into staging
     INSERT INTO BookHIVE_DW.staging_books
     SELECT 
       CONCAT('UW-', id) as source_id,
       UPPER(TRIM(title)) as title,
       CASE 
         WHEN isbn IS NULL OR isbn = '' THEN NULL
         WHEN LENGTH(isbn) < 10 THEN NULL
         ELSE isbn
       END as isbn,
       TRIM(author) as author,
       NULLIF(TRIM(publisher), '') as publisher,
       NULLIF(TRIM(genre), '') as genre,
       CASE
         WHEN publication_year < 1800 OR publication_year > YEAR(CURRENT_DATE) THEN NULL
         ELSE publication_year
       END as publication_year,
       source
     FROM temp_uwindsor_books;

     -- Transform Windsor Public Library data and insert into staging
     INSERT INTO BookHIVE_DW.staging_books
     SELECT 
       CONCAT('PL-', item_id) as source_id,
       UPPER(TRIM(title)) as title,
       CASE 
         WHEN isbn IS NULL OR isbn = '' THEN NULL
         WHEN LENGTH(isbn) < 10 THEN NULL
         ELSE isbn
       END as isbn,
       TRIM(author) as author,
       NULLIF(TRIM(publisher), '') as publisher,
       NULLIF(TRIM(genre), '') as genre,
       CASE
         WHEN year_published < 1800 OR year_published > YEAR(CURRENT_DATE) THEN NULL
         ELSE year_published
       END as publication_year,
       source
     FROM temp_windsor_plibrary_books;
   END //
   DELIMITER ;
   ```

3. Create a stored procedure for loading:
   ```sql
   DELIMITER //
   CREATE PROCEDURE BookHIVE_DW.load_warehouse_data()
   BEGIN
     -- First ensure dimension tables exist
     INSERT IGNORE INTO BookHIVE_DW.Dim_Authors (author_name)
     SELECT DISTINCT author FROM BookHIVE_DW.staging_books;

     INSERT IGNORE INTO BookHIVE_DW.Dim_Publishers (publisher_name)
     SELECT DISTINCT publisher FROM BookHIVE_DW.staging_books 
     WHERE publisher IS NOT NULL;

     INSERT IGNORE INTO BookHIVE_DW.Dim_Genres (genre_name)
     SELECT DISTINCT genre FROM BookHIVE_DW.staging_books 
     WHERE genre IS NOT NULL;

     -- Load book dimension with foreign keys
     INSERT INTO BookHIVE_DW.Dim_Books (source_id, title, isbn, author_key, publisher_key, genre_key, publication_year, source_system)
     SELECT 
       s.source_id,
       s.title,
       s.isbn,
       a.author_key,
       p.publisher_key,
       g.genre_key,
       s.publication_year,
       s.source_system
     FROM BookHIVE_DW.staging_books s
     LEFT JOIN BookHIVE_DW.Dim_Authors a ON s.author = a.author_name
     LEFT JOIN BookHIVE_DW.Dim_Publishers p ON s.publisher = p.publisher_name
     LEFT JOIN BookHIVE_DW.Dim_Genres g ON s.genre = g.genre_name
     ON DUPLICATE KEY UPDATE
       title = s.title,
       isbn = s.isbn,
       author_key = a.author_key,
       publisher_key = p.publisher_key,
       genre_key = g.genre_key,
       publication_year = s.publication_year;

     -- Clean up staging table for next ETL run
     TRUNCATE TABLE BookHIVE_DW.staging_books;
   END //
   DELIMITER ;
   ```

### Step 5: Create a Master ETL Procedure

```sql
DELIMITER //
CREATE PROCEDURE BookHIVE_DW.run_etl_process()
BEGIN
  -- Create log table if it doesn't exist
  CREATE TABLE IF NOT EXISTS BookHIVE_DW.etl_log (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    process_name VARCHAR(100) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME,
    status VARCHAR(20)
  );
  
  -- Log ETL start
  INSERT INTO BookHIVE_DW.etl_log (process_name, start_time, status)
  VALUES ('Full ETL Process', NOW(), 'Started');
  
  -- Run ETL steps
  CALL BookHIVE_DW.extract_source_data();
  CALL BookHIVE_DW.transform_staging_data();
  CALL BookHIVE_DW.load_warehouse_data();
  
  -- Update log with completion
  UPDATE BookHIVE_DW.etl_log
  SET end_time = NOW(), status = 'Completed'
  WHERE process_name = 'Full ETL Process' AND end_time IS NULL
  ORDER BY log_id DESC LIMIT 1;
  
  SELECT 'ETL Process completed successfully' AS message;
END //
DELIMITER ;
```

### Step 6: Schedule Automated ETL

1. Enable the MySQL Event Scheduler:
   ```sql
   SET GLOBAL event_scheduler = ON;
   ```

2. Create an event for daily ETL process:
   ```sql
   CREATE EVENT IF NOT EXISTS daily_etl_process
   ON SCHEDULE EVERY 1 DAY
   STARTS CURRENT_TIMESTAMP + INTERVAL 1 DAY
   DO
   BEGIN
     CALL BookHIVE_DW.run_etl_process();
   END;
   ```

### Step 7: Run the ETL Process Manually

To run the ETL process manually, execute:
```sql
CALL BookHIVE_DW.run_etl_process();
```

### Step 8: Query the Data Warehouse

Once the ETL process has completed, you can run queries against the data warehouse. Here are some example queries:

#### Most Popular Books
```sql
SELECT b.title, b.author, COUNT(*) as loan_count
FROM fact_loans fl
JOIN dim_books b ON fl.book_key = b.book_key
GROUP BY b.title, b.author
ORDER BY loan_count DESC
LIMIT 10;
```

#### Most Active Members
```sql
SELECT m.first_name, m.last_name, COUNT(*) as checkout_count
FROM fact_loans fl
JOIN dim_members m ON fl.member_key = m.member_key
GROUP BY m.first_name, m.last_name
ORDER BY checkout_count DESC
LIMIT 10;
```

#### Monthly Loan Trends
```sql
SELECT d.month, d.year, COUNT(*) as loan_count
FROM fact_loans fl
JOIN dim_date d ON fl.loan_date = d.date_key
GROUP BY d.month, d.year
ORDER BY d.year, d.month;
```

#### Source System Comparison
```sql
SELECT source_system, COUNT(*) as record_count
FROM fact_loans
GROUP BY source_system;
```

#### Overdue Books
```sql
SELECT b.title, b.author, m.first_name, m.last_name, 
DATEDIFF(CURRENT_DATE, fl.loan_date) as days_overdue
FROM fact_loans fl
JOIN dim_books b ON fl.book_key = b.book_key
JOIN dim_members m ON fl.member_key = m.member_key
WHERE fl.return_date IS NULL
AND DATEDIFF(CURRENT_DATE, fl.loan_date) > 14
ORDER BY days_overdue DESC;
```

## Additional Predefined Queries

### Genre Popularity
```sql
SELECT g.genre_name, COUNT(*) as loan_count
FROM fact_loans fl
JOIN dim_books b ON fl.book_key = b.book_key
JOIN dim_genres g ON b.genre_key = g.genre_key
GROUP BY g.genre_name
ORDER BY loan_count DESC;
```

### Seasonal Borrowing Trends
```sql
SELECT 
  CASE 
    WHEN d.month IN (12, 1, 2) THEN 'Winter'
    WHEN d.month IN (3, 4, 5) THEN 'Spring'
    WHEN d.month IN (6, 7, 8) THEN 'Summer'
    ELSE 'Fall'
  END as season,
  COUNT(*) as loan_count
FROM fact_loans fl
JOIN dim_date d ON fl.loan_date = d.date_key
GROUP BY season
ORDER BY loan_count DESC;
```

### Most Popular Authors
```sql
SELECT a.author_name, COUNT(*) as loan_count
FROM fact_loans fl
JOIN dim_books b ON fl.book_key = b.book_key
JOIN dim_authors a ON b.author_key = a.author_key
GROUP BY a.author_name
ORDER BY loan_count DESC
LIMIT 10;
```

### Publisher Analysis
```sql
SELECT p.publisher_name, COUNT(DISTINCT b.book_key) as book_count, COUNT(*) as loan_count
FROM fact_loans fl
JOIN dim_books b ON fl.book_key = b.book_key
JOIN dim_publishers p ON b.publisher_key = p.publisher_key
GROUP BY p.publisher_name
ORDER BY loan_count DESC
LIMIT 10;
```

### Weekend vs Weekday Loans
```sql
SELECT 
  CASE WHEN d.is_weekend = 1 THEN 'Weekend' ELSE 'Weekday' END as day_type,
  COUNT(*) as loan_count,
  source_system
FROM fact_loans fl
JOIN dim_date d ON fl.loan_date = d.date_key
GROUP BY day_type, source_system;
```

## Working with Data in MySQL Workbench

This section provides detailed instructions on how to work with data in MySQL Workbench for the BookHIVE system.

### Importing Sample Data

To populate your databases with sample data:

1. **Create CSV Files for Import**:
   
   Create CSV files with the following structure for each table:

   **UWindsor_Library.books.csv**:
   ```
   id,title,author,isbn,publisher,genre,publication_year
   1,"Introduction to Database Systems","C.J. Date","9780321197849","Pearson","Computer Science",2003
   2,"The Art of Computer Programming","Donald Knuth","9780201896831","Addison-Wesley","Computer Science",1997
   ```

   **Windsor_PLibrary.inventory.csv**:
   ```
   item_id,title,creator,isbn,publisher,category,year_published,acquisition_date
   1,"To Kill a Mockingbird","Harper Lee","9780061120084","HarperCollins","Fiction",1960,"2020-01-15"
   2,"1984","George Orwell","9780451524935","Signet Classics","Fiction",1949,"2020-02-20"
   ```

2. **Import Data Using MySQL Workbench**:

   a. Open MySQL Workbench and connect to your server
   
   b. Right-click on the target table in the Navigator panel and select "Table Data Import Wizard"
   
   c. Browse to select your CSV file
   
   d. Follow the wizard steps:
      - Select "Use existing table" option
      - Map CSV columns to table columns
      - Review the data and click "Next"
      - Click "Finish" to import the data

   e. Verify the import with a SELECT query:
   ```sql
   SELECT * FROM UWindsor_Library.books;
   ```

3. **Bulk Import Using SQL**:

   Alternatively, you can use LOAD DATA INFILE:
   ```sql
   LOAD DATA INFILE 'C:/path/to/UWindsor_Library.books.csv' 
   INTO TABLE UWindsor_Library.books 
   FIELDS TERMINATED BY ',' 
   ENCLOSED BY '"' 
   LINES TERMINATED BY '\n'
   IGNORE 1 ROWS;
   ```

### Exporting Data from MySQL Workbench

To export data from your databases:

1. **Export Using MySQL Workbench UI**:

   a. Right-click on the database or table you want to export in the Navigator panel
   
   b. Select "Table Data Export Wizard"
   
   c. Choose the tables to export
   
   d. Select the export format (CSV, JSON, Excel, etc.)
   
   e. Specify the destination file
   
   f. Click "Next" and then "Finish"

2. **Export Using SQL Commands**:

   ```sql
   SELECT * 
   FROM UWindsor_Library.books
   INTO OUTFILE 'C:/path/to/export/books_export.csv'
   FIELDS TERMINATED BY ',' 
   ENCLOSED BY '"'
   LINES TERMINATED BY '\n';
   ```

3. **Export Data Warehouse Results**:

   a. Run your query in MySQL Workbench
   
   b. In the Results Grid, click the "Export" button
   
   c. Choose your preferred format (CSV, JSON, HTML, etc.)
   
   d. Specify the destination file
   
   e. Click "Save"

### Visualizing Data in MySQL Workbench

MySQL Workbench provides several ways to visualize your data:

1. **Using the Results Grid**:

   a. Run a query in MySQL Workbench
   
   b. View the results in the Results Grid
   
   c. Sort columns by clicking on column headers
   
   d. Filter results using the filter row at the top of the grid

2. **Creating Visual Explain Plans**:

   a. Write your query in the query editor
   
   b. Click on the "Explain" button in the toolbar
   
   c. View the visual execution plan to understand query performance

3. **Database Diagrams**:

   a. Select "Model" > "Create EER Model From Database" from the menu
   
   b. Follow the wizard to select your database
   
   c. View the generated Entity-Relationship diagram
   
   d. Customize the diagram by dragging tables and adjusting relationships

### Running Advanced Queries

To run advanced queries against the data warehouse:

1. **Open a New Query Tab**:
   
   a. Click on the "SQL Editor" tab
   
   b. Select "New Query Tab" or press Ctrl+T

2. **Write and Execute Complex Queries**:

   ```sql
   -- Example: Cross-library analysis
   SELECT 
     CASE 
       WHEN source_system = 'UWindsor_Library' THEN 'Academic'
       WHEN source_system = 'Windsor_PLibrary' THEN 'Public'
     END as library_type,
     g.genre_name,
     COUNT(*) as loan_count,
     AVG(fl.loan_duration_days) as avg_loan_duration
   FROM BookHIVE_DW.Fact_Transactions fl
   JOIN BookHIVE_DW.Dim_Books b ON fl.book_key = b.book_key
   JOIN BookHIVE_DW.Dim_Genres g ON b.genre_key = g.genre_key
   GROUP BY library_type, g.genre_name
   ORDER BY library_type, loan_count DESC;
   ```

3. **Save Queries for Future Use**:

   a. Click "File" > "Save Script As..."
   
   b. Choose a location and filename
   
   c. Add descriptive comments to document the query purpose

4. **Create Stored Procedures for Complex Analysis**:

   ```sql
   DELIMITER //
   CREATE PROCEDURE BookHIVE_DW.analyze_genre_trends_by_quarter()
   BEGIN
     SELECT 
       d.year,
       d.quarter,
       g.genre_name,
       COUNT(*) as loan_count,
       RANK() OVER (PARTITION BY d.year, d.quarter ORDER BY COUNT(*) DESC) as popularity_rank
     FROM BookHIVE_DW.Fact_Transactions fl
     JOIN BookHIVE_DW.Dim_Books b ON fl.book_key = b.book_key
     JOIN BookHIVE_DW.Dim_Genres g ON b.genre_key = g.genre_key
     JOIN BookHIVE_DW.Dim_Dates d ON fl.date_key = d.date_key
     GROUP BY d.year, d.quarter, g.genre_name
     ORDER BY d.year, d.quarter, popularity_rank;
   END //
   DELIMITER ;
   
   -- Execute the stored procedure
   CALL BookHIVE_DW.analyze_genre_trends_by_quarter();
   ```

### Creating Custom Reports

To create custom reports from your data warehouse:

1. **Design Report Queries**:

   ```sql
   -- Monthly circulation report
   SELECT 
     d.year,
     d.month,
     COUNT(*) as total_loans,
     COUNT(DISTINCT b.book_key) as unique_books,
     COUNT(DISTINCT m.member_key) as unique_members,
     SUM(CASE WHEN fl.is_overdue = 1 THEN 1 ELSE 0 END) as overdue_count,
     SUM(fl.fine_amount) as total_fines
   FROM BookHIVE_DW.Fact_Transactions fl
   JOIN BookHIVE_DW.Dim_Books b ON fl.book_key = b.book_key
   JOIN BookHIVE_DW.Dim_Members m ON fl.member_key = m.member_key
   JOIN BookHIVE_DW.Dim_Dates d ON fl.date_key = d.date_key
   GROUP BY d.year, d.month
   ORDER BY d.year, d.month;
   ```

2. **Export Reports to Various Formats**:

   a. Run your report query
   
   b. Click the "Export" button in the Results Grid
   
   c. Choose format (CSV, HTML, JSON, etc.)
   
   d. Save to your desired location

3. **Schedule Automated Reports**:

   a. Create a stored procedure for your report:
   
   ```sql
   DELIMITER //
   CREATE PROCEDURE BookHIVE_DW.generate_monthly_report()
   BEGIN
     -- Report query here
     
     -- Export results to a table
     CREATE TABLE IF NOT EXISTS BookHIVE_DW.monthly_reports (
       report_id INT PRIMARY KEY AUTO_INCREMENT,
       report_date DATETIME,
       year INT,
       month INT,
       total_loans INT,
       unique_books INT,
       unique_members INT,
       overdue_count INT,
       total_fines DECIMAL(10,2)
     );
     
     INSERT INTO BookHIVE_DW.monthly_reports 
       (report_date, year, month, total_loans, unique_books, unique_members, overdue_count, total_fines)
     SELECT 
       NOW(),
       d.year,
       d.month,
       COUNT(*) as total_loans,
       COUNT(DISTINCT b.book_key) as unique_books,
       COUNT(DISTINCT m.member_key) as unique_members,
       SUM(CASE WHEN fl.is_overdue = 1 THEN 1 ELSE 0 END) as overdue_count,
       SUM(fl.fine_amount) as total_fines
     FROM BookHIVE_DW.Fact_Transactions fl
     JOIN BookHIVE_DW.Dim_Books b ON fl.book_key = b.book_key
     JOIN BookHIVE_DW.Dim_Members m ON fl.member_key = m.member_key
     JOIN BookHIVE_DW.Dim_Dates d ON fl.date_key = d.date_key
     GROUP BY d.year, d.month
     ORDER BY d.year, d.month;
   END //
   DELIMITER ;
   ```
   
   b. Create an event to run the report monthly:
   
   ```sql
   CREATE EVENT monthly_report_generation
   ON SCHEDULE EVERY 1 MONTH
   STARTS CURRENT_TIMESTAMP + INTERVAL 1 DAY
   DO
   BEGIN
     CALL BookHIVE_DW.generate_monthly_report();
   END;
   ```

### Monitoring Database Performance

To monitor and optimize your database performance:

1. **View Table Statistics**:

   ```sql
   SHOW TABLE STATUS FROM BookHIVE_DW;
   ```

2. **Check Query Performance**:

   ```sql
   EXPLAIN ANALYZE
   SELECT b.title, COUNT(*) as loan_count
   FROM BookHIVE_DW.Fact_Transactions fl
   JOIN BookHIVE_DW.Dim_Books b ON fl.book_key = b.book_key
   GROUP BY b.title
   ORDER BY loan_count DESC
   LIMIT 10;
   ```

3. **Monitor Server Status**:

   In MySQL Workbench:
   
   a. Navigate to "Server Status" in the Navigator panel
   
   b. View current connections, memory usage, and other metrics
   
   c. Use the "Client Connections" tab to see active connections
   
   d. Check "InnoDB Status" for storage engine details

## Troubleshooting

### Common Issues

1. **Connection Issues**
   - Ensure MySQL Server is running
   - Verify connection credentials
   - Check firewall settings
   - Confirm the server hostname and port are correct

2. **ETL Process Failures**
   - Check the etl_log table for error details
   - Verify source database connectivity
   - Ensure sufficient permissions for the MySQL user
   - Look for data type mismatches or constraint violations

3. **Query Performance Issues**
   - Verify indexes are properly created
   - Check for missing foreign key relationships
   - Consider optimizing complex queries
   - Use EXPLAIN to analyze query execution plans

4. **Import/Export Issues**
   - Check file permissions
   - Verify CSV format matches expected structure
   - Ensure secure_file_priv setting allows access to your file location
   - For large files, consider increasing max_allowed_packet setting

5. **Data Visualization Problems**
   - Update MySQL Workbench to the latest version
   - Check if your query returns too many rows (limit results)
   - Verify you have sufficient memory for large result sets

## Support

For additional support or questions about the BookHIVE system, please contact the development team.
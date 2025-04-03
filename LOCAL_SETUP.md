# Running BookHIVE Locally

This guide will help you set up and run the BookHIVE Library Management System on your local machine. The setup involves two main components:

1. Setting up the MySQL database and data warehouse
2. Running the Next.js web application

## Prerequisites

- Node.js (version 20.x or higher)
- npm or pnpm (package manager)
- MySQL Server (version 8.0 or higher)
- MySQL Workbench (version 8.0 or higher)

## Part 1: Database Setup

Follow these steps to set up the MySQL database and data warehouse:

1. Install MySQL Server and MySQL Workbench from the [official MySQL website](https://dev.mysql.com/downloads/)
2. Configure MySQL Server with a root password and remember it for later use
3. Follow the detailed database setup instructions in the main [README.md](README.md) file, specifically:
   - Step 2: Set Up Source Databases
   - Step 3: Create the Data Warehouse
   - Step 4: Create ETL Stored Procedures
   - Step 5: Create a Master ETL Procedure
   - Step 6: Schedule Automated ETL
   - Step 7: Run the ETL Process Manually

## Part 2: Running the Next.js Web Application

### Step 1: Clone the Repository

If you haven't already, clone the repository to your local machine:

```bash
git clone <repository-url>
cd bookhive
```

### Step 2: Install Dependencies

Install the required Node.js dependencies:

```bash
# Using npm
npm install

# OR using pnpm
pnpm install
```

### Step 3: Run the Development Server

Start the Next.js development server:

```bash
# Using npm
npm run dev

# OR using pnpm
pnpm dev
```

This will start the development server on [http://localhost:3000](http://localhost:3000).

### Step 4: Access the Application

Open your web browser and navigate to:

```
http://localhost:3000
```

You should now see the BookHIVE application running locally.

## Exploring the Application

Once the application is running, you can explore the following pages:

- **Home Page**: Overview of the BookHIVE system with a dashboard
- **Architecture**: View the system architecture and database schemas
- **ETL Process**: Learn about the ETL process implementation
- **Data Warehouse**: Run predefined queries against the data warehouse
- **Data Entry**: Enter new data into the system

## Troubleshooting

### Common Issues with the Web Application

1. **Port Already in Use**
   
   If port 3000 is already in use, you can specify a different port:
   
   ```bash
   npm run dev -- -p 3001
   ```

2. **Node.js Version Issues**
   
   Ensure you're using Node.js version 20.x as specified in the package.json:
   
   ```bash
   node --version
   ```
   
   If you need to install or switch to a different Node.js version, consider using [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager).

3. **Database Connection Issues**
   
   If the application cannot connect to the database:
   
   - Verify MySQL Server is running
   - Check that you've created all the required databases and tables
   - Ensure your database credentials are correct

### Getting Help

If you encounter any issues not covered in this guide, please refer to:

1. The main [README.md](README.md) file for detailed database setup instructions
2. The Next.js [documentation](https://nextjs.org/docs) for web application issues
3. The MySQL [documentation](https://dev.mysql.com/doc/) for database issues

## Working with Data in MySQL Workbench

Once you have set up the databases and the web application, you'll need to work with data in MySQL Workbench to fully utilize the BookHIVE system.

### Importing Sample Data

To populate your databases with sample data:

1. **Create Sample Data Files**:
   
   Create CSV files for each table you want to populate. For example:
   
   **UWindsor_Library.books.csv**:
   ```
   id,title,author,isbn,publisher,genre,publication_year
   1,"Introduction to Database Systems","C.J. Date","9780321197849","Pearson","Computer Science",2003
   2,"The Art of Computer Programming","Donald Knuth","9780201896831","Addison-Wesley","Computer Science",1997
   ```

2. **Import Using MySQL Workbench**:
   
   a. Open MySQL Workbench and connect to your server
   
   b. Right-click on the table you want to import data into
   
   c. Select "Table Data Import Wizard"
   
   d. Follow the wizard to import your CSV file

3. **Verify the Import**:
   
   Run a SELECT query to verify the data was imported correctly:
   
   ```sql
   SELECT * FROM UWindsor_Library.books;
   ```

### Running Queries Against the Data Warehouse

To analyze data in the BookHIVE data warehouse:

1. **Connect to the Data Warehouse**:
   
   a. In MySQL Workbench, ensure you're connected to your MySQL server
   
   b. Select the BookHIVE_DW database from the schema list

2. **Run Predefined Queries**:
   
   Execute any of the predefined queries from the README.md file. For example:
   
   ```sql
   -- Most Popular Authors
   SELECT a.author_name, COUNT(*) as loan_count
   FROM BookHIVE_DW.Fact_Transactions fl
   JOIN BookHIVE_DW.Dim_Books b ON fl.book_key = b.book_key
   JOIN BookHIVE_DW.Dim_Authors a ON b.author_key = a.author_key
   GROUP BY a.author_name
   ORDER BY loan_count DESC
   LIMIT 10;
   ```

3. **Create Custom Reports**:
   
   Design your own queries to analyze specific aspects of the library data:
   
   ```sql
   -- Example: Books borrowed by member type
   SELECT 
     m.member_type,
     COUNT(*) as loan_count,
     COUNT(DISTINCT b.book_key) as unique_books
   FROM BookHIVE_DW.Fact_Transactions fl
   JOIN BookHIVE_DW.Dim_Books b ON fl.book_key = b.book_key
   JOIN BookHIVE_DW.Dim_Members m ON fl.member_key = m.member_key
   GROUP BY m.member_type
   ORDER BY loan_count DESC;
   ```

### Exporting Data for Analysis

To export data for external analysis:

1. **Export Query Results**:
   
   a. Run your query in MySQL Workbench
   
   b. In the Results Grid, click the "Export" button
   
   c. Choose your preferred format (CSV, JSON, HTML, etc.)
   
   d. Save the file to your desired location

2. **Export Entire Tables**:
   
   a. Right-click on the table in the Navigator panel
   
   b. Select "Table Data Export Wizard"
   
   c. Follow the wizard to export the table data

### Visualizing Data in MySQL Workbench

MySQL Workbench provides basic visualization capabilities:

1. **Create EER Diagrams**:
   
   a. Select "Model" > "Create EER Model From Database"
   
   b. Follow the wizard to select your database
   
   c. View and customize the Entity-Relationship diagram

2. **Use the Results Grid**:
   
   a. Run queries and view results in the grid
   
   b. Sort columns by clicking on headers
   
   c. Filter results using the filter row

For more advanced visualizations, consider exporting the data to tools like Excel, Tableau, or Power BI.

## Next Steps

After successfully running the application locally, you might want to:

1. Load sample data into your databases using the import methods described above
2. Explore the predefined queries in the Data Warehouse section
3. Customize the ETL process for your specific needs
4. Create custom reports and visualizations
5. Extend the application with additional features
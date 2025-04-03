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

## Next Steps

After successfully running the application locally, you might want to:

1. Load sample data into your databases
2. Explore the predefined queries in the Data Warehouse section
3. Customize the ETL process for your specific needs
4. Extend the application with additional features
# Food Safety Data Dashboard - Frontend

This is the frontend application for the Food Safety Data Dashboard project. It provides visualizations and analysis of food safety data from various sources.

## Prerequisites

- Node.js (v18 or higher)
- npm (included with Node.js)

## Getting Started

There are several ways to start the application:

### Using the Start Scripts

#### On Linux/macOS:

```bash
# Make the script executable (first time only)
chmod +x start.sh

# Run the script
./start.sh
```

#### On Windows:

```bash
# Run the batch file
start.bat
```

### Using npm

```bash
# Install dependencies (first time only)
npm install

# Start the development server
npm start
```

### Manual Start

```bash
# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

## Available Scripts

- `npm start` or `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run ESLint to check for code issues

## Accessing the Application

Once started, the application will be available at:

- Development: http://localhost:5173
- Production Preview: http://localhost:4173 (after running `npm run build` and `npm run preview`)

## Environment Variables

The application uses the following environment variables:

- `VITE_API_URL`: The URL of the backend API (default: http://localhost:3000)

These can be set in a `.env` file in the root of the frontend directory.

## Data Sources

The application uses data from the following sources:

- FDA Substances
- FSIS Recalls
- GRAS Notices
- WHO Obesity Data
- CDC Obesity Data

The data is stored in a SQLite database and accessed through the backend API.

## Technologies Used

- React
- Vite
- D3.js
- Bootstrap
- React Router 
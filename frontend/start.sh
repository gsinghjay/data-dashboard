#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Food Safety Data Dashboard - Frontend Starter ===${NC}"
echo -e "${YELLOW}Checking environment...${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed.${NC}"
    echo -e "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2)
echo -e "${GREEN}Node.js version: ${NODE_VERSION}${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed.${NC}"
    echo -e "npm should be included with Node.js installation."
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Dependencies not found. Installing...${NC}"
    npm install
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}Error: Failed to install dependencies.${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}Dependencies installed successfully.${NC}"
else
    echo -e "${GREEN}Dependencies already installed.${NC}"
fi

# Check if .env file exists and create if it doesn't
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}Creating .env file with default settings...${NC}"
    echo "VITE_API_URL=http://localhost:3000" > .env
    echo -e "${GREEN}.env file created.${NC}"
else
    echo -e "${GREEN}.env file exists.${NC}"
fi

echo -e "${YELLOW}Starting development server...${NC}"
echo -e "${BLUE}The application will be available at http://localhost:5173${NC}"
echo -e "${BLUE}Press Ctrl+C to stop the server${NC}"

# Start the development server
npm run dev

# This will only execute if npm run dev exits
echo -e "\n${YELLOW}Development server stopped.${NC}" 
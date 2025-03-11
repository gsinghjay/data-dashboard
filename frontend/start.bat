@echo off
echo === Food Safety Data Dashboard - Frontend Starter ===
echo Checking environment...

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: Node.js is not installed.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

:: Display Node.js version
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo Node.js version: %NODE_VERSION%

:: Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: npm is not installed.
    echo npm should be included with Node.js installation.
    pause
    exit /b 1
)

:: Check if dependencies are installed
if not exist "node_modules\" (
    echo Dependencies not found. Installing...
    call npm install
    
    if %ERRORLEVEL% neq 0 (
        echo Error: Failed to install dependencies.
        pause
        exit /b 1
    )
    
    echo Dependencies installed successfully.
) else (
    echo Dependencies already installed.
)

:: Check if .env file exists and create if it doesn't
if not exist ".env" (
    echo Creating .env file with default settings...
    echo VITE_API_URL=http://localhost:3000 > .env
    echo .env file created.
) else (
    echo .env file exists.
)

echo Starting development server...
echo The application will be available at http://localhost:5173
echo Press Ctrl+C to stop the server

:: Start the development server
call npm run dev

:: This will only execute if npm run dev exits
echo Development server stopped.
pause 
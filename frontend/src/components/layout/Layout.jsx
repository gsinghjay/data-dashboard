import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      <main className="container-fluid py-4">
        {children}
      </main>
      <footer className="bg-dark text-light py-3 text-center">
        <p className="mb-0">Data Dashboard &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Layout; 
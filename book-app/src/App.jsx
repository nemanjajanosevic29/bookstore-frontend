import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './core/layout/Header.jsx';
import Footer from './core/layout/Footer.jsx';
import { Publishers } from './features/publishers/index.js';
import { Books, BookForm } from './features/books/index.js';
import './styles.scss';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">        
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Outlet />}>
            <Route index element={
                <div className="welcome-page">
                  <h1>Welcome to our bookstore!</h1>
                  <p>Discover your next favorite book</p>   
                </div>} />
                <Route path="publishers" element={<Publishers />} />
                <Route path="books" element={<Books />} />
                <Route path="books/new" element={<BookForm />} />
                <Route path="books/edit/:id" element={<BookForm />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
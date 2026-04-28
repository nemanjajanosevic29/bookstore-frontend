import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './core/layout/Header.jsx';
import Footer from './core/layout/Footer.jsx';
import { Publishers } from './features/publishers/index.js';
import './styles.scss';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">        
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Outlet />}>   
              <Route path="publishers" element={<Publishers />} />
              <Route path="books" element={<h1 style={{ padding: '48px 40px' }}>Books</h1>} />
              <Route path="books/new" element={<h1 style={{ padding: '48px 40px' }}>Create book</h1>} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
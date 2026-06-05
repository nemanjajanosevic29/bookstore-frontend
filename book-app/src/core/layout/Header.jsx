import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './header.scss';

export default function Header() {
    const location = useLocation();

    const navLinks = [
        { to: '/publishers', label: 'Publishers' },
        { to: '/publishers/sort', label: 'Publishers Sort' },
        { to: '/books', label: 'Books' },
        { to: '/books/new', label: 'Create book' },
        { to: '/authors/pagination', label: 'Authors' },
    ];

    return (
        <>
            <header className="header">
                <div className="header-inner">
                    <div className="logo">
                        <span className="logo-icon">📚</span>
                        <span className="logo-name">Bookstore</span>
                    </div>
                    <nav className="nav">
                        {navLinks.map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`nav-link ${location.pathname === to ? 'active' : ''}`}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}
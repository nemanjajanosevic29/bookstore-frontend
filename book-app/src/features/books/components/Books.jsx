import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBooks, deleteBook } from '../services/bookService.js';
import './books.scss';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setBooks(await getAllBooks());
    } catch (error) {
      setErrorMsg('Došlo je do greške pri učitavanju knjiga.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      setBooks(prev => prev.filter(b => b.id !== id));
    } catch (error) {
      setErrorMsg('Greška pri brisanju knjige.');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="books-header">
        <div>
          <h1 className="page-title">Books</h1>
          <p className="page-subtitle">Sve knjige u katalogu</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/books/new')}>
          + Add book
        </button>
      </div>

      {errorMsg && <div className="error-msg">{errorMsg}</div>}

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <span>Učitavanje...</span>
        </div>
      ) : books.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📚</div>
          <p>Nema knjiga u katalogu.</p>
        </div>
      ) : (
        <div className="animate-in">
          <div className="table-meta">
            <span className="badge">{books.length} knjiga</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>ISBN</th>
                <th>Pages</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id}>
                  <td className="book-title-cell">{book.title}</td>
                  <td className="book-author-cell">
                    {book.author?.fullName || <span className="no-data">—</span>}
                  </td>
                  <td>{book.publisher?.name || <span className="no-data">—</span>}</td>
                  <td>{book.isbn}</td>
                  <td>{book.pageCount}</td>
                  <td>{new Date(book.publishedDate).toLocaleDateString('sr-RS')}</td>
                  <td className="actions-cell">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => navigate(`/books/edit/${book.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
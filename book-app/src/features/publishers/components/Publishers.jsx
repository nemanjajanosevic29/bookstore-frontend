import { useState, useEffect } from 'react';
import { getAllPublishers } from '../../services/publisherService.js';
import './publishers.scss';
import React from 'react';

export default function Publishers() {
  const [publishers, setPublishers] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setPublishers(await getAllPublishers());
    } catch (error) {
      setErrorMsg('Došlo je do greške pri učitavanju izdavača.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Publishers</h1>
      <p className="page-subtitle">Svi registrovani izdavači</p>

      {errorMsg && <div className="error-msg">{errorMsg}</div>}

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <span>Učitavanje...</span>
        </div>
      ) : publishers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏛️</div>
          <p>Nema registrovanih izdavača.</p>
        </div>
      ) : (
        <div className="animate-in">
          <div className="table-meta">
            <span className="badge">{publishers.length} izdavača</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Website</th>
              </tr>
            </thead>
            <tbody>
              {publishers.map(pub => (
                <tr key={pub.id}>
                  <td className="publisher-name">{pub.name}</td>
                  <td>{pub.address}</td>
                  <td>
                    {pub.website
                      ? <a href={pub.website} target="_blank" rel="noreferrer">{pub.website}</a>
                      : <span className="no-data">—</span>
                    }
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
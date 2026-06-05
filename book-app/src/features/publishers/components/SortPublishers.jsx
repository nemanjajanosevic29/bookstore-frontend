import React, { useEffect, useState } from 'react';
import { fetchSortTypes, fetchSortedPublishers } from '../../services/publisherService.js';
import SortTypeDropdown from './SortTypeDropdown.jsx';
import './sort-publishers.scss';

export default function SortPublishers() {
    const [publishers, setPublishers] = useState([]);
    const [sortTypes, setSortTypes] = useState([]);
    const [selectedSort, setSelectedSort] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSortTypes = async () => {
            try {
                const types = await fetchSortTypes();
                setSortTypes(types);
            } catch (error) {
                setErrorMsg('Greška pri učitavanju tipova sortiranja.');
            }
        };
        loadSortTypes();
    }, []);

    useEffect(() => {
        const loadPublishers = async () => {
            try {
                setLoading(true);
                const data = await fetchSortedPublishers(selectedSort);
                setPublishers(data);
            } catch (error) {
                setErrorMsg('Greška pri učitavanju izdavača.');
            } finally {
                setLoading(false);
            }
        };
        loadPublishers();
    }, [selectedSort]);

    return (
        <div className="page-wrapper">
            <h1 className="page-title">Publishers</h1>
            <p className="page-subtitle">Svi registrovani izdavači</p>

            {errorMsg && <div className="error-msg">{errorMsg}</div>}

            <SortTypeDropdown
                sortTypes={sortTypes}
                selectedSort={selectedSort}
                onSortChange={(val) => setSelectedSort(val)}
            />

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
                            {publishers.map((pub) => (
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
import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableFooter, TablePagination, TableRow, TableHead, Paper
} from '@mui/material';
import TablePaginationActions from './TablePaginationActions.jsx';
import { fetchAuthorsPage } from '../AuthorsServices.js';
import './authors-pagination.scss';

export default function AuthorsPagination() {
    const [authors, setAuthors] = useState([]);
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(true);
    const rowsPerPage = 4;

    const loadPage = async (pageNumber) => {
        try {
            setLoading(true);
            const data = await fetchAuthorsPage(pageNumber + 1);
            setAuthors(data.items);
            setTotalCount(data.count);
            setTotalPages(data.totalPages);
        } catch (error) {
            setErrorMsg('Došlo je do greške pri učitavanju autora.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPage(page);
    }, [page]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <div className="page-wrapper">
            <h1 className="page-title">Authors</h1>
            <p className="page-subtitle">
                Svi autori — stranica {page + 1} od {totalPages}
            </p>

            {errorMsg && <div className="error-msg">{errorMsg}</div>}

            {loading ? (
                <div className="loading-state">
                    <div className="spinner" />
                    <span>Učitavanje...</span>
                </div>
            ) : (
                <div className="animate-in">
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Full Name</TableCell>
                                    <TableCell>Biography</TableCell>
                                    <TableCell>Date of Birth</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {authors.map((author) => (
                                    <TableRow key={author.id}>
                                        <TableCell>{author.fullName}</TableCell>
                                        <TableCell>{author.biography}</TableCell>
                                        <TableCell>
                                            {new Date(author.dateOfBirth).toLocaleDateString('sr-RS')}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[rowsPerPage]}
                                        colSpan={3}
                                        count={totalCount}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </div>
    );
}
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getBookById, createBook, updateBook } from '../services/bookService.js';
import { getAllPublishers } from '../../services/publisherService.js';
import AxiosConfig from '../../../core/services/axiosConfig.js';
import './book-form.scss';

export default function BookForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [publishers, setPublishers] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const loadData = async () => {
      try {
        const pubs = await getAllPublishers();
        setPublishers(pubs);

        const authorsRes = await AxiosConfig.get('/Authors');
        setAuthors(authorsRes.data);

        if (isEditMode) {
          const book = await getBookById(id);
          reset({
            title: book.title,
            isbn: book.isbn,
            pageCount: book.pageCount,
            publishedDate: book.publishedDate?.substring(0, 10),
            authorId: book.authorId,
            publisherId: book.publisherId,
          });
        }
      } catch (error) {
        setErrorMsg('Greška pri učitavanju podataka.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    setErrorMsg('');
    try {
      const payload = {
        ...data,
        id: isEditMode ? parseInt(id) : 0,
        pageCount: parseInt(data.pageCount),
        authorId: parseInt(data.authorId),
        publisherId: parseInt(data.publisherId),
      };

      if (isEditMode) {
        await updateBook(id, payload);
      } else {
        await createBook(payload);
      }

      navigate('/books');
    } catch (error) {
      setErrorMsg('Greška pri čuvanju knjige. Proverite unesene podatke.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="loading-state">
          <div className="spinner" />
          <span>Učitavanje...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="form-breadcrumb">
        <button className="breadcrumb-back" onClick={() => navigate('/books')}>
          ← Books
        </button>
        <span className="breadcrumb-sep">/</span>
        <span>{isEditMode ? 'Edit book' : 'New book'}</span>
      </div>

      <h1 className="page-title">
        {isEditMode ? 'Edit book' : 'Create book'}
      </h1>
      <p className="page-subtitle">
        {isEditMode ? 'Izmeni podatke o knjizi.' : 'Popuni podatke za novu knjigu.'}
      </p>

      {errorMsg && <div className="error-msg">{errorMsg}</div>}

      <div className="form-card animate-in">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          <div className="form-group">
            <label>Title *</label>
            <input
              placeholder="npr. Zločin i kazna"
              {...register('title', { required: 'Naslov je obavezan' })}
            />
            {errors.title && <p className="field-error">{errors.title.message}</p>}
          </div>

          <div className="form-group">
            <label>ISBN *</label>
            <input
              placeholder="npr. 978-3-16-148410-0"
              {...register('isbn', { required: 'ISBN je obavezan' })}
            />
            {errors.isbn && <p className="field-error">{errors.isbn.message}</p>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Page Count *</label>
              <input
                type="number"
                placeholder="npr. 320"
                {...register('pageCount', {
                  required: 'Broj strana je obavezan',
                  min: { value: 1, message: 'Min 1 strana' }
                })}
              />
              {errors.pageCount && <p className="field-error">{errors.pageCount.message}</p>}
            </div>

            <div className="form-group">
              <label>Published Date *</label>
              <input
                type="date"
                {...register('publishedDate', { required: 'Datum je obavezan' })}
              />
              {errors.publishedDate && <p className="field-error">{errors.publishedDate.message}</p>}
            </div>
          </div>

          <div className="form-group">
            <label>Author *</label>
            <select {...register('authorId', { required: 'Autor je obavezan' })}>
              <option value="">— Izaberi autora —</option>
              {authors.map(a => (
                <option key={a.id} value={a.id}>{a.fullName}</option>
              ))}
            </select>
            {errors.authorId && <p className="field-error">{errors.authorId.message}</p>}
          </div>

          <div className="form-group">
            <label>Publisher *</label>
            <select {...register('publisherId', { required: 'Izdavač je obavezan' })}>
              <option value="">— Izaberi izdavača —</option>
              {publishers.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            {errors.publisherId && <p className="field-error">{errors.publisherId.message}</p>}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Čuvanje...' : isEditMode ? 'Save changes' : 'Create book'}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => navigate('/books')}>
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
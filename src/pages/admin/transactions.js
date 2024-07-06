import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Transaction() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found');
        return;
      }

      const response = await fetch('/api/admin/books', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        const error = await response.json();
        alert(error.message);
      }
    }
    fetchBooks();
  }, []);

  return (
    <Layout>
      <div className="container mt-5">
      <h1>Manage Transaction</h1>
      <Link to="/admin/books/new">
        <div className="btn btn-primary mb-3">Add New Book</div>
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.price}</td>
              <td>{book.stock}</td>
              <td>
                <Link to={`/admin/books/edit/${book.id}`}>
                  <div className="btn btn-secondary btn-sm">Edit</div>
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={async () => {
                    const token = localStorage.getItem('token');
                    if (!token) {
                      alert('No token found');
                      return;
                    }

                    const response = await fetch(`/api/admin/books/${book.id}`, {
                      method: 'DELETE',
                      headers: {
                        'Authorization': `Bearer ${token}`
                      }
                    });

                    if (response.ok) {
                      setBooks(books.filter(b => b.id !== book.id));
                    } else {
                      const error = await response.json();
                      alert(error.message);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Layout>
  );
}

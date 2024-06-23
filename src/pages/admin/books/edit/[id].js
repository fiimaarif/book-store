import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchBook() {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found');
        return;
      }

      const response = await fetch(`/api/admin/books/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTitle(data.title);
        setAuthor(data.author);
        setPrice(data.price.toString());
        setStock(data.stock.toString());
      } else {
        const error = await response.json();
        alert(error.message);
      }
    }

    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found');
      return;
    }

    const response = await fetch(`/api/admin/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, author, price: parseFloat(price), stock: parseInt(stock) })
    });

    if (response.ok) {
      router.push('/admin/books');
    } else {
      const error = await response.json();
      alert(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Edit Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Book</button>
      </form>
    </div>
  );
}
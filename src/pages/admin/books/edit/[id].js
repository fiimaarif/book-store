import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null); // State untuk menyimpan gambar yang baru diunggah
  const [existingImage, setExistingImage] = useState(''); // State untuk menyimpan URL gambar yang sudah ada
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
        setExistingImage(data.image); // Simpan URL gambar yang sudah ada
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

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('price', price);
    formData.append('stock', stock);
    
    // Jika image tidak berubah, tidak perlu mengirimkannya kembali
    if (image) {
      formData.append('image', image);
    } else {
      formData.append('image', existingImage);
    }

    const response = await fetch(`/api/admin/books/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    });

    if (response.ok) {
      router.push('/admin/books');
    } else {
      const error = await response.json();
      alert(error.message);
    }
  };

  // Handle change event when selecting a new image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
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
        <div className="mb-3">
          <label className="form-label">Image</label>
          {existingImage && ( // Tampilkan gambar pratinjau jika ada URL gambar yang sudah ada
            <div className="mb-3">
              <img src={existingImage} alt="Existing Image" style={{ maxWidth: '200px', marginBottom: '10px' }} />
            </div>
          )}
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange} // Gunakan handleImageChange untuk mengupdate state image
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Book</button>
      </form>
    </div>
  );
}

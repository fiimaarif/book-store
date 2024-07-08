// import withAuth from '@/components/Auth/withAuth';
import Layout from '@/components/Layout';
import Sidebar from '@/components/Sidebar';
import { logout } from '@/utils/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function Admin() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/admin/transactions', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, []);

  return (
      <Layout>
          <div className="container-fluid">
              <div className="row">
                  <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                      <Sidebar />
                  </nav>
                  <main className="col-md-10 ms-sm-auto col-lg-10 px-md-4">
                      {/* Konten utama halaman admin */}
                      <h1>Admin Dashboard</h1>
                      {/* Isi konten lainnya */}
                  </main>
              </div>
          </div>
      </Layout>
  );
}

export default Admin

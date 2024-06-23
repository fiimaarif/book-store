import { logout } from '@/utils/auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
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
    <div>
      <h1>Dashboard Admin</h1>
      <button onClick={logout} className="btn btn-danger">Logout</button>
      <nav className="nav flex-column">
        <Link href="/admin/users" className="nav-link">Manage Users</Link>
        {/* Tambahkan link lain untuk menu admin lainnya */}
      </nav>
    </div>
  );
}

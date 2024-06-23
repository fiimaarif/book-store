import { logout } from '@/utils/auth';
import { useEffect, useState } from 'react';

export default function UserDashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/user/transactions', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, []);

  return (
    <div>
      <h1>Dashboard User</h1>
      <button onClick={logout} className="btn btn-danger">Logout</button>
      <ul>
        {transactions && transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.book.title} - {transaction.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

import { logout } from '@/utils/auth';
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link href="/admin">
                  <div className="nav-link">
                    Admin Dashboard
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/admin/books">
                  <div className="nav-link">Manage Books</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/admin/users">
                  <div className="nav-link">Manage Users</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/admin/transactions">
                  <div className="nav-link">Manage Transactions</div>
                </Link>
              </li>
              <li className="nav-item">
                  <div onClick={logout} className="nav-link">Logout</div>
              </li>
            </ul>
          </div>
        </nav>
      );
}

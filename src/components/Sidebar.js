import { logout } from '@/utils/auth';
import Link from 'next/link';

export default function Sidebar() {
    return (
        <nav className="sidebar bg-dark">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/admin/dashboard" className="text-decoration-none text-light">
                  <div className="nav-link text-light">
                    Dashboard
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/books" className="text-decoration-none text-light">
                  <div className="nav-link text-light">Books</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/users" className="text-decoration-none text-light">
                  <div className="nav-link text-light">Users</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/transactions" className="text-decoration-none text-light">
                  <div className="nav-link text-light">Transactions</div>
                </Link>
              </li>
              <li className="nav-item">
                  <div onClick={logout} className="nav-link text-light">Logout</div>
              </li>
            </ul>
          </div>
        </nav>
      );
}

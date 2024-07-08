import { logout } from '@/utils/auth';
import Link from 'next/link';
import { Home, Book, User, FileText, Power } from 'react-feather';

export default function Sidebar() {
    return (
        <nav className="sidebar bg-dark">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link href="/admin" className="text-decoration-none text-light d-flex align-items-center">
                <Home className='ms-1'/>
                  <div className="nav-link text-light">
                    Dashboard
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/admin/books" className="text-decoration-none text-light d-flex align-items-center">
                <Book className='ms-1'/>
                  <div className="nav-link text-light">Books</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/admin/users" className="text-decoration-none text-light d-flex align-items-center">
                <User className='ms-1'/>
                  <div className="nav-link text-light">Users</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/admin/transactions" className="text-decoration-none text-light d-flex align-items-center">
                <FileText className='ms-1'/>
                  <div className="nav-link text-light">Transactions</div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href={"#"} onClick={logout} className="text-decoration-none text-light d-flex align-items-center">
                  <Power className='ms-1'/>
                  <div className="nav-link text-light" style={{cursor: "pointer"}}>Logout</div>
                </Link> 
              </li>
            </ul>
          </div>
        </nav>
      );
}

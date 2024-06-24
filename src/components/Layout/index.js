import Sidebar from "../Sidebar";

export default function Layout({ children }) {
    return (
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <Sidebar />
          </nav>
          <main className="col-md-10 ms-sm-auto col-lg-10 px-md-4">
            {children}
          </main>
        </div>
      </div>
    );
  }
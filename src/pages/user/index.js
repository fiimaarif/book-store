import Footer from "@/components/Footer";
import NavbarComponent from "@/components/Navbar";
import { useEffect, useState } from "react";
import CardOrder from "@/components/CardOrder";
import CardMenuProfile from "@/components/CardMenuProfile";
import { Spinner } from "react-bootstrap";

export default function UserDashboard() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchTransactions = async () => {
        try {
          const token = localStorage.getItem('token');
          
          const response = await fetch('/api/user/orderStatus', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          console.log('=>', data);
          setTransactions(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching transactions:', error);
          setLoading(false);
        }
      };
  
      fetchTransactions();
    }, []);
  
    if (loading) {
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <div>
            <NavbarComponent />
            <div className="d-flex my-5 container gap-5">
                <CardMenuProfile />
                <div className="col-12 col-md-8 col-lg-9">
                    <h5>Daftar Transaksi</h5>
                    {transactions.length > 0 ? (
                        transactions.map((transaction) => (
                            <CardOrder
                                key={transaction.id}
                                transaction={transaction}
                            />
                        ))
                    ) : (
                        <p>No orders found.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Transaction() {
  const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch("/api/orders");
            const data = await response.json();
            setOrders(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                fetchOrders();
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }


  return (
      <Layout>
          <div className="container mt-5">
              <h1>Manage Transaction</h1>
              <table className="table">
                  <thead>
                      <tr>
                          <th>Order ID</th>
                          <th>Customer Name</th>
                          <th>Items</th>
                          <th>Total Amount</th>
                          <th>Status</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {orders.map((order) => (
                          <tr key={order.id}>
                              <td>{order.id}</td>
                              <td>{order.customerName}</td>
                              <td>
                                  {order.items.map((item) => (
                                      <div key={item.id}>
                                          {item.quantity}x {item.bookId} -{" "}
                                          {item.totalPrice}
                                      </div>
                                  ))}
                              </td>
                              <td>{order.totalAmount}</td>
                              <td>{order.status}</td>
                              <td>
                                  <select
                                      value={order.status}
                                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                      className='form-select'
                                  >
                                      <option value="PENDING">Pending</option>
                                      <option value="PROCESSING">
                                          Processing
                                      </option>
                                      <option value="COMPLETED">
                                          Completed
                                      </option>
                                      <option value="CANCELLED">
                                          Cancelled
                                      </option>
                                  </select>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </Layout>
  );
}

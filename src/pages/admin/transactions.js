import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
const { SearchBar } = Search;

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

    const columns = [
        {
            dataField: 'id',
            text: 'Order ID',
            sort: true
        },
        {
            dataField: 'customerName',
            text: 'Customer Name',
            sort: true
        },
        {
            dataField: 'items',
            text: 'Items',
            formatter: (cell, row) => (
                <div>
                    {cell.map((item) => (
                        <div key={item.id}>
                            {item.quantity}x {item.bookId} - {item.totalPrice}
                        </div>
                    ))}
                </div>
            )
        },
        {
            dataField: 'totalAmount',
            text: 'Total Amount',
            sort: true
        },
        {
            dataField: 'status',
            text: 'Status',
            editor: {
                type: 'select',
                options: [
                    { value: 'PENDING', label: 'Pending' },
                    { value: 'PROCESSING', label: 'Processing' },
                    { value: 'COMPLETED', label: 'Completed' },
                    { value: 'CANCELLED', label: 'Cancelled' }
                ]
            },
            formatter: (cell, row) => (
                <select
                    value={cell}
                    onChange={(e) => updateOrderStatus(row.id, e.target.value)}
                    className='form-select'
                >
                    <option value="PENDING">Pending</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>
            )
        }
    ];

    const paginationOptions = {
        sizePerPage: 5,
        totalSize: orders.length,
        showTotal: true,
        hideSizePerPage: false,
        sizePerPageList: [5, 10, 20]
    };

  return (
      <Layout>
          <div className="container mt-5">
              <h1>Manage Transaction</h1>
              <ToolkitProvider
                  keyField="id"
                  data={orders}
                  columns={columns}
                  search
              >
                  {(props) => (
                      <div>
                          <div className="d-flex justify-content-end mb-2">
                              <SearchBar {...props.searchProps} />
                          </div>
                          <BootstrapTable
                              {...props.baseProps}
                              bootstrap4
                              hover
                              striped
                              pagination={paginationFactory(paginationOptions)}
                          />
                      </div>
                  )}
              </ToolkitProvider>
          </div>
      </Layout>
  );
}

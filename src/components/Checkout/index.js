import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const router = useRouter();
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  const handlePayment = async () => {
    // Kirim pesanan ke server untuk diproses
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerName,
        customerEmail,
        customerAddress,
        items: cartItems,
        totalAmount,
      }),
    });

    if (response.ok) {
      router.push('/confirmation');
    } else {
      const error = await response.json();
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <div>
        <label>Nama:</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Alamat:</label>
        <textarea
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
        />
      </div>
      <h3>Total Amount: Rp{totalAmount}</h3>
      <button onClick={handlePayment}>Proceed to Payment</button>
    </div>
  );
}

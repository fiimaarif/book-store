import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Confirmation() {
  const router = useRouter();
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    // Ambil informasi pesanan dari URL atau state
    const { query } = router;
    setOrderInfo(query);
  }, [router]);

  if (!orderInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>Order ID: {orderInfo.orderId}</p>
      <p>Total Amount: Rp{orderInfo.totalAmount}</p>
      <p>Please transfer to the following bank account:</p>
      <p>Bank Name: {orderInfo.bankName}</p>
      <p>Account Number: {orderInfo.bankAccount}</p>
      <p>Thank you for your order!</p>
    </div>
  );
}

import Link from 'next/link';
import React from 'react';
import { Badge, Card } from 'react-bootstrap';

function CardOrder({ transaction }) {
  return (
    <Card className="mb-3">
      <Card.Header className="d-flex justify-content-between">
        <small>{new Date(transaction.createdAt).toLocaleString()}</small>
        <small>No.Pemesanan : {transaction.id}</small>
        <Badge bg={
          transaction.status === 'PENDING' ? 'warning' :
          transaction.status === 'PROCESSING' ? 'info' :
          transaction.status === 'COMPLETED' ? 'success' : 'danger'
        }>
          {transaction.status}
        </Badge>
      </Card.Header>
      <Card.Body className="d-flex align-items-center">
        {transaction.items.map((detail) => (
          <div key={detail.id} className="d-flex align-items-center mb-3">
            <img src={detail.book.image} width={100} className="me-3" />
            <div>
              <small className="text-muted">{detail.book.author}</small>
              <div>{detail.book.title}</div>
              <div>Quantity: {detail.quantity}</div>
            </div>
          </div>
        ))}
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <Link href="#" className="text-decoration-none">
          Lihat Detail Pesanan
        </Link>
        <div>
          Total Pesanan <span className="fw-bold">{`Rp ${transaction.totalAmount.toLocaleString('id-ID')}`}</span>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default CardOrder;

import Link from "next/link";
import React from "react";
import { Badge, Card } from "react-bootstrap";

function CardOrder() {
    return (
        <Card>
            <Card.Header className="d-flex justify-content-between">
                <small>05 Juli 2024, 22:41:09</small>
                <small>No.Pemesanan : HG0922KK93</small>
                <Badge bg="danger">Pesanan Dibatalkan</Badge>
            </Card.Header>
            <Card.Body className="d-flex align-items-center">
                <img src="/uploads/1719757347989-book-3.png" width={100} />
                <div>
                    <small className="text-muted">author</small>
                    <div>Title</div>
                    <div>Quantity</div>
                </div>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between">
                <Link href="#" className="text-decoration-none">
                    Lihat Detail Pesanan
                </Link>
                <div>
                    Total Pesanan <span className="fw-bold">Rp 217.000,00</span>
                </div>
            </Card.Footer>
        </Card>
    );
}

export default CardOrder;

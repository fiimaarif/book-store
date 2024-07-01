import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { customerName, customerEmail, customerAddress, items, totalAmount } = req.body;

    // Simpan pesanan ke database
    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        customerAddress,
        totalAmount,
        items: {
          create: items.map((item) => ({
            bookId: item.id,
            quantity: item.quantity,
            totalPrice: item.totalPrice,
          })),
        },
      },
    });

    // Balas dengan informasi pembayaran
    res.status(201).json({
      message: 'Order created successfully',
      bankAccount: '1234567890',
      bankName: 'Bank ABC',
      orderId: order.id,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

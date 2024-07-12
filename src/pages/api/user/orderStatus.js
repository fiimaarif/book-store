import { authenticate } from '@/middleware/auth';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
    const userId = req.user.id

    const transactions = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            book: true,
          },
        },
      },
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default authenticate(handler);

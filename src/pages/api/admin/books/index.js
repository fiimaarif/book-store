import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../../middleware/auth';

const prisma = new PrismaClient();

export default async (req, res) => {
  const { method } = req;

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const payload = verifyToken(token);
    if (payload.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }

    switch (method) {
      case 'GET':
        const books = await prisma.book.findMany();
        res.status(200).json(books);
        break;
      case 'POST':
        const { title, author, price, stock } = req.body;
        const newBook = await prisma.book.create({
          data: { title, author, price, stock },
        });
        res.status(201).json(newBook);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error handling books:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

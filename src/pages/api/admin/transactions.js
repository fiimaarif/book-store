import { PrismaClient } from '@prisma/client';
import { authenticate } from '../../../middleware/auth';

const prisma = new PrismaClient();

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const transactions = await prisma.transaction.findMany({
      include: { user: true, book: true },
    });
    res.status(200).json(transactions);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default authenticate(handler);

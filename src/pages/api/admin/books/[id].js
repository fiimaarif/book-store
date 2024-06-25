import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import { verifyToken } from '../../../../middleware/auth';

const prisma = new PrismaClient();

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const { method } = req;
  const { id } = req.query;

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
        const book = await prisma.book.findUnique({ where: { id: Number(id) } });
        if (!book) {
          return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
        break;
      case 'PUT':
        upload.single('image')(req, res, async (err) => {
          if (err) {
            console.error('Multer error:', err);
            return res.status(500).json({ message: 'Error uploading image' });
          }
          const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;
          const { title, author, price, stock } = req.body;
          let updatedBookData = { title,
            author,
            price: parseFloat(price),
            stock: parseInt(stock, 10),
            image };

          if (req.file) {
            updatedBookData.image = `/uploads/${req.file.filename}`;
          }

          const updatedBook = await prisma.book.update({
            where: { id: Number(id) },
            data: updatedBookData,
          });

          res.status(200).json(updatedBook);
        });
        break;
      case 'DELETE':
        await prisma.book.delete({ where: { id: Number(id) } });
        res.status(204).end();
        break;
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error handling book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

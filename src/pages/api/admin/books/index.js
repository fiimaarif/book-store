import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import nextConnect from 'next-connect';
import { verifyToken } from '../../../../middleware/auth';

const prisma = new PrismaClient();

// Setup multer for file upload
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  }),
});

// Create the API route using next-connect
const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error('API Error:', error);
    res.status(501).json({ error: `Sorry something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Middleware to handle file upload
apiRoute.use(upload.single('image'));

// Middleware to verify token and check admin role
apiRoute.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const payload = verifyToken(token);
    if (payload.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    req.user = payload; // Add payload to request object
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
});

// GET handler to fetch all books
apiRoute.get(async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST handler to create a new book
apiRoute.post(async (req, res) => {
  try {
    const { title, author, price, stock } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        image,
      },
    });
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default apiRoute;

// Disable the default body parser to handle multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

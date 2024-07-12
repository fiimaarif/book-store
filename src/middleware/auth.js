import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const authenticate = (handler) => {
  return async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token missing' });
    }

    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      console.log(error, "sadsd");
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};

export function verifyToken(token) {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

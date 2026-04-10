import jwt from 'jsonwebtoken';
const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader)
    return res.status(401).json({ success: false, message: 'token not found' });
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'no token provided' });
  }
};

export default authMiddleware;

import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();


export const isGithubAdmin = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const githubId = decoded.githubId?.toString();
    const allowedIds = process.env.ADMIN_GITHUB_IDS.split(',').map(id => id.trim());

    if (!allowedIds.includes(githubId)) {
      return res.status(403).json({ message: 'Access denied: Not an admin' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

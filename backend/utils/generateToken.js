import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  console.log('User _id:', user._id, typeof user._id);

  return jwt.sign(
  { id: user._id.toString(), username: user.username, githubId: user.githubId },
  process.env.JWT_SECRET,
  { expiresIn: '10d' }
);

  
};

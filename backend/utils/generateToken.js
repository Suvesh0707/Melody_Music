import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  console.log('User _id:', user._id, typeof user._id);

  return jwt.sign(
    {
      id: user._id.toString(),
      username: user.username || null,
      githubId: user.githubId || null,
      googleId: user.googleId || null,
      email: user.email || null,
      displayName: user.displayName || null,
    },
    process.env.JWT_SECRET,
    { expiresIn: '10d' }
  );
};

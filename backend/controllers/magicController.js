import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;
const backendDomain = process.env.BACKEND_DOMAIN || 'http://localhost:3000';

// Nodemailer transporter (create once)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMagicLink = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const token = jwt.sign({ email }, secret, { expiresIn: '15m' });
    console.log('Generated token:', token);
    const magicLink = `${backendDomain}/auth/verify?token=${token}`;

    await transporter.sendMail({
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Magic Login Link',
      html: `<p>Click here to login: <a href="${magicLink}">${magicLink}</a></p>`,
    });

    res.json({ message: 'Magic link sent to your email' });
  } catch (error) {
    console.error('Error sending magic link:', error);
    res.status(500).json({ error: 'Failed to send magic link' });
  }
};

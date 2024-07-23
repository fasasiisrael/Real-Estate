// user.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '../../utils/dbConnect';
import User from '../../models/Users';
import { getSession } from 'next-auth/react';

dbConnect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { name, email, password, profilePhoto } = req.body;

        if (!name || !email || !password) {
          return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          profilePhoto
        });

        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
          expiresIn: '1h',
        });

        res.status(201).json({ user, token });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
      break;
    case 'GET':
      try {
        const session = await getSession({ req });

        if (!session) {
          return res.status(401).json({ message: 'Not authenticated' });
        }

        const user = await User.findById(session.user.id);

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}

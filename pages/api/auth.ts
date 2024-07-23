import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dbConnect from '../../utils/dbConnect'
import User from '../../models/Users'

dbConnect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const { email, password } = req.body

        if (!email || !password) {
          return res
            .status(400)
            .json({ message: 'Please provide all required fields' })
        }

        const user = await User.findOne({ email })

        if (!user) {
          return res.status(400).json({ message: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
          expiresIn: '1h',
        })

        res.status(200).json({ token, user })
      } catch (error) {
        res.status(500).json({ message: 'Server error', error })
      }
      break
    default:
      res.status(405).json({ message: 'Method not allowed' })
      break
  }
}

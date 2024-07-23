import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { addReview, getReviews } from '../../firestoreService'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req
  const session = await getSession({ req })

  switch (method) {
    case 'GET':
      try {
        const { propertyId } = req.query
        if (!propertyId) {
          return res.status(400).json({ message: 'Property ID is required' })
        }

        const reviews = await getReviews(propertyId)
        res.status(200).json(reviews)
      } catch (error) {
        res.status(500).json({ message: 'Server error', error })
      }
      break

    case 'POST':
      try {
        if (!session) {
          return res
            .status(401)
            .json({ message: 'You must be logged in to post a review' })
        }

        const { propertyId, rating, comment } = req.body
        if (!propertyId || !rating || !comment) {
          return res.status(400).json({ message: 'All fields are required' })
        }

        await addReview(propertyId, rating, comment, session.user)
        res.status(201).json({ message: 'Review added successfully' })
      } catch (error) {
        res.status(500).json({ message: 'Server error', error })
      }
      break

    default:
      res.status(405).json({ message: 'Method not allowed' })
      break
  }
}

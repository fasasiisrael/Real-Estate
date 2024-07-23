import { GetServerSideProps } from 'next'
import axios from 'axios'
import { getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import React from 'react'

const PropertyDetail = ({ propertyId }) => {
  const [property, setProperty] = useState(null)
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' })
  const [session, setSession] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const propertyResponse = await axios.get(`/api/property/${propertyId}`)
      setProperty(propertyResponse.data)

      const reviewsResponse = await axios.get(`/api/review`, {
        params: { propertyId },
      })
      setReviews(reviewsResponse.data)

      const userSession = await getSession()
      setSession(userSession)
    }

    fetchData()
  }, [propertyId])

  const handleReviewSubmit = async () => {
    try {
      await axios.post('/api/review', { ...newReview, propertyId })
      const reviewsResponse = await axios.get(`/api/review`, {
        params: { propertyId },
      })
      setReviews(reviewsResponse.data)
      setNewReview({ rating: 0, comment: '' })
    } catch (error) {
      console.error('Error submitting review', error)
    }
  }

  return (
    <div>
      {property && (
        <div>
          <h1>{property.name}</h1>
          <p>{property.description}</p>
          {/* Display property details */}
        </div>
      )}

      <div>
        <h2>Reviews</h2>
        {reviews.map((review) => (
          <div key={review._id}>
            <img
              src={review.user.profilePhoto}
              alt={review.user.name}
              className="w-8 h-8 rounded-full"
            />
            <p>{review.user.name}</p>
            <p>{'★'.repeat(review.rating)}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>

      {session && session.user && (
        <div>
          <h2>Leave a Review</h2>
          <input
            type="number"
            min="1"
            max="5"
            value={newReview.rating}
            onChange={(e) =>
              setNewReview({ ...newReview, rating: parseInt(e.target.value) })
            }
          />
          <textarea
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
          />
          <button onClick={handleReviewSubmit}>Submit</button>
        </div>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params
  return {
    props: { propertyId: id },
  }
}

export default PropertyDetail

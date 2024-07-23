import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebaseConfig'

const Property: React.FC<{ propertyId: string }> = ({ propertyId }) => {
  const [user, setUser] = useState(null)
  const [reviews, setReviews] = useState<any[]>([])
  const [rating, setRating] = useState<number>(0)
  const [comment, setComment] = useState<string>('')
  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      }
    })

    fetchReviews()

    return () => unsubscribe()
  }, [propertyId])

  const fetchReviews = async () => {
    try {
      const q = query(
        collection(db, 'reviews'),
        where('propertyId', '==', propertyId),
      )
      const querySnapshot = await getDocs(q)
      const fetchedReviews = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setReviews(fetchedReviews)
    } catch (error) {
      console.error('Error fetching reviews: ', error)
    }
  }

  const handleAddReview = async () => {
    if (!user) {
      alert('You need to be logged in to add a review.')
      return
    }

    if (rating <= 0 || !comment) {
      alert('Please provide a rating and comment.')
      return
    }

    try {
      await addDoc(collection(db, 'reviews'), {
        propertyId,
        userId: user.uid,
        userName: user.displayName,
        rating,
        comment,
      })
      setComment('')
      setRating(0)
      fetchReviews()
    } catch (error) {
      console.error('Error adding review: ', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Property Details</h1>
      {/* Display property details here */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id} className="border-b py-2">
                <p className="font-semibold">User: {review.userName}</p>
                <p>Rating: {review.rating}</p>
                <p>Comment: {review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
      {user && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Add a Review</h2>
          <div className="mb-2">
            <label htmlFor="rating" className="block text-sm font-medium mb-1">
              Rating
            </label>
            <input
              id="rating"
              type="number"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="comment" className="block text-sm font-medium mb-1">
              Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <button
            onClick={handleAddReview}
            className="p-2 bg-blue-600 text-white rounded"
          >
            Submit Review
          </button>
        </div>
      )}
    </div>
  )
}

export default Property

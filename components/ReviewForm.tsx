import React, { useState } from 'react';
import axios from 'axios';

interface ReviewFormProps {
  propertyId: string;
  onReviewSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ propertyId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to submit a review');
        return;
      }

      await axios.post(
        '/api/reviews',
        { propertyId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRating(0);
      setComment('');
      onReviewSubmitted();
    } catch (err) {
      setError('Error submitting review');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700">Rating</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          min="1"
          max="5"
          className="mt-1 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;

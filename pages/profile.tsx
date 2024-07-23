import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useRouter } from 'next/router';
import Header from '../components/Header';

const Profile: React.FC = () => {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchReviews(user.uid);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  const fetchReviews = async (userId: string) => {
    try {
      const q = query(collection(db, 'reviews'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const fetchedReviews = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(fetchedReviews);
    } catch (error) {
      console.error('Error fetching reviews: ', error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <div className="mb-6">
          <p className="text-lg font-semibold">Hello, {user.displayName}</p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Your Reviews</h2>
        {reviews.length > 0 ? (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li key={review.id} className="border-b pb-4">
                <p className="font-semibold">Property ID: {review.propertyId}</p>
                <p>Rating: {review.rating}</p>
                <p>Comment: {review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews found.</p>
        )}
      </div>
    </>
  );
};

export default Profile;

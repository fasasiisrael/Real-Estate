import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export const addReview = async (propertyId, rating, comment, user) => {
  try {
    await addDoc(collection(db, 'reviews'), {
      propertyId,
      userId: user.uid,
      rating,
      comment,
      userName: user.displayName,
      createdAt: new Date()
    });
  } catch (err) {
    console.error("Error adding review: ", err);
  }
};

export const getReviews = async (propertyId) => {
  const q = query(collection(db, 'reviews'), where('propertyId', '==', propertyId));
  const querySnapshot = await getDocs(q);
  const reviews = [];
  querySnapshot.forEach((doc) => {
    reviews.push({ id: doc.id, ...doc.data() });
  });
  return reviews;
};

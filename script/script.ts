import User from '../models/Users';
import Property from '../models/Property';
import Review from '../models/Review';
import dbConnect from '../utils/dbConnect';

const initDB = async () => {
  await dbConnect();

  // Insert initial users
  const user = new User({ username: 'admin', email: 'admin@example.com', password: 'password', roles: ['admin'] });
  await user.save();

  // Insert initial property
  const property = new Property({ title: 'Sample Property', description: 'A nice place to stay', price: 100, location: 'City Center', isNew: true });
  await property.save();

  // Insert initial review
  const review = new Review({ user: user._id, property: property._id, rating: 5, comment: 'Excellent place!' });
  await review.save();

  console.log('Database initialized with initial data');
  process.exit();
};

initDB().catch(error => {
  console.error('Error initializing database:', error);
  process.exit(1);
});

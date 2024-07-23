import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PropertyCardProps {
  image: string;
  name: string;
  location: string;
  price: number;
  listingDate: string;
  contact: string;
  rating: number;
  numReviews: number;
  id: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  image,
  name,
  location,
  price,
  listingDate,
  contact,
  rating,
  numReviews,
  id
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link href={`/properties/${id}`} legacyBehavior>
        <a>
          <Image
            src={image}
            alt={name}
            width={400}
            height={300}
            className="object-cover"
          />
        </a>
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">{location}</p>
        <p className="text-gray-800">${price}</p>
        <p className="text-gray-600">Listed on: {new Date(listingDate).toLocaleDateString()}</p>
        <p className="text-gray-600">Contact: {contact}</p>
        <div className="flex items-center">
          <span className="text-yellow-400">{`${rating.toFixed(1)} / 5`}</span>
          <span className="text-gray-600 ml-2">({numReviews} reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

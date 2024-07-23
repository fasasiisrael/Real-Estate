import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from './PropertyCard';
import Link from 'next/link';
import { BsFillXCircleFill } from 'react-icons/bs'; // Import close icon for the modal

const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 99000 });
  const [dateRange, setDateRange] = useState({
    min: '2000-03-25',
    max: '2024-09-25',
  });
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.post(
          'https://realty-in-us.p.rapidapi.com/properties/v3/list',
          {
            limit: 400,
            offset: 0,
            boundary: {
              coordinates: [
                [
                  [-117.684674198, 35.277450023],
                  [-117.631311189, 35.274184026],
                  [-117.630875184, 35.222865021],
                  [-117.631285178, 35.155927013],
                  [-117.95242822, 35.014412979],
                  [-117.970149224, 35.014042977],
                  [-118.042545235, 35.014723973],
                  [-118.06296824, 35.025418973],
                  [-118.13462826, 35.111049978],
                  [-118.111274258, 35.141493982],
                  [-118.100161258, 35.155629985],
                  [-118.077910257, 35.183782989],
                  [-117.731149206, 35.27267702],
                  [-117.684674198, 35.277450023],
                ],
              ],
            },
            sold_date: dateRange,
            sold_price: priceRange,
            status: ['sold', 'for_sale'],
            sort: {
              direction: 'desc',
              field: 'list_date',
            },
          },
          {
            headers: {
              'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
              'x-rapidapi-host': 'realty-in-us.p.rapidapi.com',
              'Content-Type': 'application/json',
            },
          },
        );

        if (
          response.data &&
          response.data.data &&
          response.data.data.home_search &&
          response.data.data.home_search.results
        ) {
          const fetchedProperties = response.data.data.home_search.results;
          setProperties(fetchedProperties);
          setFilteredProperties(fetchedProperties);
        } else {
          throw new Error('Unexpected API response structure');
        }
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error fetching properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [dateRange, priceRange]);

  useEffect(() => {
    // Filter properties based on search and current filters
    const applyFilters = () => {
      const result = properties.filter((property: any) => {
        const isInPriceRange =
          property.list_price >= priceRange.min &&
          property.list_price <= priceRange.max;
        const isInDateRange =
          new Date(property.list_date) >= new Date(dateRange.min) &&
          new Date(property.list_date) <= new Date(dateRange.max);
        const matchesSearch =
          property.description.type
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          property.location.address.line
            .toLowerCase()
            .includes(search.toLowerCase());
        return isInPriceRange && isInDateRange && matchesSearch;
      });
      setFilteredProperties(result);
    };

    applyFilters();
  }, [search, priceRange, dateRange, properties]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilterClick = () => {
    setFilterModalOpen(true);
  };

  const handleFilterClose = () => {
    setFilterModalOpen(false);
  };

  const handleFilterApply = () => {
    setFilterModalOpen(false);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange({ ...priceRange, [e.target.name]: Number(e.target.value) });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const indexOfLastProperty = currentPage * itemsPerPage;
  const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty,
  );

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const isNewListing = (listingDate: string) => {
    const date = new Date(listingDate);
    const now = new Date();
    const diffInMonths =
      (now.getFullYear() - date.getFullYear()) * 12 +
      now.getMonth() -
      date.getMonth();
    return diffInMonths <= 17;
  };

  return (
    <div className="relative p-4">
      <div
        className="absolute inset-0 bg-cover bg-repeat"
        style={{
          backgroundImage:
            'url(https://thumbs.dreamstime.com/b/real-estate-vector-thin-line-seamless-pattern-business-122886196.jpg)',
          backgroundSize: '200px 200px',
          opacity: 0.1,
        }}
      ></div>

      <div className="relative z-10 flex items-center mb-8"> 
        <input
          type="text"
          placeholder="Having a specific house or place in mind?"
          value={search}
          onChange={handleSearchChange}
          className="p-2 border border-green-400 rounded mb-4 w-2/5 transition-transform duration-300"
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) =>
            (e.target.placeholder = 'Have a specific house or place in mind?')
          }
        />
        <button
          onClick={handleFilterClick}
          className="ml-auto p-2 bg-green-400 text-white rounded-full flex items-center"
        >
          <span className="mr-2">Filter</span>
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/sf-black/25/FFFFFF/sorting-options.png"
            alt="sorting-options"
          />
        </button>
      </div>

      {filterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <button
              onClick={handleFilterClose}
              className="absolute top-2 right-2 text-gray-600"
            >
              <BsFillXCircleFill size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-4">Filter Properties</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Price Range
              </label>
              <input
                type="number"
                name="min"
                value={priceRange.min}
                onChange={handlePriceChange}
                className="p-2 border border-green-400 rounded mb-2 w-full"
                placeholder="Min Price"
              />
              <input
                type="number"
                name="max"
                value={priceRange.max}
                onChange={handlePriceChange}
                className="p-2 border border-green-400 rounded w-full"
                placeholder="Max Price"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Date Range
              </label>
              <input
                type="date"
                name="min"
                value={dateRange.min}
                onChange={handleDateChange}
                className="p-2 border border-gray-400 rounded mb-2 w-full"
              />
              <input
                type="date"
                name="max"
                value={dateRange.max}
                onChange={handleDateChange}
                className="p-2 border border-gray-400 rounded w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleFilterApply}
                className="px-4 py-2 bg-green-400 text-white rounded"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center h-64">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            width="100"
            height="100"
          >
            <circle
              fill="#84DFC4"
              stroke="#84DFC4"
              strokeWidth="2"
              r="15"
              cx="40"
              cy="65"
            >
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="1.5"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.4"
              ></animate>
            </circle>
            <circle
              fill="#84DFC4"
              stroke="#84DFC4"
              strokeWidth="2"
              r="15"
              cx="100"
              cy="65"
            >
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="1.5"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.2"
              ></animate>
            </circle>
            <circle
              fill="#84DFC4"
              stroke="#84DFC4"
              strokeWidth="2"
              r="15"
              cx="160"
              cy="65"
            >
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="1.5"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="0"
              ></animate>
            </circle>
          </svg>
        </div>
      )}
      {error && <p>Error loading properties: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16"> 
        {currentProperties.map((property: any) => {
          const listingDate = property.list_date || '';
          const isNew = isNewListing(listingDate);

          return (
            <Link
              href={`/property/${property.property_id}`}
              key={property.property_id}
              legacyBehavior
            >
              <a className="relative block">
                <PropertyCard
                  image={
                    property.primary_photo?.href ||
                    'https://web.redanonline.org/wp-content/uploads/2021/12/real-estate-business-compressor.jpg'
                  }
                  name={property.description.type || 'Unknown'}
                  location={property.location.address.line || 'Unknown'}
                  price={property.list_price || 0}
                  listingDate={listingDate}
                  contact={
                    property.advertisers && property.advertisers.length > 0
                      ? property.advertisers[0].email
                      : 'N/A'
                  }
                  rating={property.rating || 0}
                  numReviews={property.numReviews || 0}
                  id={property.property_id}
                />
                {isNew && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    New
                  </div>
                )}
              </a>
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="relative bottom-4 inset-x-0 flex justify-center items-center space-x-2 z-20 w-3/5 mx-auto mb-8"> 
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            className="px-4 py-2 border rounded-lg bg-white text-green-600 hover:bg-gray-100 transition duration-300"
            disabled={currentPage === 1}
          >
            Back
          </button>
          <div className="flex space-x-2">
            {currentPage > 3 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className="px-4 py-2 border rounded-lg bg-white text-green-600 hover:bg-gray-100 transition duration-300"
                >
                  1
                </button>
                <span className="px-4 py-2">...</span>
              </>
            )}
            {Array.from({ length: Math.min(3, totalPages) }).map((_, index) => {
              const pageNumber = Math.min(index + 1, totalPages);
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 border rounded-lg ${currentPage === pageNumber ? 'bg-green-600 text-white' : 'bg-white text-green-600'} hover:bg-gray-100 transition duration-300`}
                >
                  {pageNumber}
                </button>
              );
            })}
            {totalPages > 4 && currentPage < totalPages - 3 && (
              <>
                <span className="px-4 py-2">...</span>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="px-4 py-2 border rounded-lg bg-white text-green-600 hover:bg-gray-100 transition duration-300"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
          <button
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            className="px-4 py-2 border rounded-lg bg-white text-green-600 hover:bg-gray-100 transition duration-300"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyList;

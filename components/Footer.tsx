import React from 'react'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from 'react-icons/fa'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* About Us Section */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-2xl font-bold mb-2">About Us</h3>
          <p className="text-gray-400">
            We are a leading real estate company dedicated to helping you find
            your dream home.
            <br />
            Our team of experts provides top-notch service and invaluable
            insights into the real estate market.
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-400 text-gray-400 hover:text-white hover:border-white transition duration-300"
          >
            <FaFacebookF size={16} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-400 text-gray-400 hover:text-white hover:border-white transition duration-300"
          >
            <FaTwitter size={16} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-400 text-gray-400 hover:text-white hover:border-white transition duration-300"
          >
            <FaInstagram size={16} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-400 text-gray-400 hover:text-white hover:border-white transition duration-300"
          >
            <FaLinkedinIn size={16} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-400 text-gray-400 hover:text-white hover:border-white transition duration-300"
          >
            <FaGithub size={16} />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-4 pt-4 text-center text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Fasasi Realty. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer

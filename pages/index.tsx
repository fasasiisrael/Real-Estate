import React from 'react'
import PropertyList from '../components/PropertyList'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import { Analytics } from "@vercel/analytics/react"

const HomePage: React.FC = () => {
  return (
    
    <div className="flex flex-col min-h-screen">
      <Analytics/>
      <HeroSection />
      <main className="flex-grow">
        <PropertyList />
        {/* Call to Action Section */}
        <section className="flex flex-col lg:flex-row items-center bg-green-300 text-white py-16 px-4">
          {/* Image */}
          <div className="flex-shrink-0 lg:w-1/2 lg:pr-8">
            <img
              src="https://www.b2w.tv/hubfs/1672980283885.gif"
              alt="Real Estate"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          {/* Text Content */}
          <div className="lg:w-1/2 lg:pl-8 mt-8 lg:mt-0 text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-4">
              Discover Your Dream Home Today
            </h2>
            <p className="text-lg mb-6">
              Whether you're buying, selling, or renting, our team of expert
              real estate agents is here to guide you through every step of the
              process. With a deep understanding of the market and a commitment
              to personalized service, we ensure that your real estate journey
              is smooth and successful.
            </p>
            <p className="text-lg mb-8">
              Ready to take the next step? Contact us today and let us help you
              find the perfect property that meets all your needs and desires.
            </p>
            <a
              href="tel:+1234567890"
              className="inline-block px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
            >
              Call Us Now: +1 (234) 567-890
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default HomePage

import React from 'react'
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-white min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
                <span className="text-[#f56551] block">Discover Your Next Adventure with AI:</span>
                <span className="text-black block">Personalized Itineraries at Your Fingertips</span>
            </h1>

            <p className="text-gray-500 text-lg mb-8">
                Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
            </p>

            <Link to={'/create-trip'}>
                <button className="bg-black text-white px-6 py-3 rounded-md text-base hover:bg-gray-800 transition duration-200">
                    Get Started, It's Free
                </button>
            </Link>
            
        </div>
    </section>
  )
}

export default Hero

// import React from 'react'
import profileImage from '../assets/swifttech.png'

const Hero = () => {
    return (
        <div className="bg-black text-white text-center py-16">
            <div className='flex'>
                <img 
                src= {profileImage}
                alt= "Hero"
                className='ml-5 mb-8 w-150 h-78 object-contain border-4
                transform transition-transform duration-300 hover:scale-105'
            />
            <p className='text-4xl max-w-6xl mx-auto px-6 gap-10'>
                <div>
                    Trusted Retail & Distribution Partner for 
                    Technology and Lifestyle Brands
                </div>
            </p>
            </div>
            
            <div>

            </div>
        </div>
    )
}

export default Hero
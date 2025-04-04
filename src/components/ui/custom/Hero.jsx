import React from 'react'
import { Button } from '../button'

function Hero() {
    return (
        <div className='flex flex-col items-center mx-56 gap-9'>
            <h1 className='font-extrabold text-[45px] text-center mt-16' >
                <span className='text-[#FF7A00]'> Unlock New Travel Experiences with AI: </span> Custom Itineraries Designed for You
            </h1>
            <p className='text-xl text-gray-500 text-center'>
                Your intelligent travel assistant — crafting personalized itineraries that match your interests, style, and budget, while saving you hours of planning. Whether you're dreaming of hidden gems,
                foodie adventures, or cultural deep-dives, we bring your perfect trip to life — effortlessly.
            </p>
            <Button>Get Started – It’s Free</Button>
        </div>

    )
}

export default Hero
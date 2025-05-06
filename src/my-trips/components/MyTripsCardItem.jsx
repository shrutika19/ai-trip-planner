import React from 'react'

function MyTripsCardItem({ trip }) {
    return (
        <div>
            <img src='/placeholder.jpg' className='object-cover rounded-xl cursor-pointer' />
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
            <h2 className='text-sm text-gray-500'>
                {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget
            </h2>
        </div>
    )
}

export default MyTripsCardItem
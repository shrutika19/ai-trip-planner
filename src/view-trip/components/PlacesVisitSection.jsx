import React from 'react'
import PlaceCard from './PlaceCard'

function PlacesVisitSection({ trip }) {
    return (
        <div>
            <h2 className='font-bold text-lg'>Places to Visit</h2>
            <div>
                {trip?.tripData?.itinerary.map((item, index) => (
                    <div>
                        <h2 className='font-medium text-lg'>Day {item?.day}</h2>
                        <div className='grid grid-cols-2 gap-5'>
                            {item?.places.map((place, index) => (
                                <div className='my-3'>
                                    <h2 className='font-medium text-sm text-orange-600'>{place?.bestTime}</h2>
                                    <PlaceCard place={place} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlacesVisitSection
import React from 'react'
import { Link } from 'react-router-dom'
import Hotelcard from './Hotelcard'

function HotelSection({ trip }) {
    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
                {trip?.tripData?.hotels?.map((item, index) => (
                    <Hotelcard key={item?.id || index} item={item} index={index} />

                ))}
            </div>
        </div>
    )
}

export default HotelSection
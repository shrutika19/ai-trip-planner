import { Button } from '@/components/ui/button';
import React from 'react'
import { Link } from 'react-router-dom';
// import { FaMapLocation } from "react-icons/fa6";


function PlaceCard({ place }) {
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.name} target='_blank'>
            <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer hover:shadow-md'>
                <img src='/placeholder.jpg' className='w-[130px] h-[130px] rounded-xl' />
                <div>
                    <h2 className='font-bold text-lg'>{place?.name}</h2>
                    <p className='text-sm text-gray-500'>{place?.description}</p>
                    <h2 className='mt-2'>🕙{place?.travelTime}</h2>
                    {/* <Button className="mt-2" size="sm"><FaMapLocation /></Button> */}
                </div>
            </div>
        </Link>
    )
}

export default PlaceCard
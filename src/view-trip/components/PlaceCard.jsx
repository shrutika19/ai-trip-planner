import React from 'react'

function PlaceCard({ place }) {
    return (
        <div className='border rounded-xl p-3 mt-2 flex gap-5'>
            <img src='/placeholder.jpg' className='w-[130px] h-[130px] rounded-xl' />
            <div>
                <h2 className='font-bold text-lg'>{place?.name}</h2>
            </div>
        </div>
    )
}

export default PlaceCard
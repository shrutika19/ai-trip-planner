import { PHOTO_REF_URL } from '@/constants/options';
import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Hotelcard({ item, index }) {

    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        item && GetPlacePhoto();
    }, [item])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: item?.name
        };

        try {
            const res = await GetPlaceDetails(data);
            // Do something with res.data if needed
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', res.data.places[0].photos[3].name);
            setPhotoUrl(PhotoUrl)
        } catch (error) {
            console.error("Place API Error:", error); // Full AxiosError with .response, .message, etc.
        }
    };

    return (
        <Link
            to={'https://www.google.com/maps/search/?api=1&query=' + item?.name + "," + item?.address} target='_blank'>
            <div className='hover:scale-105 transition-all cursor-pointer'>
                <img src={photoUrl} className='rounded-xl h-[180px] w-full object-cover' />
                <div className='my-2 flex flex-col gap-4'>
                    <h2 className='font-medium'>{item?.name}</h2>
                    <h2 className='text-xs text-gray-500'>📍{item?.address}</h2>
                    <h2 className='text-sm'>💰{item?.priceRange}</h2>
                    <h2 className='text-sm'>⭐{item?.rating}</h2>

                </div>
            </div>
        </Link>
    )
}

export default Hotelcard
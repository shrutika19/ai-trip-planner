import { PHOTO_REF_URL } from '@/constants/options';
import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function MyTripsCardItem({ trip }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
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
        <Link to={'/view-trip/' + trip?.id}>
            <div className='hover:scale-105 transition-all '>
                <img src={photoUrl ? photoUrl : '/placeholder.jpg'} className='object-cover rounded-xl cursor-pointer h-[220px]' />
                <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
                <h2 className='text-sm text-gray-500'>
                    {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget
                </h2>
            </div>
        </Link>
    )
}

export default MyTripsCardItem
import { Button } from '@/components/ui/button';
import { PHOTO_REF_URL } from '@/constants/options';
import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
// import { FaMapLocation } from "react-icons/fa6";


function PlaceCard({ place }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        place && GetPlacePhoto();
    }, [place])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: place?.name
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
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.name} target='_blank'>
            <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer hover:shadow-md'>
                <img src={photoUrl} className='w-[130px] h-[130px] rounded-xl object-cover' />
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
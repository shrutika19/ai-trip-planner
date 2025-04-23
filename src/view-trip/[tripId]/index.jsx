import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import HotelSection from '../components/HotelSection';
import PlacesVisitSection from '../components/PlacesVisitSection';
import Footer from '../components/Footer';

function ViewTrip() {

    const { tripId } = useParams();
    const [trip, setTrip] = useState([])

    useEffect(() => {
        getTripData();
    }, [tripId])

    const getTripData = async () => {
        const docRef = doc(db, 'Aitrips', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document", docSnap.data())
            setTrip(docSnap.data());
        } else {
            console.log("No such document");
            toast("No trip found!");
        }
    }

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            <InfoSection trip={trip} />
            <HotelSection trip={trip} />
            <PlacesVisitSection trip={trip} />
            <Footer />
        </div>

    )
}

export default ViewTrip
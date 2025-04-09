import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';

function ViewTrip() {

    const { tripId } = useParams();

    useEffect(() => {
        getTripData();
    }, [tripId])

    const getTripData = async () => {
        const docRef = doc(db, 'Aitrips', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document", docSnap.data())
        } else {
            console.log("No such document");
            toast("No trip found!");
        }
    }

    return (
        <div>{tripId}</div>
    )
}

export default ViewTrip
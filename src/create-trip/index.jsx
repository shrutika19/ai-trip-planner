import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options'
import { chatSession } from '@/service/AIModel'
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'


function CreateTrip() {
    const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY
    const [place, setPlace] = useState()
    const [formData, setformData] = useState([])
    const [openDialog, setOpenDialog] = useState(false)

    const handleInputChange = (name, value) => {
        setformData({
            ...formData,
            [name]: value
        })
    }

    const handleSignIn = useGoogleLogin({
        onSuccess: (res) => GetUserPofile(res),
        onError: (error) => console.log(error)
    })

    const GetUserPofile = (token) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token?.access_token}`, {
            headers: {
                Authorization: `Bearer ${token?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((response) => {
            console.log(response);
            localStorage.setItem('user', JSON.stringify(response.data));
            setOpenDialog(false);
            onGeneratetrip();
        })
    }

    const onGeneratetrip = async () => {
        const user = localStorage.getItem('user');
        if (!user) {
            setOpenDialog(true)
            return;
        }

        if (formData?.noOfDays > 5 && !formData?.location || !formData?.noOfDays || !formData?.budget || !formData?.travelPlan) {
            toast.custom((t) => (
                <div
                    className="bg-red-600 text-white px-4 py-2 rounded shadow-md flex items-center gap-2"
                    onClick={() => toast.dismiss(t)}
                >
                    All fields are required
                </div>
            ));
            return;
        }
        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label)
            .replace('{noOfDays}', formData?.noOfDays)
            .replace('{travelPlan}', formData?.travelPlan)
            .replace('{budget}', formData?.budget)
            .replace('{totaldays}', formData?.noOfDays)

        console.log("FINAL_PROMPT", FINAL_PROMPT)
        const result = await chatSession.sendMessage(FINAL_PROMPT)
        console.log("result", result?.response?.text());
    }

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 max-w-screen-xl w-full">
                <h2 className="font-bold text-3xl">Tell us your travel preferences 🏖️🌴</h2>
                <p className="mt-3 text-gray-500 text-xl">
                    Just provide basic information, and our trip planner will generate a customized itinerary based on your preferences.
                </p>

                <div className="mt-20 flex flex-col gap-10">
                    <div>
                        <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
                        <GooglePlacesAutocomplete
                            apiKey={apiKey}
                            selectProps={{
                                place,
                                onChange: (v) => {
                                    setPlace(v);
                                    handleInputChange('location', v)
                                },
                            }}
                        />
                    </div>

                    <div>
                        <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
                        <Input
                            placeholder={"Ex.3"}
                            type="number"
                            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                        />
                    </div>

                    <div>
                        <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5">
                            {SelectBudgetOptions.map((item, index) => (
                                <div key={index}
                                    onClick={() => handleInputChange('budget', item.title)}
                                    className={`p-4 border cursor-pointer rounded hover:shadow-lg text-center 
                                    ${formData.budget == item.title && `shadow-lg border-black`}
                                    `}>
                                    <h2 className="text-4xl">{item.icon}</h2>
                                    <h2 className="font-bold text-lg">{item.title}</h2>
                                    <h2 className="text-sm text-gray-500">{item.desc}</h2>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl my-3 font-medium">Who do you plan on travelling with on your next adventure?</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5">
                            {SelectTravelList.map((item, index) => (
                                <div key={index}
                                    onClick={() => handleInputChange('travelPlan', item.people)}
                                    className={`p-4 border cursor-pointer rounded hover:shadow-lg text-center 
                                        ${formData.travelPlan == item.people && `shadow-lg border-black`}
                                        `}>
                                    <h2 className="text-4xl">{item.icon}</h2>
                                    <h2 className="font-bold text-lg">{item.title}</h2>
                                    <h2 className="text-sm text-gray-500">{item.desc}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="my-10 justify-center flex">
                    <Button onClick={onGeneratetrip}>Generate Trip</Button>
                </div>

                <Dialog open={openDialog}>
                    <DialogContent className="rounded-xl p-6 max-w-md text-center">
                        <DialogHeader>
                            <div className="flex flex-col items-center gap-4">
                                <img src="/logo.svg" alt="App Logo" className="w-16 h-16" />
                                <h2 className="font-bold text-2xl text-gray-800">Sign In With Google</h2>
                                <p className="text-gray-500 text-sm">
                                    Sign in to the app with Google Authentication securely.
                                </p>
                                <Button
                                    onClick={handleSignIn}
                                    className="w-full mt-4 bg-black hover:bg-zinc-900 text-white flex items-center justify-center gap-3 text-base shadow-md">
                                    <FcGoogle className="h-5 w-5" />
                                    Sign In with Google
                                </Button>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );

}

export default CreateTrip
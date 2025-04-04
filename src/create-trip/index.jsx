import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SelectBudgetOptions, SelectTravelList } from '@/constants/options'
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

function CreateTrip() {
    const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY
    const [place, setPlace] = useState()
    const [formData, setformData] = useState([])

    const handleInputChange = (name, value) => {
        setformData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        console.log(formData)
    }, [formData])

    const onGeneratetrip = () => {
        if (formData?.noOfDays > 5)
            return;
        console.log("formdata", formData)
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
            </div>
        </div>
    );

}

export default CreateTrip
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Generate a travel plan for the location: Goa, for 3 days for a couple with a low budget. Provide a list of hotel options including the hotel name, address, price, image URL, geo-coordinates, rating, and a short description. Also, suggest a 3-day itinerary with details for each place, including the place name, description, image URL, geo-coordinates, ticket pricing, travel time between locations, and the best time to visit. Format the output in proper JSON" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"tripName\": \"Goa Budget Trip for Couples (3 Days)\",\n  \"budget\": \"Low\",\n  \"travelers\": 2,\n  \"duration\": 3,\n  \"hotels\": [\n    {\n      \"name\": \"The Goan Heritage Hotel\",\n      \"address\": \"Fontainhas, Panjim, Goa\",\n      \"priceRange\": \"₹1500-₹2500 per night\",\n      \"imageUrl\": \"https://example.com/goanheritage.jpg\",  //Replace with actual image URL\n      \"geoCoordinates\": \"[15.45, 73.82]\", //Example coordinates, replace with actual\n      \"rating\": 4.0,\n      \"description\": \"A charming heritage hotel in the heart of Panjim, offering basic but clean rooms.  Good value for money.\"\n    },\n    {\n      \"name\": \"Zostel Goa\",\n      \"address\": \"Palolem Beach, Canacona, Goa\",\n      \"priceRange\": \"₹800-₹1500 per night\",\n      \"imageUrl\": \"https://example.com/zostelgoa.jpg\", //Replace with actual image URL\n      \"geoCoordinates\": \"[15.08, 74.03]\", //Example coordinates, replace with actual\n      \"rating\": 4.2,\n      \"description\": \"A hostel with private rooms available, ideal for budget travelers looking for a social atmosphere. Close to Palolem Beach.\"\n    },\n    {\n      \"name\": \"Casa De Goa\",\n      \"address\": \"Near Calangute Beach, Goa\",\n      \"priceRange\": \"₹1200-₹2000 per night\",\n      \"imageUrl\": \"https://example.com/casadegoa.jpg\", //Replace with actual image URL\n      \"geoCoordinates\": \"[15.5, 73.7]\", //Example coordinates, replace with actual\n      \"rating\": 3.8,\n      \"description\": \"A simple guesthouse offering basic amenities and proximity to Calangute beach. Expect a basic but clean stay.\"\n    }\n\n  ],\n  \"itinerary\": [\n    {\n      \"day\": 1,\n      \"places\": [\n        {\n          \"name\": \"Panjim City\",\n          \"description\": \"Explore the capital city's colonial architecture, churches, and Latin Quarter.\",\n          \"imageUrl\": \"https://example.com/panjim.jpg\", //Replace with actual image URL\n          \"geoCoordinates\": \"[15.45, 73.82]\", //Example coordinates, replace with actual\n          \"ticketPricing\": \"Free (except for entry fees to specific museums)\",\n          \"travelTime\": \"0 (if starting from Panjim hotel)\",\n          \"bestTime\": \"Morning\"\n        },\n        {\n          \"name\": \"Miramar Beach\",\n          \"description\": \"Relax on the beach, enjoy the sunset.\",\n          \"imageUrl\": \"https://example.com/miramar.jpg\", //Replace with actual image URL\n          \"geoCoordinates\": \"[15.47, 73.8]\", //Example coordinates, replace with actual\n          \"ticketPricing\": \"Free\",\n          \"travelTime\": \"30 mins (from Panjim)\",\n          \"bestTime\": \"Evening\"\n        }\n      ]\n    },\n    {\n      \"day\": 2,\n      \"places\": [\n        {\n          \"name\": \"Old Goa Churches (Bom Jesus Basilica, Se Cathedral)\",\n          \"description\": \"Visit the historical churches, a UNESCO World Heritage Site.\",\n          \"imageUrl\": \"https://example.com/oldgoa.jpg\", //Replace with actual image URL\n          \"geoCoordinates\": \"[15.48, 73.99]\", //Example coordinates, replace with actual\n          \"ticketPricing\": \"Nominal entry fee for each church\",\n          \"travelTime\": \"1 hour (from Panjim)\",\n          \"bestTime\": \"Morning\"\n        },\n        {\n          \"name\": \"Calangute Beach\",\n          \"description\": \"Enjoy the lively atmosphere, swim, or relax on the sand.\",\n          \"imageUrl\": \"https://example.com/calangute.jpg\", //Replace with actual image URL\n          \"geoCoordinates\": \"[15.5, 73.7]\", //Example coordinates, replace with actual\n          \"ticketPricing\": \"Free\",\n          \"travelTime\": \"1.5 hours (from Old Goa)\",\n          \"bestTime\": \"Afternoon\"\n        }\n      ]\n    },\n    {\n      \"day\": 3,\n      \"places\": [\n        {\n          \"name\": \"Vagator Beach\",\n          \"description\": \"Relax on the quieter beach, known for its sunsets and Chapora Fort.\",\n          \"imageUrl\": \"https://example.com/vagator.jpg\", //Replace with actual image URL\n          \"geoCoordinates\": \"[15.53, 73.74]\", //Example coordinates, replace with actual\n          \"ticketPricing\": \"Free\",\n          \"travelTime\": \"1 hour (from Calangute)\",\n          \"bestTime\": \"Afternoon\"\n        },\n        {\n          \"name\": \"Chapora Fort\",\n          \"description\": \"Hike up to the fort for panoramic views of Vagator Beach.\",\n          \"imageUrl\": \"https://example.com/chapora.jpg\", //Replace with actual image URL\n          \"geoCoordinates\": \"[15.54, 73.75]\", //Example coordinates, replace with actual\n          \"ticketPricing\": \"Nominal entry fee\",\n          \"travelTime\": \"15 mins (from Vagator Beach)\",\n          \"bestTime\": \"Late Afternoon\"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Note:**  Remember to replace the placeholder image URLs and coordinates with actual data.  Travel times are estimates and may vary depending on traffic and mode of transport.  Prices are also subject to change.  Consider using public transport or renting a scooter to keep costs down.  Always check the latest entry fees and timings for attractions before your visit.\n" },
            ],
        },
    ],
});


export const SelectBudgetOptions = [
    {
        id: 1,
        title: "Cheap",
        desc: "Stay conscious of costs",
        icon: "💸",
    },
    {
        id: 2,
        title: "Moderate",
        desc: "Keep cost on the average side",
        icon: "💵",
    },
    {
        id: 3,
        title: "Luxury",
        desc: "Don't worry about the cost",
        icon: "💰",
    },
];

export const SelectTravelList = [
    {
        id: 1,
        title: "Just Me",
        desc: "A sole travels in exploration",
        icon: "🧍",
        people: "1",
    },
    {
        id: 2,
        title: "A Couple",
        desc: "Two travels in tandem",
        icon: "👫",
        people: "2 People",
    },
    {
        id: 3,
        title: "Family",
        desc: "A group of fun loving adv",
        icon: "👨‍👩‍👧‍👦",
        people: "3 to 5 People",
    },
    {
        id: 4,
        title: "Friends",
        desc: "A bunch of thrill-seekers",
        icon: "🧑‍🤝‍🧑",
        people: "5 to 10 People",
    },
];

export const PHOTO_REF_URL =
    "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=" +
    import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

export const AI_PROMPT =
    "Generate a travel plan for the location: {location}, for {noOfDays} days for a {travelPlan} with a {budget} budget. Provide a list of hotel options including the hotel name, address, price, image URL, geo-coordinates, rating, and a short description. Also, suggest a {totaldays}-day itinerary with details for each place, including the place name, description, image URL, geo-coordinates, ticket pricing, travel time between locations, and the best time to visit. Format the output in proper JSON";

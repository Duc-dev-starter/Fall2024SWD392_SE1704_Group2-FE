import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React from 'react';
import config from '../../secret';

const RegistrationContest = () => {
    const handleRegistration = async () => {
        const stripePromise = await loadStripe(config.STRIPE_PUBLIC_KEY);

        try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('token');

            // Set up headers for axios
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Add your token here
            };

            const fakeData = {
                "contestId": "3c46924a-4a22-49a6-9670-9894dda92463",
                "note": "I want to join this contest",
                "displayName": "Khoi adventure",
                "fishId": "93440ec2-ea97-470f-a23a-7d9145249987",
                "amount": 5.32
            }

            // Make the POST request
            const response = await axios.post(
                'https://localhost:7230/api/member/contest-registration',
                fakeData, // You can pass any required data here instead of an empty object
                { headers }
            );

            const { sessionId } = response.data;

            const stripe = stripePromise;
            await stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <button onClick={handleRegistration}>
            Register for Contest
        </button>
    );
};

export default RegistrationContest;

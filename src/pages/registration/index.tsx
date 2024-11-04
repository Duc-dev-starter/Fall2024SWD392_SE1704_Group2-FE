import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import config from '../../secret';
import { BaseService } from '../../services';

const RegistrationContest = () => {
    const handleRegistration = async () => {
        const stripePromise = await loadStripe(config.STRIPE_PUBLIC_KEY);

        try {
            const fakeData = {
                "contestId": "c11843f2-d04a-41a2-a6e1-746fbc0cb1bf",
                "note": "I want to join this contest",
                "displayName": "Khoi adventure",
                "fishId": "a87abef8-64b0-4b15-8a48-1f0bf36b123a",
                "amount": 5
            }

            const response = await BaseService.post({ url: '/api/member/contest-registration', payload: fakeData })

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

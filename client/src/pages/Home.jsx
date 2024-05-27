import React from 'react'
import { useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import getStripe from '../lib/getStripe'
import useAuth from '../hooks/useAuth'

export default function Home() {
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState('world');

    async function paySubscription(subType) {
        let price = '';
        if (subType === 'individual') {
            price = 'price_1PILWwDHF0H2ygqdYcDDcpnk';
        }

        if (subType === 'group') {
            price = 'price_1PILXCDHF0H2ygqdR3WAxtFu';
        }

        if (subType === 'business') {
            price = 'price_1PILXQDHF0H2ygqdKH6cUkUx';
        }

        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout({
            lineItems: [
                {
                price,
                quantity: 1,
                },
            ],
            mode: 'subscription',
            successUrl: `http://localhost:3000/success?subType=${subType}`,
            cancelUrl: `http://localhost:3000/cancel?subType=${subType}`,
            customerEmail: user.email,
        });

        console.warn(error.message);
    }

    return (
        <div className='container mt-3'>
            <h2>
                <div className='row'>
                    <div className="mb-12">
                        {user?.email !== undefined ? 'Welcome to the application' : 'Please login first'}
                    </div>
                </div>
            </h2>
        </div>
    )
}

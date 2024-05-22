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
    const [card, setCard] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

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
        <div className='container'>
            <h2>Susbcriptions</h2>
            {user?.email !== undefined ? (
                <div className='row'>
                    <div className="mb-12">
                        <Tabs
                            id="uncontrolled-tab-example"
                            activeKey={tab}
                            onSelect={(k) => setTab(k)}
                            className="mb-3"
                        >
                            <Tab eventKey="world" title="Hello World">
                                Hello World App
                                <br />
                                <button disabled={loading} className='btn btn-success' type="submit" onClick={() => { paySubscription('individual') }}>
                                    Individual
                                </button>
                                &nbsp;&nbsp;
                                <button disabled={loading} className='btn btn-success' type="submit" onClick={() => { paySubscription('group') }}>
                                    Group
                                </button>
                                &nbsp;&nbsp;
                                <button disabled={loading} className='btn btn-success' type="submit" onClick={() => { paySubscription('business') }}>
                                    Business
                                </button>
                            </Tab>
                            <Tab eventKey="universe" title="Hello Universe">
                                Hello Universe App
                                <br />
                                <button disabled={loading} className='btn btn-success' type="submit" onClick={() => { paySubscription('individual') }}>
                                    Individual
                                </button>
                                &nbsp;&nbsp;
                                <button disabled={loading} className='btn btn-success' type="submit" onClick={() => { paySubscription('group') }}>
                                    Group
                                </button>
                                &nbsp;&nbsp;
                                <button disabled={loading} className='btn btn-success' type="submit" onClick={() => { paySubscription('business') }}>
                                    Business
                                </button>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            ) : 'Please login first'}
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import usePay from '../../hooks/usePay';
import useStripe from '../../hooks/useStripe';
import useUser from '../../hooks/useUser';

export default function HelloWorld() {
    const { user, subscriptions } = useAuth();
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(false);
    const pay = usePay();
    const getStripe = useStripe();
    const getUser = useUser();

    useEffect(() => {
        getUser();
        getStripe();
    }, []);

    useEffect(() => {
        if (subscriptions?.length > 0) {
            subscriptions.forEach(subscription => {
                if (subscription.plan.includes('world')) {
                    setSubscription({...subscription});
                    return;
                }
            });
        }
    }, [subscriptions]);

    const showSubscription = () => {
        if (subscription) {
            if (user?.email) {
                const date = new Date(subscription.start_date * 1000).toDateString();
                return (
                    <div className='row'>
                        <p>User Id: {user?.id}</p>
                        <p>Email: {user?.email}</p>
                        <p>Subscription Status: {'Active'}</p>
                        <p>App: <b>{'Hello World'}</b></p>
                        <p>Date of subscription: {date}</p>
                    </div>
                );
            }
        }

        return (<h2>Please login first</h2>);
    }
    
    return (
        <div className='container mt-3'>
            {subscription ? (
                showSubscription()
            ) : user?.email ? (
                    <div className='row'>
                        <h4>Hello World</h4>
                        <h5>Please subscribe to Hello World App</h5>
                        <hr />
                        <div className='col-lg-4 col-md-4 col-sm-12'>
                            <div style={{textAlign: "center"}}>
                                <h4>Individual</h4>
                                <h4 className='mt-3'>10$</h4>
                                <button disabled={loading} className='btn btn-success mt-3' type="submit"
                                    onClick={() => {
                                        pay('individual', 'world');
                                        setLoading(true);
                                    }}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-12'>
                            <div style={{textAlign: "center"}}>
                                <h4>Group</h4>
                                <h4 className='mt-3'>20$</h4>
                                <button disabled={loading} className='btn btn-success mt-3' type="submit"
                                    onClick={() => {
                                        pay('group', 'world');
                                        setLoading(true);
                                    }}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4 col-sm-12'>
                            <div style={{textAlign: "center"}}>
                                <h4>Business</h4>
                                <h4 className='mt-3'>30$</h4>
                                <button disabled={loading} className='btn btn-success mt-3' type="submit"
                                    onClick={() => {
                                        pay('business', 'world');
                                        setLoading(true);
                                    }}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (<h2>Please login first</h2>)
            }
        </div>
    )
}
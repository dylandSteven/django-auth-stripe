import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'

export default function Success() {
    const { user } = useAuth()
    const [subType, setSubType] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setSubType(params?.get('subType') || '');
    }, []);
    
    return (
        <div>
            {user?.email !== undefined ? (
                <h3 className='mt-3 text-success'>&nbsp;&nbsp;{user.email} is successfully subscribed <b>{subType}</b></h3>
            ) : 'An error occured. Plesae ask to your administrator.'}
        </div>
    )
}
"use client"
import React, { useEffect, useState } from 'react'
import { getSingleProperty } from '@/utils/requests';
import { useParams } from 'next/navigation';


const PropertyPage = () => {
    const [loading, setLoading] = useState(true);
    const [property, setProperty] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchProperty = async () => {
            if (!id) return;
            try {
                const property = await getSingleProperty(id);
                setProperty(property);
            } catch (error) {
                console.error('Error fetching property:', error);
            } finally {
                setLoading(false);
            }
        }
        if (property === null) fetchProperty();
    }, [id, property])


    return (
        <div>
            {loading && <div>Loading...</div>}
            {!loading && <div>{property?.name}</div>}

        </div>
    )
}

export default PropertyPage
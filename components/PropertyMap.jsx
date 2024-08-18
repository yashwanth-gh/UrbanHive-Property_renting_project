"use client";

import { useState, useEffect, useRef } from "react";
import MiniSpinner from "./MiniSpinner";
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";

const PropertyMap = ({ property }) => {
    const [coordinates, setCoordinates] = useState({
        latitude: 12.971599,
        longitude: 77.594566,
    });
    const [loading, setLoading] = useState(true);
    const [geocodeError, setGeocodeError] = useState(false);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const zoom = 15;

    maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || null;

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const { street, city, state } = property.location;
                const address = `${street}, ${city}, ${state}`;
                const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_GEOCODE_API_KEY || null;
                const response = await fetch(
                    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`
                );

                const data = await response.json();

                if (data.results.length > 0) {
                    const { lat, lng } = data.results[0].geometry;
                    setCoordinates({ latitude: lat, longitude: lng });
                } else {
                    setGeocodeError(true);
                }
            } catch (error) {
                console.error("Geocoding error:", error);
                setGeocodeError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchCoordinates();
    }, [property.location]);

    useEffect(() => {
        if (map.current || !mapContainer.current) return;

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
            center: [coordinates.longitude, coordinates.latitude],
            zoom,
            fullscreenControl: true
        });

        new maptilersdk.Marker({ color: "#000" })
            .setLngLat([coordinates.longitude, coordinates.latitude])
            .addTo(map.current);
    }, [mapContainer.current, coordinates]);

    if (loading) {
        return (
            <div className="min-h-[280px] flex flex-col justify-center items-center ">
                <MiniSpinner size={60} />
                <p className="text-center mt-2 text-primary text-lg font-semibold">Loading Map...</p>
            </div>
        );
    }

    if (geocodeError) {
        return <div className="text-destructive font-semibold">Sorry, unable to load map. Please check the address..😔</div>;
    }

    return (
        <div className="map-wrap max-h-[280px] md:max-h-[320px">
            <div ref={mapContainer} className="map" style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default PropertyMap;

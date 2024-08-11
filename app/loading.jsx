"use client"
import React from 'react'
import PuffLoader from "react-spinners/PuffLoader";

const override = {
    display: "block",
    margin: "150px auto 90vh",
};

const LoadingPage = ({ loading }) => {
    return (
        <PuffLoader
            color={'#18918b'}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
        />
    )
}

export default LoadingPage
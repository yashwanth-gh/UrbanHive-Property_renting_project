"use client"
import React from 'react'
import PuffLoader from "react-spinners/PuffLoader";

const override = {
    display: "block",
    margin: "140px auto",
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
"use client"
import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "140px auto",
};

const LoadingPage = ({ loading }) => {
    return (
        <ClipLoader
            color={'#18918b'}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
        />
    )
}

export default LoadingPage
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
    return (
        <section className=" min-h-screen flex-grow">
            <div className="container m-auto max-w-2xl py-20">
                <div
                    className="bg-white px-6 py-8 mb-4 m-4 md:m-0"
                >
                    <div className="flex justify-center">
                        {/* <FaExclamationCircle className='text-destructive text-6xl' /> */}
                        <Image
                            src={'/images/404img1.svg'}
                            width={0}
                            height={0}
                            sizes='100vw'
                            className='w-96 h-auto' />
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mt-4 mb-2">Page Not Found</h1>
                        <p className="text-gray-500 text-xl mb-10">
                            The page you are looking for does not exist.
                        </p>
                        <Link
                            href="/"
                            className="bg-primary hover:opacity-70 text-white font-bold py-2 md:py-4 px-4 md:px-6 rounded"
                        >Go Home</Link
                        >
                    </div>
                </div>
            </div>
            <div className="flex-grow"></div>
        </section>
    )
}

export default NotFoundPage
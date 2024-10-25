import React from 'react'
import '@/assets/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'
import { Flip, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UnreadMessageProvider } from '@/context/unreadMessageContext'
import 'photoswipe/dist/photoswipe.css'

export const metadata = {
    title: 'UrbanHive | Discover Your Hive, Where Dreams Thrive',
    description: 'Find your dream rental property',
    keywords: 'rental, property,office space, search, find, home, find rentals, find properties, affordable home',
}

const MainLayout = ({ children }) => {
    return (
        <AuthProvider>
            <UnreadMessageProvider>
                <html lang='en'>
                    <head>
                        <link rel="icon" href="/favicon.png" />
                        <link rel="preconnect" href="https://fonts.googleapis.com" />
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
                        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
                        <link rel="preconnect" href="https://fonts.googleapis.com"/>
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=''/>
                        <link href="https://fonts.googleapis.com/css2?family=Playwrite+GB+S:ital,wght@0,100..400;1,100..400&display=swap" rel="stylesheet" />
                            </head>
                            <body>
                                <Navbar />
                                <div>{children}</div>
                                <Footer />
                                <ToastContainer
                                    position="top-center"
                                    autoClose={5000}
                                    theme="colored"
                                    transition={Flip} />
                            </body>
                        </html>
                    </UnreadMessageProvider>
                </AuthProvider>
                )
}

                export default MainLayout
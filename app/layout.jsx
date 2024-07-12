import React from 'react'
import '@/assets/styles/globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
    title: 'UrbanHive | Discover Your Hive, Where Dreams Thrive',
    description: 'Find your dream rental property',
    keywords: 'rental, property,office space, search, find, home, find rentals, find properties, affordable home',
}

const MainLayout = ({ children }) => {
    return (
        <html lang='en'>
            <head>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
            </head>
            <body className='bg-background text-foreground'>
                <Navbar />
                <div>{children}</div>
            </body>
        </html>
    )
}

export default MainLayout
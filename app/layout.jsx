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
            </head>
            <body className='bg-background text-foreground'>
                <Navbar />
                <div>{children}</div>
            </body>
        </html>
    )
}

export default MainLayout
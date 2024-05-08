import React from 'react'
import '@/assets/styles/globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
    title: 'UrbanHive | Together, at Home!',
    description: 'Find your dream rental property',
    keywords: 'rental, property, search, find, home, find rentals, find properties, affordable home',
}

const MainLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <Navbar />
                <div>{children}</div>
            </body>
        </html>
    )
}

export default MainLayout
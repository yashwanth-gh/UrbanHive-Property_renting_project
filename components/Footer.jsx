import React from 'react';
import { FaFacebook, FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';
import logo from '@/assets/images/urbanhive-logo-black-transparent.png'
import Image from 'next/image';
import Link from 'next/link';
const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-secondary py-4 mt-auto">
            <div className="container mx-auto flex-col items-start justify-center px-4">
                <div className="flex flex-wrap justify-center items-center mb-6 md:mb-8 text-sm font-medium">
                    <ul className="flex flex-col md:flex-row justify-center items-center gap-1 md:gap-4 lg:gap-8">
                        <li className="pb-0.5 hover:border-b-2 hover:pb-0 hover:border-foreground transition-all duration-100 ease-in"><Link href="/properties">Properties</Link></li>
                        <li className="pb-0.5 hover:border-b-2 hover:pb-0 hover:border-foreground transition-all duration-100 ease-in"><Link href="/terms">Terms of Service</Link></li>
                        <li className="pb-0.5 hover:border-b-2 hover:pb-0 hover:border-foreground transition-all duration-100 ease-in"><Link href="/about">About Us</Link></li>
                        <li className="pb-0.5 hover:border-b-2 hover:pb-0 hover:border-foreground transition-all duration-100 ease-in"><Link href="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="mb-6 md:mb-2">
                    <div className="flex justify-center gap-6 md:gap-10">
                        <Link href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className='text-2xl' />
                        </Link>
                        <Link href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                            <FaTwitterSquare className='text-2xl' />
                        </Link>
                        <Link href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                            <FaInstagramSquare className='text-2xl' />
                        </Link>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row justify-between items-center '>
                    <div className="mb-4 md:mb-0">
                        <Image src={logo} className="h-8 w-auto" alt="Logo" priority />
                    </div>
                    <div className="mt-4 md:mt-0">
                        <p className="text-sm text-gray-500">
                            &copy; {year} UrbanHive. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

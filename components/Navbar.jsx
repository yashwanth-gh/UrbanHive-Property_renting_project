"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import UrbanHive_transparent_logo from '@/assets/images/urbanhive-logo-black-transparent.png'
import hamburger from '@/assets/images/hamburger.png'
import Link from 'next/link'
import { FaGoogle, FaRegBell, FaRegUser } from 'react-icons/fa';
import { usePathname } from 'next/navigation'


const Navbar = () => {
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isProfileDropdownActive, setIsProfileDropdownActive] = useState(false);
    const pathname = usePathname();
    return (
        <nav className='topbar'>
            <div className='flex justify-start gap-6 lg:w-auto '>
                {/* hamburger menu for mobile */}
                <div className='lg:hidden flex justify-center items-center cursor-pointer'
                    onClick={() => setIsMenuActive(prev => !prev)}
                >
                    <Image
                        src={hamburger}
                        className='h-5 w-5'
                        alt='menu'
                    />
                </div>
                <div className=''>
                    {/* logo */}
                    <Link href="/">
                        <Image
                            src={UrbanHive_transparent_logo}
                            className='h-7 lg:h-10 w-auto'
                            alt='logo'
                            priority
                        />
                    </Link>
                </div>
            </div>
            <div className="md:ml-6 lg:flex gap-8">
                {/* navs */}
                <div className=" hidden lg:flex space-x-2 text-md font-semibold text-foreground">
                    <Link
                        href="/"
                        className={`${pathname === "/" ? 'text-primary' : ''} hover:text-primary px-3 py-2`}
                    >Home</Link>
                    <Link
                        href="/about"
                        className={`${pathname === "/about" ? 'text-primary' : ''} hover:text-primary px-3 py-2`}
                    >About</Link
                    >
                    <Link
                        href="/properties"
                        className={`${pathname === "/properties" ? 'text-primary' : ''} hover:text-primary px-3 py-2`}
                    >Properties</Link
                    >
                    {isLoggedIn && (<Link
                        href="/property/add"
                        className={`${pathname === "/property/add" ? 'text-primary' : ''} hover:text-primary px-3 py-2`}
                    >Add Property</Link
                    >)}
                </div>

                <div className='flex justify-center items-center text-sm font-semibold'>
                    {(!isLoggedIn) ? (
                        //^ login/signup if user is NOT logged in
                        <div className='rounded-full px-2.5 py-1.5 hover:shadow-lg text-primary-foreground bg-primary'>
                            <Link href="/profile" className='flex justify-center items-center'>
                                {/* <Image
                                className='h-4 w-4'
                                src={person}
                            /> */}
                                <FaGoogle />
                                <span className='lg:px-1 lg:pl-2 pl-1.5'>Login / Signup</span>
                            </Link>

                        </div>
                    ) : (
                        //^ profile andf notification if user is logged in
                        <div className='flex gap-4'>
                            <div className='relative rounded-full'>
                                {/* notification bell */}
                                <Link href="/messages">
                                    {/* <Image
                                    className='h-8 w-8 rounded-full'
                                    src={bell}
                                /> */}
                                    <FaRegBell className='h-8 w-8 text-foreground' />
                                    <span className='absolute top-0 right-0 bg-red-500 rounded-full px-1.5 -my-2 -mx-1 text-primary-foreground'>2</span>
                                </Link>
                            </div>

                            <div className="relative ml-3">
                                <div>
                                    <button
                                        type="button"
                                        className="relative flex rounded-full text-sm focus:outline-none    "
                                        id="user-menu-button"
                                        aria-expanded="false"
                                        aria-haspopup="true"
                                        onClick={() => setIsProfileDropdownActive(prev => !prev)}
                                    >
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Open user menu</span>
                                        {/* <Image
                                        className="h-8 w-8 px-1 py-1 border-2 border-foreground rounded-full"
                                        src={person}
                                        alt=""
                                    /> */}
                                        <FaRegUser className='h-7 w-7 text-foreground' />
                                    </button>
                                </div>

                                {/* <!-- Profile dropdown --> */}
                                {isProfileDropdownActive && (
                                    <div
                                        id="user-menu"
                                        className=" absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-input py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="user-menu-button"
                                        tabIndex="-1"
                                    >
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-foreground hover:text-primary"
                                            role="menuitem"
                                            tabIndex="-1"
                                            id="user-menu-item-0"
                                        >Your Profile</Link
                                        >
                                        <Link
                                            href="/properties/saved"
                                            className="block px-4 py-2 text-sm text-foreground hover:text-primary"
                                            role="menuitem"
                                            tabIndex="-1"
                                            id="user-menu-item-2"
                                        >Saved Properties</Link
                                        >
                                        <Link
                                            href="#"
                                            className="block px-4 py-2 text-sm text-foreground hover:text-primary"
                                            role="menuitem"
                                            tabIndex="-1"
                                            id="user-menu-item-2"
                                        >Sign Out</Link
                                        >
                                    </div>
                                )}
                            </div>

                        </div>
                    )}

                </div>

            </div>

            {/*// ^--------------------MOBILE MENU--------------------------*/}
            <div className={`lg:hidden absolute top-full left-0 right-0 bg-background transition-transform duration-150 ease-in-out ${isMenuActive ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`} id="mobile-menu">
                <div className="flex flex-col bg-white shadow-lg ">
                    <Link
                        href="/"
                        className={`${pathname === "/" ? 'bg-primary text-white' : ''}  block px-3 py-2 text-base font-medium`}
                    >Home</Link>
                    <Link
                        href="/about"
                        className={`${pathname === "/about" ? 'bg-primary text-white' : ''} active:bg-muted-foreground block px-3 py-2 text-base font-medium`}
                    >About</Link>
                    <Link
                        href="/properties"
                        className={`${pathname === "/properties" ? 'bg-primary text-white' : ''} active:bg-muted-foreground block px-3 py-2 text-base font-medium`}
                    >Properties</Link>
                    {isLoggedIn && (<Link
                        href="/property/add"
                        className={`${pathname === "/property/add" ? 'bg-primary text-white' : ''} active:bg-muted-foreground block px-3 py-2 text-base font-medium`}
                    >Add Property</Link>)}
                    {/*                     <button
                        className="flex justify-center items-center bg-primary text-primary-foreground font-semibold active:shadow-lg rounded-full px-2 py-1 my-4 mx-2"
                    >
                        <FaGoogle className='mr-2' />
                        <span>Login or Register</span>
                    </button> */}
                </div>
            </div>
            {/*// ^--------------------MOBILE MENU--------------------------*/}


        </nav >
    )
}
export default Navbar;
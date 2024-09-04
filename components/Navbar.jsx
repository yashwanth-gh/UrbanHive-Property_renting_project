"use client"

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import UrbanHive_transparent_logo from '@/assets/images/urbanhive-logo-black-transparent.png'
import hamburger from '@/assets/images/hamburger.png'
import Link from 'next/link'
import { FaGoogle, FaRegEnvelope, FaRegUser } from 'react-icons/fa';
import { usePathname } from 'next/navigation'
import { signIn, signOut, getProviders, useSession } from 'next-auth/react';
import UnreadMsgCount from '@/components/UnreadMsgCount'

const Navbar = () => {
    const { data: session } = useSession()
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [providers, setProviders] = useState(null);
    const [isProfileDropdownActive, setIsProfileDropdownActive] = useState(false);
    const pathname = usePathname();
    const googleProfileImage = session?.user?.image;

    // Create a ref for the dropdown menu
    const dropdownRef = useRef(null);
    const mobileDropdownRef = useRef(null); // Mobile dropdown ref
    const hamburgerRef = useRef(null);
    const profilePicRef = useRef(null);

    useEffect(() => {
        const setAuthProvider = async () => {
            const res = await getProviders();
            setProviders(res);
        }


        setAuthProvider();
    }, [])

    // Collapse dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                profilePicRef.current && !profilePicRef.current.contains(event.target)) {
                setIsProfileDropdownActive(false);
            }
            if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target) &&
                hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
                setIsMenuActive(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <nav className='topbar'>
            <div className='flex justify-start gap-6 lg:w-auto '>
                {/* hamburger menu for mobile */}
                <div className='lg:hidden flex justify-center items-center cursor-pointer'
                    onClick={() => setIsMenuActive(prev => !prev)}
                    ref={hamburgerRef}
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
                    {session && (<Link
                        href="/properties/add"
                        className={`${pathname === "/property/add" ? 'text-primary' : ''} hover:text-primary px-3 py-2`}
                    >Add Property</Link
                    >)}
                </div>

                <div className='flex justify-center items-center text-sm font-semibold'>
                    {(!session) ? (
                        //^ login/signup if user is NOT logged in
                        <div className='rounded-full px-2.5 py-1.5 hover:shadow-lg text-primary-foreground bg-primary'>
                            {providers ? (Object.values(providers).map((provider, index) => (
                                <button className='flex justify-center items-center' key={index}
                                    onClick={() => signIn(provider.id)}>
                                    <FaGoogle />
                                    <span className='lg:px-1 lg:pl-2 pl-1.5'>Login / Signup</span>
                                </button>
                            ))) : (
                                <span className='animate-pulse'>Loading...</span>
                            )
                            }
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
                                    <FaRegEnvelope className='h-8 w-8 text-foreground' />
                                    <UnreadMsgCount />
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
                                        ref={profilePicRef}
                                    >
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Open user menu</span>
                                        {googleProfileImage ? (
                                            <Image
                                                className="h-8 w-8 rounded-full"
                                                src={googleProfileImage}
                                                alt="user"
                                                width={40}
                                                height={40}
                                            />
                                        ) : (
                                            <FaRegUser className='h-7 w-7 text-foreground' />
                                        )}

                                    </button>
                                </div>

                                {/* <!-- Profile dropdown --> */}
                                {isProfileDropdownActive && (
                                    <div
                                        id="user-menu"
                                        ref={dropdownRef} // Attach ref here
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
                                            onClick={() => {
                                                setIsProfileDropdownActive(false);
                                            }}
                                        >Your Profile</Link
                                        >
                                        <Link
                                            href="/properties/saved"
                                            className="block px-4 py-2 text-sm text-foreground hover:text-primary"
                                            role="menuitem"
                                            tabIndex="-1"
                                            id="user-menu-item-2"
                                            onClick={() => {
                                                setIsProfileDropdownActive(false);
                                            }}
                                        >Saved Properties</Link
                                        >
                                        <Link
                                            href="#"
                                            className="block px-4 py-2 text-sm text-foreground hover:text-primary"
                                            role="menuitem"
                                            tabIndex="-1"
                                            id="user-menu-item-2"
                                            onClick={() => {
                                                setIsProfileDropdownActive(false);
                                                signOut();
                                            }}
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
            <div className={`lg:hidden absolute top-full left-0 right-0 bg-background transition-transform duration-150 ease-in-out ${isMenuActive ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`} id="mobile-menu" ref={mobileDropdownRef}>
                <div className="flex flex-col bg-white shadow-lg ">
                    <Link
                        href="/"
                        className={`${pathname === "/" ? 'bg-primary text-white' : ''}  block px-3 py-2 text-base font-medium`}
                        onClick={() => { setIsMenuActive(false) }}
                    >Home</Link>
                    <Link
                        href="/about"
                        className={`${pathname === "/about" ? 'bg-primary text-white' : ''} active:bg-muted-foreground block px-3 py-2 text-base font-medium`}
                        onClick={() => { setIsMenuActive(false) }}
                    >About</Link>
                    <Link
                        href="/properties"
                        className={`${pathname === "/properties" ? 'bg-primary text-white' : ''} active:bg-muted-foreground block px-3 py-2 text-base font-medium`}
                        onClick={() => { setIsMenuActive(false) }}
                    >Properties</Link>
                    {session && (<Link
                        href="/properties/add"
                        className={`${pathname === "/property/add" ? 'bg-primary text-white' : ''} active:bg-muted-foreground block px-3 py-2 text-base font-medium`}
                        onClick={() => { setIsMenuActive(false) }}
                    >Add Property</Link>)}
                </div>
            </div>
            {/*// ^--------------------MOBILE MENU--------------------------*/}


        </nav >
    )
}
export default Navbar;
"use client"
import { useUnreadMessageContext } from '@/context/unreadMessageContext'
import React from 'react'

const UnreadMsgCount = () => {
    const { unreadMessages } = useUnreadMessageContext();
    return (
        unreadMessages > 0 && <span className='absolute top-0 -right-1 bg-red-500 rounded-md px-1.5 -my-2 -mx-1 text-primary-foreground'>{unreadMessages}</span>
    )
}

export default UnreadMsgCount
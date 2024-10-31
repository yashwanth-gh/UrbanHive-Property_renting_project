import React, { useEffect, useState, useCallback } from 'react';
import { TbBookmark  } from 'react-icons/tb';
import MiniSpinner from './MiniSpinner';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import addBookmark from '@/app/actions/addBookmark';
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus';

const BookmarkButton = ({ property }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const userId = session?.user?.id;

    const checkBookmarkStatusEffect = useCallback(async () => {
        if (!userId) {
            return;
        }


        setLoading(true);
        try {
            const bookmarked = await checkBookmarkStatus(property?._id);
            setIsBookmarked(bookmarked);
        } catch (error) {
            toast.error("Failed to check bookmark status.");
        } finally {
            setLoading(false);
        }
    }, [userId, property]);

    useEffect(() => {
        checkBookmarkStatusEffect();
    }, [checkBookmarkStatusEffect]);

    const handleClick = async () => {
        if (!userId) {
            toast.error("Please login to bookmark the property!");
            return;
        }

        setLoading(true);
        try {
            const res = await addBookmark(property?._id);
            if (res.success) {
                setIsBookmarked(res.isBookmarked);
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Failed to bookmark the property.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            className={`${isBookmarked ? 'bg-destructive' : 'bg-[#75a842]'} hover:opacity-90 text-white font-bold w-full py-2 px-4 rounded-md hover:rounded-xl flex items-center justify-center`}
            disabled={loading}
            onClick={handleClick}
        >
            {loading ? (
                <>
                    <MiniSpinner color="#fff" size={20} />
                    &nbsp;&nbsp;Loading...
                </>
            ) : (
                <>
                    <TbBookmark  className="mr-1" />
                    {isBookmarked ? 'Remove Bookmark' : 'Bookmark Property'}
                </>
            )}
        </button>
    );
};

export default BookmarkButton;

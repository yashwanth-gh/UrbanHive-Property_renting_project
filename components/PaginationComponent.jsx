"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { TbArrowsLeft  ,TbArrowLeft, TbArrowsRight,TbArrowRight  } from "react-icons/tb";

const PaginationComponent = ({ page, pageSize, totalItems }) => {
    const totalPages = Math.ceil(totalItems / pageSize);
    const router = useRouter();

    const handlePageChange = (newPage) => {
        const queryParam = `?page=${newPage}&pageSize=${pageSize}`;
        router.push(`/properties${queryParam}`);
    };

    const handlePrevious = () => {
        if (page > 1) {
            handlePageChange(page - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            handlePageChange(page + 1);
        }
    };

    const renderPageButtons = () => {
        const buttons = [];

        // Show previous page button
        if (page > 1) {
            buttons.push(
                <button key={page - 1} onClick={() => handlePageChange(page - 1)} className="pagination-button py-2 px-3 bg-gray-200 rounded-lg hover:bg-gray-300">
                    {page - 1}
                </button>
            );
        }

        // Show current page button
        buttons.push(
            <button key={page} className="pagination-button py-2 px-3 bg-foreground text-primary-foreground rounded-lg">
                {page}
            </button>
        );

        // Show next page button
        if (page < totalPages) {
            buttons.push(
                <button key={page + 1} onClick={() => handlePageChange(page + 1)} className="pagination-button py-2 px-3 bg-gray-200 rounded-lg hover:bg-gray-300">
                    {page + 1}
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className="pagination flex items-center space-x-4">
            <button
                onClick={() => handlePageChange(1)} // Go to first page
                disabled={page === 1}
                className={`pagination-button ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''} py-2 px-4 bg-gray-300 rounded-lg w-full h-full`}
                title='First Page'
            >
                <TbArrowsLeft  className='text-xl' />
            </button>

            <button
                onClick={handlePrevious}
                disabled={page === 1}
                className={`pagination-button ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''} py-2 px-4 bg-gray-300 rounded-lg w-full h-full`}
                title='Previous Page'
            >
                <TbArrowLeft   className='text-xl' />
            </button>

            {renderPageButtons()}

            <button
                onClick={handleNext}
                disabled={page === totalPages}
                className={`pagination-button ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''} py-2 px-4 bg-gray-300 rounded-lg w-full h-full`}
                title='Next Page'
            >
                <TbArrowRight className='text-xl' />
            </button>

            <button
                onClick={() => handlePageChange(totalPages)} // Go to last page
                disabled={page === totalPages}
                className={`pagination-button ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''} py-2 px-4 bg-gray-300 rounded-lg w-full h-full`}
                title='Last Page'
            >
                <TbArrowsRight className='text-xl' />
            </button>
        </div>
    );
};

export default PaginationComponent;

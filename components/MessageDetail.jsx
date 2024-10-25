"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { TbSunglasses,TbTrash,TbArrowBackUp   } from "react-icons/tb";

import markMessageAsRead from "@/app/actions/markMessageAsRead";
import deleteMessage from "@/app/actions/deleteMessage"; // Import deleteMessage action
import { toast } from "react-toastify";
import MiniSpinner from "@/components/MiniSpinner"; // Assuming you have a MiniSpinner component
import { useUnreadMessageContext } from "@/context/unreadMessageContext";

const MessageDetail = ({ message, onBack }) => {
    const [isRead, setIsRead] = useState(message?.read);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { setUnreadMessages } = useUnreadMessageContext();

    useEffect(() => {
        setIsRead(message?.read);
    }, [message]);

    const handleReadClick = async () => {
        const read = await markMessageAsRead(message?._id);
        setIsRead(read.read);
        setUnreadMessages((prev) => read.read ? prev - 1 : prev + 1);
        toast.success(read.message);
    };

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        const result = await deleteMessage(message?._id);

        setIsDeleting(false);
        setShowModal(false);

        if (result.success) {
            setUnreadMessages((prev) => message?.read ? prev : prev - 1);
            toast.success(result.message);
            // Optionally, navigate away or refresh the page
        } else {
            toast.error(result.message);
        }
    };

    if (!message) {
        return (
            <div className="text-gray-400 w-full self-center text-center text-xl -mt-16">
                Select a Query to view details
            </div>
        );
    }

    return (
        <div className="w-full px-2 h-screen overflow-y-auto relative md:border-l">
            {/* Back Button for Mobile */}
            {onBack && (
                <button
                    className="text-primary-foreground bg-primary px-3 py-1 mb-4 rounded-md active:bg-opacity-75"
                    onClick={onBack}
                >
                    <TbArrowBackUp  className="inline mr-2" />
                    Back
                </button>
            )}
            <div className="bg-gray-200 border p-2 rounded-md">
                <h3 className="text-xl font-bold mb-2">{message.sender?.username || "Deleted User"}</h3>
                <p className="text-sm text-gray-500">
                    {format(new Date(message.createdAt), "MMM dd, yyyy hh:mm a")}
                </p>
            </div>
            <div className="my-2 text-sm">
                <p className="font-semibold">Sender Query :</p>
            </div>
            <p className="mb-4 min-h-40 ml-2">{message.body}</p>
            <div className="py-3 text-sm border-b-2 border-foreground">
                <h4>Sender details </h4>
                <div>
                    <strong>Name </strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;{message.name}
                </div>
                <div>
                    <strong>Email </strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;
                    <a href={`mailto:${message.email}`} className="text-blue-600 underline">
                        {message.email}
                    </a>
                </div>
                <div>
                    <strong>Phone </strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;
                    <a href={`tel:${message.phone}`} className="text-blue-600 underline">
                        {message.phone}
                    </a>
                </div>
                <div>
                    <strong>Property </strong>&nbsp;: {message.property?.name || "deleted property"}
                </div>
            </div>
            <div className="p-4 flex flex-col gap-2 w-4/5 mx-auto mt-2">
                <h4 className="mb-1">More options:</h4>
                <button
                    className="bg-foreground text-primary-foreground px-2 py-2 rounded-md hover:opacity-80"
                    onClick={handleReadClick}
                >
                    <TbSunglasses className="inline mr-3 text-md" />
                    {isRead ? "Mark as Unread" : "Mark as Read"}
                </button>
                <button
                    className="bg-primary text-primary-foreground px-2 py-2 rounded-md hover:bg-red-500"
                    onClick={handleDeleteClick}
                >
                    {isDeleting ? <MiniSpinner /> : <TbTrash  className="inline mr-3 text-md" />}
                    Delete Query
                </button>
            </div>

            {/* Delete Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-md w-4/5 md:w-1/3">
                        <h4 className="text-xl font-semibold mb-4">Confirm Delete</h4>
                        <p className="mb-4">
                            Are you sure you want to delete this message? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-gray-300 text-black px-4 py-2 rounded-md"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                onClick={handleConfirmDelete}
                            >
                                {isDeleting ? <MiniSpinner /> : "Confirm Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageDetail;

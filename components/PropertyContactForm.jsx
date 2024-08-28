"use client"
import addMessage from "@/app/actions/addMessage";
import { useSession } from "next-auth/react";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import messageSent from '@/public/images/message_sent.png';
import ContactFormButton from "./ContactFormButton";

const PropertyContactForm = ({ property }) => {
    const { data: session } = useSession();
    const [state, formAction] = useFormState(addMessage, {});

    useEffect(() => {
        if (state.success) {
            toast.success(state?.message);
        } else if (state.message) {
            toast.error(state?.message);
        }
    }, [state]);

    if (!session) {
        return null; // Return null or an alternative UI when there's no session
    }

    if (state && state.success) {
        return (
            <div className="bg-primary-foreground p-2 rounded-lg shadow-md flex flex-col items-center justify-center">
                <Image
                    src={messageSent}
                    alt='message-Sent'
                    className='w-3/4 h-auto'
                />
                <p className="text-md font-bold mb-6 text-primary">Message Sent Successfully</p>
            </div>
        )
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
            <form action={formAction}>
                <input
                    type="hidden"
                    id="property"
                    name="property"
                    defaultValue={property?._id}
                />

                <input
                    type="hidden"
                    id="recipient"
                    name="recipient"
                    defaultValue={property?.owner}
                />

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                    >
                        Name:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="phone"
                    >
                        Phone:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder="Enter your phone number"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="body"
                    >
                        Message:
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                        id="body"
                        name="body"
                        placeholder="Enter your message"
                    ></textarea>
                </div>
                <ContactFormButton />
            </form>
        </div>
    );
};

export default PropertyContactForm;

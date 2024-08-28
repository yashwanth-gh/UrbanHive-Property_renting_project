import { FaPaperPlane } from "react-icons/fa";
import { useFormStatus } from "react-dom";

const ContactFormButton = () => {
    //get form states from useFormStatus hook
    const { pending } = useFormStatus();

    return (
        <div>
            <button
                className="bg-primary hover:bg-foreground transition-all duration-150 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                type="submit"
            >
                <FaPaperPlane className="mr-3" /> {" "}
                {pending ? "Sending..." : "Send Message"}
            </button>
        </div>
    )
}

export default ContactFormButton
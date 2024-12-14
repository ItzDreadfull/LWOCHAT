/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


export interface ConversationType {
    // Define the actual shape of a conversation object
    _id: string;
    createdAt: string;
    profilePic: string;
    updatedAt: string;
    fullname: string;
}

interface ConversationsResponse {
    success: boolean;
    message: ConversationType[] | string | any;
}



const useGetConversations = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState<ConversationsResponse | null>(null);

    useEffect(() => {
        const getConversations = async () => {

            setLoading(true)

            try {
                const res = await fetch('/api/users');
                const data = await res.json();

                if (data.success === false) {
                    throw new Error(data.message);
                }
                // console.log("here", data.message)
                setConversations(data)

            } catch (error: any) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        getConversations();
    }, []);

    return { loading, conversations }

}

export default useGetConversations

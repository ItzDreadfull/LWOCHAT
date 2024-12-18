/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/messages/${selectedConversation?._id}`);

                const data = await res.json();

                if (data.success === false) throw new Error(data.message)

                // console.log(data.message)
                setMessages(data.message)

            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false)
            }
        }
        if (selectedConversation?._id) {
            getMessages();
        }

    }, [selectedConversation?._id, setMessages])

    return { messages, loading }

}

export default useGetMessages

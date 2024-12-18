/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (msg: string) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/messages/send/${selectedConversation?._id}`, {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify({ msg })
            })

            const data = await res.json();
            if (data.success === false) throw new Error(data.message)

            // console.log(data);

            setMessages([...messages, data.message])

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }
    return { sendMessage, loading }
}

export default useSendMessage

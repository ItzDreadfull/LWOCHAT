import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContex";
import useConversation, { msgResponseType } from "../zustand/useConversation";

import notificationSound from "../assets/sounds/nofi_sound.mp3"


const useListenMessages = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversation()

    useEffect(() => {
        if (!socket) return;

        const handleNewMessages = (newMessages: msgResponseType) => {
            newMessages.shouldShake = true;
            const sound: HTMLAudioElement = new Audio(notificationSound);
            sound.play();

            setMessages([...messages, newMessages]);
        };
        socket.on("newMessage", handleNewMessages);


        // Cleanup function
        return () => {
            socket.off("newMessage");
        };
    }, [socket, setMessages, messages])


}
export default useListenMessages;
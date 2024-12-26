import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContex";
import useConversation, { msgResponseType } from "../zustand/useConversation";

import notificationSound from "../assets/sounds/nofi_sound.mp3"


const useListenMessages = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversation()
    const sound: HTMLAudioElement = new Audio(notificationSound);

    useEffect(() => {
        if (!socket) return;

        socket.on("newMessage", (newMessages: msgResponseType) => {
            newMessages.shouldShake = true;
            sound.play();

            setMessages([...messages, newMessages]);
        });


        // Cleanup function
        return () => {
            socket.off("newMessage");
        };
    }, [socket, setMessages, messages])


}
export default useListenMessages;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { ConversationType } from '../hooks/useGetConversations';

export interface msgResponseType {
    createdAt: string;
    messageContent: string;
    receiverId: string;
    senderId: string;
    updatedAt: string;
    _id: string;
    profilePic: string;
    shouldShake: boolean;
}


// Define the state and action types
interface ConversationState {
    selectedConversation: ConversationType | null;               // Assuming it's a string or null, adjust if needed
    messages: msgResponseType[];                               // Assuming messages are strings, adjust if needed
    setSelectedConversation: (selectedConversation: ConversationType | null) => void;
    setMessages: (messages: msgResponseType[]) => void;
}

// Create the Zustand store
const useConversation = create<ConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) =>
        set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
}));

export default useConversation;

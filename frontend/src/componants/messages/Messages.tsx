import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import useConversation, {
  msgResponseType,
} from "../../zustand/useConversation";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessage";

const Messages = () => {
  const { selectedConversation } = useConversation();
  const { loading, messages } = useGetMessages();
  useListenMessages();
  const lstMsgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (lstMsgRef.current)
        lstMsgRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  const messagesToShow = messages.filter(
    (msg) => msg.receiverId === selectedConversation?._id
  );
  console.log(messagesToShow);
  return (
    <div className="px-1 flex-1 overflow-auto">
      {!loading &&
        messagesToShow.length > 0 &&
        messagesToShow.map((el: msgResponseType, idx: number) => (
          <div
            key={el._id || idx}
            ref={idx === messagesToShow.length - 1 ? lstMsgRef : null}
          >
            <Message allMsg={el} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the converation</p>
      )}
    </div>
  );
};

export default Messages;

import { useSocketContext } from "../../context/SocketContex";
import { ConversationType } from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";

interface ConPropsTypes {
  conversation: ConversationType;
  emoji: string;
  lastIdx: boolean;
}

const Conversation: React.FC<ConPropsTypes> = ({
  conversation,
  emoji,
  lastIdx,
}) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.some(
    (user) => user.toString() === conversation._id
  );

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer 
        ${isSelected ? "bg-sky-500" : ""}
      `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullname}</p>
            <span className="text-xl ">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1 " />}
    </>
  );
};

export default Conversation;

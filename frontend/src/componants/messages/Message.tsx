import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation, {
  msgResponseType,
} from "../../zustand/useConversation";

interface MsgPropsTypes {
  allMsg: msgResponseType;
}

const Message: React.FC<MsgPropsTypes> = ({ allMsg }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  let formMe;
  if (authUser) {
    formMe = allMsg.senderId === authUser._id;
  }
  const formatedDate = extractTime(allMsg.createdAt);
  const chatClassName = formMe ? "chat-end" : "chat-start";
  const profilePic = formMe
    ? authUser?.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = formMe ? "bg-blue-500" : "";
  const shakeClass = allMsg.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {allMsg.messageContent}
      </div>
      <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center`}>
        {formatedDate}
      </div>
    </div>
  );
};

export default Message;

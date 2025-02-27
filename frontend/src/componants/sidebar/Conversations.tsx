/* eslint-disable @typescript-eslint/no-explicit-any */
import useGetConversations, {
  ConversationType,
} from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emoji";

import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations?.message.map((el: ConversationType, idx: any) => (
        <Conversation
          key={el._id}
          conversation={el}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.message.length - 1}
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner text-info"></span>
      ) : null}
    </div>
  );
};

export default Conversations;

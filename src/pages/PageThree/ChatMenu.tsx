import React from 'react';
import { ChatProps } from './Chat';
import "./Chat.css";

interface ChatMenuProps {
  chats: ChatProps[];
  onItemClick: (chatId: number) => void;
  activeChatId: number | null;
}

const ChatMenu: React.FC<ChatMenuProps> = ({
  chats,
  onItemClick,
  activeChatId,
}) => {
  const handleChatClick = (chatId: number) => {
    onItemClick(chatId);
  };

  return (
    <div>
      <h3>Menú de chats</h3>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => handleChatClick(chat.id)}
            style={{
              fontWeight: activeChatId === chat.id ? 'bold' : 'normal',
            }}
          >
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatMenu;

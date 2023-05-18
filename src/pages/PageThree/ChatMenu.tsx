import React from 'react';

interface ChatMenuProps {
  chats: { id: number; name: string; messages: string[] }[];
}

const ChatMenu: React.FC<ChatMenuProps> = ({ chats }) => {
  return (
    <div>
      <h2>Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>
            <span>{chat.name}</span>
            {/* Mostrar información adicional del chat si es necesario */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatMenu;

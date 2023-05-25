import React, { useState } from 'react';
import { IonList, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonBadge } from '@ionic/react';
import { add, trash } from 'ionicons/icons';
import { ChatProps } from './Chat';
import { formatTime } from './Utils';
import './ChatList.css';

interface ChatListProps {
  chats: ChatProps[];
  onNewChat: (name: string) => void;
  onItemClick: (chatId: number) => void;
  activeChatId: number | null;
  onDeleteChat: (chatId: number) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  onNewChat,
  onItemClick,
  activeChatId,
  onDeleteChat,
}) => {
  const [newChatName, setNewChatName] = useState('');

  const handleNewChat = () => {
    if (newChatName.trim() !== '') {
      onNewChat(newChatName);
      setNewChatName('');
    }
  };

  const handleDeleteChat = (chatId: number) => {
    onDeleteChat(chatId);
  };

  const handleItemClick = (chatId: number) => {
    if (activeChatId !== chatId) {
      onItemClick(chatId);
    }
  };

  return (
    <IonList className="chat-list-container">
      <IonItem className="new-chat-input">
        <IonInput
          placeholder="Nuevo chat"
          value={newChatName}
          onIonChange={(e) => setNewChatName(e.detail.value!)}
        ></IonInput>
        <IonButton fill="clear" slot="end" onClick={handleNewChat}>
          <IonIcon icon={add} />
        </IonButton>
      </IonItem>
      {chats.map((chat) => (
        <IonItem
          key={chat.id}
          button
          onClick={() => handleItemClick(chat.id)}
          className={chat.id === activeChatId ? 'active' : ''}
        >
          <IonLabel className="chat-details">
            <h2>
              <IonBadge className="chat-bubble" color="secondary" />
              {chat.name}
            </h2>
            <p className="date">{formatTime(chat.lastUsed)}</p>
          </IonLabel>
          <IonButton
            fill="clear"
            color="danger"
            className="delete-button"
            onClick={() => handleDeleteChat(chat.id)}
          >
            <IonIcon icon={trash} />
          </IonButton>
        </IonItem>
      ))}
    </IonList>
  );
};

export default ChatList;

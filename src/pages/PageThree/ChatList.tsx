import React, { useState } from 'react';
import { IonButton, IonModal, IonInput } from '@ionic/react';

interface NewChatModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  onCreateChat: (name: string) => void;
}

const NewChatModal: React.FC<NewChatModalProps> = ({
  isOpen,
  onDismiss,
  onCreateChat,
}) => {
  const [chatName, setChatName] = useState('');

  const handleChatNameChange = (e: any) => {
    setChatName(e.detail.value);
  };

  const handleCreateChat = () => {
    onCreateChat(chatName);
    setChatName('');
    onDismiss();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonInput
        placeholder="Nombre del chat"
        value={chatName}
        onIonChange={handleChatNameChange}
      />
      <IonButton onClick={handleCreateChat}>Crear chat</IonButton>
    </IonModal>
  );
};

interface ChatListProps {
  chats: { id: number; name: string; messages: string[] }[];
  onNewChat: (name: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onNewChat }) => {
  const [showNewChatModal, setShowNewChatModal] = useState(false);

  const handleNewChatClick = () => {
    setShowNewChatModal(true);
  };

  const handleNewChatDismiss = () => {
    setShowNewChatModal(false);
  };

  const handleNewChatCreate = (name: string) => {
    onNewChat(name);
  };

  return (
    <>
      <IonButton onClick={handleNewChatClick}>Nuevo chat</IonButton>
      <NewChatModal
        isOpen={showNewChatModal}
        onDismiss={handleNewChatDismiss}
        onCreateChat={handleNewChatCreate}
      />
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>{chat.name}</li>
        ))}
      </ul>
    </>
  );
};

export default ChatList;
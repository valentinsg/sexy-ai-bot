// ChatMessage.tsx
import React from 'react';
import { IonItem, IonLabel, IonAvatar } from '@ionic/react';
import { Message } from './Chat';
import { formatTime, formatDate } from './Utils'; 
import "./Chat.css";

export interface MessageProps {
  message: Message;
}

const ChatMessage: React.FC<MessageProps> = ({ message }) => {
  const { text, sender } = message;
  const senderName = sender === 'user' ? 'Tú' : 'Bot';
  const lastMessageDate = new Date(message.timestamp);
  const currentDate = new Date();
  const showDate = currentDate.getDate() !== lastMessageDate.getDate();

  return (
    <IonItem className="chat-message" >
      {sender === 'bot' && (
        <IonAvatar slot="start">
          <img
            src="https://via.placeholder.com/60"
            alt="Bot Avatar"
          />
        </IonAvatar>
      )}
      <IonLabel>
        <h3>{senderName}</h3>
        <p>{text}</p>
        <p className="timestamp">{formatTime(message.timestamp)}</p>
        {showDate && (
          <p className="date">{formatDate(lastMessageDate)}</p>
        )}
      </IonLabel>
    </IonItem>
  );
};

export default ChatMessage;

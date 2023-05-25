// Chat.tsx
import React, { useState, useEffect } from 'react';
import {
  IonList,
  IonItem,
  IonButton,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
} from '@ionic/react';
import { IonInputCustomEvent, InputChangeEventDetail } from '@ionic/core';
import io from 'socket.io-client';
import { add, send } from 'ionicons/icons';
import ChatList from './ChatList';
import ChatMessage from './ChatMessage';
import "./Chat.css";

export interface Message {
  id: number;
  timestamp: Date;
  text: string;
  sender: 'user' | 'bot';
}

export interface ChatProps {
  id: number;
  name: string;
  messages: Message[];
  lastUsed: Date;
}

const Chat: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState<any>(null);
  const [chats, setChats] = useState<ChatProps[]>([]);
  const [activeChat, setActiveChat] = useState<number | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5173');
    const cachedChats = localStorage.getItem('chats');
    if (cachedChats) {
      setChats(JSON.parse(cachedChats));
    }
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleMessage = (newMessage: Message) => {
      setChats((prevChats) => {
        const updatedChats = prevChats.map((chat) => {
          if (chat.id === activeChat) {
            return {
              ...chat,
              messages: [...chat.messages, newMessage],
            };
          }
          return chat;
        });

        localStorage.setItem('chats', JSON.stringify(updatedChats));
        return updatedChats;
      });
    };

    socket.on('newMessage', handleMessage);

    return () => {
      socket.off('newMessage', handleMessage);
    };
  }, [socket, activeChat]);

  const handleInput = (event: IonInputCustomEvent<InputChangeEventDetail>) => {
    const value = (event.target as unknown as HTMLInputElement).value;
    setInputValue(value || '');
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLIonInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (activeChat !== null && inputValue) {
      const chatIndex = chats.findIndex((chat) => chat.id === activeChat);
      if (chatIndex !== -1) {
        const newMessage: Message = {
          id: chats[chatIndex].messages.length + 1,
          timestamp: new Date(),
          text: inputValue,
          sender: 'user',
        };

        socket?.emit('newMessage', newMessage);

        const updatedChats = [...chats];
        updatedChats[chatIndex] = {
          ...updatedChats[chatIndex],
          messages: [...updatedChats[chatIndex].messages, newMessage],
        };

        setChats(updatedChats);
        localStorage.setItem('chats', JSON.stringify(updatedChats));
      }

      setInputValue('');
    }
  };

  const deleteChat = (chatId: number) => {
    const updatedChats = chats.filter((chat) => chat.id !== chatId);
  
    setChats(updatedChats);
    localStorage.setItem('chats', JSON.stringify(updatedChats));
  
    if (activeChat === chatId) {
      const newActiveChatId = updatedChats.length > 0 ? updatedChats[0].id : null;
      setActiveChat(newActiveChatId);
    }
  };
  
  const createChat = (name: string) => {
    const newChat: ChatProps = {
      id: chats.length > 0 ? chats[chats.length - 1].id + 1 : 1,
      name: name,
      messages: [],
      lastUsed: new Date(),
    };
  
    setChats([...chats, newChat]);
    localStorage.setItem('chats', JSON.stringify([...chats, newChat]));
  
    setActiveChat(newChat.id);
  };
  

  return (
    <IonGrid>
      <IonRow>
        <IonCol size="3.5">
          <ChatList
            chats={chats}
            onItemClick={setActiveChat}
            activeChatId={activeChat}
            onNewChat={createChat}
            onDeleteChat={deleteChat}
          />
        </IonCol>
        <IonCol size="8">
          {activeChat !== null && (
            <>
              <div className="chat-header">
                <h2>{chats.find((chat) => chat.id === activeChat)?.name}</h2>
              </div>
              <IonContent className="chat-content">
                <IonList className="chat-list">
                  {chats
                    .find((chat) => chat.id === activeChat)
                    ?.messages.map((message) => (
                      <ChatMessage key={message.id} message={message} />
                    ))}
                </IonList>

                <IonItem className="chat-input">
                  <IonInput
                    placeholder="Escribe tu mensaje"
                    value={inputValue}
                    onIonChange={handleInput}
                    onKeyUp={handleKeyUp}
                  ></IonInput>
                  <IonButton onClick={sendMessage}>Enviar</IonButton>
                </IonItem>
              </IonContent>
            </>
          )}
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Chat;

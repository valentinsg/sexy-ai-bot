import React, { useState, useEffect } from 'react';
import { IonList, IonItem, IonInput, IonButton, IonIcon, IonContent, IonMenuToggle } from '@ionic/react';
import io from 'socket.io-client';
import { add } from 'ionicons/icons';
import ChatList from './ChatList';
import Message, {MessageProps} from './Message';
import ChatMenu from './ChatMenu';

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
  active: boolean;
  onClick: () => void;
}

const Chat: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<any>(null);
  const [chats, setChats] = useState<{ id: number; name: string; messages: string[] }[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [activeChat, setActiveChat] = useState<number | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5173');
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
      setMessages((messages) => [...messages, newMessage]);

      const chatIndex = chats.findIndex(
        (chat) => chat.name === newMessage.sender
      );
      if (chatIndex !== -1) {
        const updatedChats = [...chats];
        updatedChats[chatIndex] = {
          id: chatIndex,
          name: newMessage.sender,
          messages: [...updatedChats[chatIndex].messages, newMessage.text],
        };
        setChats(updatedChats);
      } else {
        setChats([
          ...chats,
          {
            id: chats.length,
            name: newMessage.sender,
            messages: [newMessage.text],
          },
        ]);
      }
    };
    
    socket.on('newMessage', handleMessage);

    return () => {
      socket.off('newMessage', handleMessage);
    };
  }, [chats, socket]);

  const handleInput = (e: any) => {
    setInputValue(e.detail.value);
  };

  const sendMessage = () => {
    if (!inputValue) {
      return;
    }

    const newMessage: Message = {
      id: messages.length + 1,
      timestamp: new Date(),
      text: inputValue,
      sender: 'user',
    };

    socket?.emit('newMessage', newMessage);
    setMessages((messages) => [...messages, newMessage]);
    setInputValue('');
  };

  const handleNewChat = () => {
    // Código para crear un nuevo chat y guardarlo en la base de datos
    // Luego, añadir el nuevo chat a la lista de chats
  }


  return (
    <>
      <IonMenuToggle autoHide={false}>
        <IonButton slot="end" onClick={() => setShowMenu(!showMenu)}>
          <IonIcon icon={add} />
        </IonButton>
      </IonMenuToggle>
      <ChatList chats={chats} onNewChat={handleNewChat} />
      {showMenu && <ChatMenu chats={chats} />}

      <IonContent>
      <IonList>
        {/* Lista de mensajes */}
        {messages.map((message) => (
          <Message key={message.id} text={message.text} />
        ))}
      </IonList>

        <IonItem>
          <IonInput
            placeholder="Escribe tu mensaje"
            value={inputValue}
            onIonChange={handleInput}
          ></IonInput>
          <IonButton onClick={sendMessage}>Enviar</IonButton>
        </IonItem>
      </IonContent>
    </>
  );
}
export default Chat;

import React from 'react';

export interface MessageProps {
  key: number;
  text: string;
}

const Message: React.FC<MessageProps> = ({ key, text }) => {
  // Component logic and JSX
  return (
    <div key={key}>
      {text}
    </div>
  );
};

export default Message;
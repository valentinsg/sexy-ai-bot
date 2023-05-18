import React from 'react';
import './PageThree.css';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import Chat from './Chat';

const PageThree: React.FC = () => {
  const history = useHistory();

  const handleButtonClick = () => {
    history.push('/Home');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chat</IonTitle>
          <IonButton slot="end" onClick={handleButtonClick}>Next</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <h1>This is Page Three</h1>
        <Chat />
      </IonContent>
    </IonPage>
  );
};


export default PageThree;
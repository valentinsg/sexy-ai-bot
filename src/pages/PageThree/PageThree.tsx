import React from 'react';
import './PageThree.css';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import Chat from './Chat';


const PageThree: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <h1>This is the sexy ai bot</h1>
        <Chat />
      </IonContent>
    </IonPage>
  );
};


export default PageThree;
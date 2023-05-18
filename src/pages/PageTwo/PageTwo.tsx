import React from 'react';
import './PageTwo.css';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const PageTwo: React.FC = () => {
  const history = useHistory();

  const handleButtonClick = () => {
    history.push('/PageThree');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Simple Chat</IonTitle>
          <IonButton slot="end" onClick={handleButtonClick}>Next</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>This is Page Two</h1>
      </IonContent>
    </IonPage>
  );
};
 
export default PageTwo;
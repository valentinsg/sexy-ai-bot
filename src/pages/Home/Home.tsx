import React from 'react';
import './Home.css';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const history = useHistory();

  const handleButtonClick = () => {
    history.push('/PageTwo');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonButton slot="end" onClick={handleButtonClick}>Next</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>This is the Home page</h1>
      </IonContent>
    </IonPage>
  )
};

export default Home;

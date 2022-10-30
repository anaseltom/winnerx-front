import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { useState, useRef, useEffect } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';
import {useDispatch, useSelector} from 'react-redux';
import {users} from '../actions/UserAction';
import {RootStore} from '../store';


const HowItWorks: React.FC = () => {

  const dispatch = useDispatch();
  const [loader, setLoader] = useState<any>("");
  useEffect(() => {
    dispatch(users());
  }, []);

  useEffect(() => {
    setTimeout(function(){
      setLoader("loader_remove");
    }, 500);
  }, []);

  
  return (
    <>
      <div id="preloder" className={loader}>
          <div className="loader"></div>
      </div>
      <Header 
        />
      
      <img style={{width: "100%"}} src="/assets/img/howitworks.jpeg" alt=""/>

      
      
      <Footer />

    </>
  );
};

export default HowItWorks;

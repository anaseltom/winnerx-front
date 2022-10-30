import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { useState, useRef, useEffect } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import Header from '../components/Header';
import HeroTwo from '../components/HeroTwo';
import Products from '../components/Products';
import Banner from '../components/Banner';
import BannerThree from '../components/BannerThree';
import BannerBig from '../components/BannerBig';
import BlogSummary from '../components/BlogSummary';
import Footer from '../components/Footer';
import './Home.css';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RootStore} from '../store';


const Browse: React.FC = () => {
  const products_list = useSelector((state: RootStore) => state.products_list);
  const categories = useSelector((state: RootStore) => state.categories);
  const [ref, setRef] = useState<any>("");
  const link = "./browse/ref=all&cat=";
  // check if signed in or not
  // useEffect(()=>{
  //   if(localStorage.getItem('session')) {
  //     const user_id = localStorage.getItem('session_id');
  //     // dispatch(users(user_id));
  //   }
  //   else {
  //     window.location.href = "/signin";
  //   }
  // }, [])
    const {id} = useParams<any>();

    const Child = () => {
      if(id)
      {
        setRef(id.split("ref=")[1]);
        console.log(ref);
      }
    }

    useEffect(()=> {
        Child();
    },[id] )

    useEffect(()=> {
      setRef(id.split("ref=")[1]);
  },[ref] )

  return (
    <>

      <Header 
        />
      
      <HeroTwo />


      {
        (ref=="all" || ref=="") && 
        <>

          <BannerThree
          lists = {categories}
          />

          <BannerBig
          lists = {categories}
          />

        </>
      }

      {
        (ref!="all" || ref!="") && 
        <>

          <Products 
            feature="featured" 
            title=""
            filterControl=""
            filterBy={ref}
          />

        </>
      }
      
      
      <Footer />
    
    </>
  );
};

export default Browse;

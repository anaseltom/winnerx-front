import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
} from "@ionic/react";
import { useState, useRef, useEffect } from "react";
import ExploreContainer from "../components/ExploreContainer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductsOrig from "../components/ProductsOrig";
import BannerImage from "../components/BannerImage";
import ProductsEco from "../components/ProductsEco";
import ProductsFeatured from "../components/ProductsFeatured";
import ProductsInLine from "../components/ProductsInLine";
import ProductsTiles from "../components/ProductsTiles";
import Products from "../components/Products";
import Banner from "../components/Banner";
import BannerApp from "../components/BannerApp";
import BlogSummary from "../components/BlogSummary";
import Footer from "../components/Footer";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { users } from "../actions/UserAction";
import { RootStore } from "../store";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState<any>("");
  useEffect(() => {
    dispatch(users());
  }, []);

  useEffect(() => {
    setTimeout(function () {
      setLoader("loader_remove");
    }, 500);
  }, []);

  return (
    <>
      <div id="preloder" className={loader}>
        <div className="loader"></div>
      </div>
      <Header />

      <Hero />

      <ProductsOrig
        feature="featured"
        title="Featured Products"
        filterControl="enable"
        filterBy=""
      />

      <BannerImage image="Artboard1.png" />

      {/* <ProductsFeatured
      feature="featured" 
      title="Featured Products"
      filterControl="enable"
      filterBy=""
      dealIndex = "0"
      bg = "yellow-winnerx.png"
      /> */}

      <ProductsEco
        feature="featured"
        title="Featured Products"
        filterControl="enable"
        filterBy=""
      />

      {/* <ProductsFeatured
      feature="featured" 
      title="Featured Products"
      filterControl="enable"
      filterBy=""
      dealIndex = "1"
      bg = "web.png"
      /> */}

      <BannerImage image="winner.png" />

      <BannerImage image="1.jpg" />

      {/* <BannerApp /> */}

      {/* <Banner />

      <ProductsTiles 
      feature="featured" 
      title="Featured Products"
      filterControl="enable"
      filterBy=""
      />
      
      <Products
       feature="" 
       title="All Products"
       filterControl=""
       filterBy=""
       /> */}

      <Footer />
    </>
  );
};

export default Home;

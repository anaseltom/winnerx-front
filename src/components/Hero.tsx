// import { Redirect, Route, Link } from 'react-router-dom';
import { IonReactRouter } from "@ionic/react-router";
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonRouterOutlet,
  IonApp,
  IonTabButton,
} from "@ionic/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ProductCategories } from "../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import SearchBar from "../components/SearchBar";
import { RootStore } from "../store";

const Hero: React.FC<any> = () => {
  SwiperCore.use([Autoplay]);
  const categories_list = useSelector((state: RootStore) => state.categories);
  const products_list = useSelector((state: RootStore) => state.products_list);
  const dispatch = useDispatch();
  const [toggleSearch, setToggleSearch] = useState<any>({
    istoggle: false,
  });
  const [search, setSearch] = useState<any>("");
  const [filterSearch, setFilterSearch] = useState<any>("");

  useEffect(() => {
    // console.log("categories");
    dispatch(ProductCategories());
  }, []);

  const toggleBackdrop = () => {
    toggleSearch.istoggle
      ? setToggleSearch({ istoggle: false })
      : setToggleSearch({ istoggle: true });
  };

  const filterSearchFunc = (items: any) => {
    if (search === "") {
      return false;
    } else {
      return items.productName.toLowerCase().includes(search.toLowerCase());
    }
  };

  return (
    <section className="hero">
      {/* <div className="container"> */}
      <div className="row">
        <div className="col-lg-12 search_hero">
          <div className="hero__item set-bg">
            <video
              src="assets/img/winnerx-video.mp4"
              preload="auto"
              muted
              autoPlay
              loop
            ></video>
            {/* <Swiper modules={[Navigation, Autoplay, Pagination]} pagination={true} navigation={true} autoplay={{delay: 5000, disableOnInteraction: false,}} loop={true} className="mySwiper">
                                <SwiperSlide className="swiper_slide" style={{backgroundImage: `url('/assets/img/macbook-air.jpg')` }}>
                                    <div className="hero__text">
                                        <span>Macbook Pro</span>
                                        <h2>BUY & WIN</h2>
                                        <p>Buy our newest recycled pen and give yourself a chance to win the latest Macbook PRO</p>
                                        <a href="#" className="primary-btn">TRY NOW</a>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper_slide" style={{backgroundImage: `url('/assets/img/range-rover.jpeg')` }}>
                                    <div className="hero__text">
                                        <span>Range Rover 2022</span>
                                        <h2>BUY & WIN</h2>
                                        <p>Buy our newest recycled pen and give yourself a chance to win the latest Range Rover</p>
                                        <a href="#" className="primary-btn">TRY NOW</a>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="swiper_slide" style={{backgroundImage: `url('/assets/img/macbook-air.jpg')` }}>
                                    <div className="hero__text">
                                        <span>Macbook Pro</span>
                                        <h2>BUY & WIN</h2>
                                        <p>Buy our newest recycled pen and give yourself a chance to win the latest Macbook PRO</p>
                                        <a href="#" className="primary-btn">TRY NOW</a>
                                    </div>
                                </SwiperSlide>
                            </Swiper> */}
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default Hero;

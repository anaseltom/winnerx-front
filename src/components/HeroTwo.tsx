// import { Redirect, Route, Link } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { IonHeader, IonTitle, IonToolbar, IonImg, IonRouterOutlet, IonApp, IonTabButton } from '@ionic/react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import {ProductCategories} from '../actions/UserAction';
import {useDispatch, useSelector} from 'react-redux';
import BannerTwo from '../components/BannerTwo';
import SearchBar from '../components/SearchBar';
import {RootStore} from '../store';



const Hero: React.FC<any> = () => {

    const categories_list = useSelector((state: RootStore) => state.categories);
    const products_list = useSelector((state: RootStore) => state.products_list);
    const dispatch = useDispatch();
    const [toggleSearch, setToggleSearch] = useState<any>({ 
        istoggle: false
      });
    const [search, setSearch] = useState<any>("");
    const [filterSearch, setFilterSearch] = useState<any>("");

    useEffect(() => {
        console.log("categories");
        dispatch(ProductCategories());
    }, []);

    const toggleBackdrop = () => {
        toggleSearch.istoggle ? setToggleSearch({istoggle: false}) : setToggleSearch({istoggle: true})
    }

    const filterSearchFunc = (items:any) =>  {
        if(search === "")
        {
            return false;
        }
        else
        {
            return (items.productName).toLowerCase().includes(search.toLowerCase());
        }
    }


    return (
        <section className="hero pad-t-50">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 search_hero">
                        <SearchBar 
                        />
                        
                        <BannerTwo
                        lists={categories_list}
                        />
                        
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
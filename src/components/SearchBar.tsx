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
import ProductDetails from '../components/ProductDetails';
import {useDispatch, useSelector} from 'react-redux';
import BannerTwo from '../components/BannerTwo';
import {RootStore} from '../store';
import { useLocation } from "react-router-dom";



const SearchBar: React.FC<any> = () => {
    const location = useLocation();
    useEffect(() => {
        // console.log("--------------------------------url changed", prodIsOpen);
        setProdIsOpen(false);
    }, [location]);

    const categories_list = useSelector((state: RootStore) => state.categories);
    const products_list = useSelector((state: RootStore) => state.products_list);
    const dispatch = useDispatch();
    const [toggleSearch, setToggleSearch] = useState<any>({ 
        istoggle: false
      });
    const [search, setSearch] = useState<any>("");
    const [filterSearch, setFilterSearch] = useState<any>("");
    const [prodIsOpen, setProdIsOpen] = useState<any>(false);
    const [updateProdSummary, setUpdateProdSummary] = useState<any>({});

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
            return (items?.productName)?.toLowerCase().includes(search.toLowerCase());
        }
    }


    return (
        <>

            <div className="hero__search">
                <div onClick={ ()=> { toggleBackdrop() } } style={ toggleSearch.istoggle ? {display: "block"} : {display: "none"} } className="search_backdrop"></div>
                <div className="hero__search__form">
                    <form style={{background: "white"}}>
                        <input value = {search} onChange={ (e) => { setSearch( e.target.value ) } }  onClick={ ()=> { toggleBackdrop() } } type="text" className="search_input" placeholder="What do yo u need?" />
                        <button type="submit" className="site-btn">SEARCH</button>
                    </form>
                </div>
                <div style={ toggleSearch.istoggle ? {display: "block"} : {display: "none"} } className="hero__search__form search_result">
                    <div className="search_result_wrapper">

                    {

                        products_list && products_list.length >0 && products_list.filter((product:any)=>filterSearchFunc(product)).map((ar: any, index:number) => {
                            return (
                            <div onClick={()=> {setProdIsOpen(true); setUpdateProdSummary(ar); setToggleSearch(false); setSearch("");}} key={index} className="search_list">
                                <div className="prod_name">{ar.productName}</div>
                                <div className="prod_img_box">
                                    <div className="prod_img" style={{backgroundImage: `url('/assets/img/product/${ar.imageUrlMain}')` }}></div>
                                </div>
                            </div>
                            )
                        })
                    }
                        
                    </div>
                </div>
            </div>
                            
                        
            <ProductDetails
            prodIsOpen= {prodIsOpen}
            setProdIsOpen={setProdIsOpen}
            product = {updateProdSummary}
            />
        </>
    );
};

export default SearchBar;
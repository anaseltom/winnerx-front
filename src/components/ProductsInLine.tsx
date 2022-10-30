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
  import {Products_list, Product_Cart, Product_Wishlist, LoadProductId} from '../actions/UserAction';
  import {useDispatch, useSelector} from 'react-redux';
  import ProductDetails from './ProductDetails';
  import {RootStore} from '../store';


const Products: React.FC<any> = ({feature, title, filterControl, filterBy}) => {
    const categories = useSelector((state: RootStore) => state.categories);
    const products_list = useSelector((state: RootStore) => state.products_list);
    const dispatch = useDispatch();
    const [filterProduct, setFilterProduct] = useState<any>(filterBy);
    const [prodIsOpen, setProdIsOpen] = useState<any>(false);
    const [activeTab, setActiveTab] = useState<any>(1);
    const [updateProdSummary, setUpdateProdSummary] = useState<any>({});
    const DisableProductId = false;

    useEffect(() => {
        setFilterProduct(filterBy);
    }, [filterBy]);

    const addToCart = (code:any) => {
        if(localStorage.getItem('w-commerce-token-qerfdswe')) 
        {
            var product_value = JSON.parse(localStorage.getItem('w-commerce-token-qerfdswe')!);
            var prodIndex = product_value?.findIndex((s: any) => s.code === code);
            console.log("index",prodIndex);

            if(prodIndex>=0)
            {
                product_value[prodIndex].qty += 1;
                localStorage.setItem('w-commerce-token-qerfdswe', JSON.stringify(product_value));
            }
            else
            {
                var temp_value = {code: code, qty: 1};
                product_value.push(temp_value);
                localStorage.setItem('w-commerce-token-qerfdswe', JSON.stringify(product_value));
            }
        }
        else
        {
            var new_value = [{code: code, qty: 1}];
            localStorage.setItem('w-commerce-token-qerfdswe', JSON.stringify(new_value));
        }
        dispatch(Product_Cart());
        
    }

    const addToWishlist = (code:any) => {
        if(localStorage.getItem('w-commerce-token-widerange')) 
        {
            var product_value = JSON.parse(localStorage.getItem('w-commerce-token-widerange')!);
            var prodIndex = product_value?.findIndex((s: any) => s.code === code);
            console.log("index",prodIndex);

            if(prodIndex>=0)
            {
                product_value[prodIndex].qty += 1;
                localStorage.setItem('w-commerce-token-widerange', JSON.stringify(product_value));
            }
            else
            {
                var temp_value = {code: code, qty: 1};
                product_value.push(temp_value);
                localStorage.setItem('w-commerce-token-widerange', JSON.stringify(product_value));
            }
        }
        else
        {
            var new_value = [{code: code, qty: 1}];
            localStorage.setItem('w-commerce-token-widerange', JSON.stringify(new_value));
        }
        dispatch(Product_Wishlist());
        
    }


    useEffect(() => {
        console.log("categories");
        dispatch(Products_list(""));
    }, []);

    const numberWithCommas =(x:any) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const filterProd = (items:any) =>  {

        if((items.price_id !== null && items.product_id !==null) || DisableProductId)
        {
            if(filterProduct === "")
            {
                if(feature == "")
                {
                    return true;
                }
                else
                {
                    return items.keywords === feature;
                }
            }
            else
            {
                return items.categoryCode === filterProduct;
            }
        }
        else {
            console.log("dispatching LoadProdId")
            dispatch(LoadProductId());
        }
    }

    

    return (
        <section className="featured spad inline_products">
            <div className="container">
                <div className="row featured__filter" style={{justifyContent: "center", flexWrap: "nowrap"}}>
                    {
                    products_list && products_list.length >0 && products_list.filter((product:any)=>filterProd(product)).slice(2, 6).map((ar: any) => {
                        return (

                            <div onClick={(e)=> {setProdIsOpen(true);setUpdateProdSummary(ar);}} key={ar.id} className={`col-lg-3 col-md-3 col-sm-6 mix ${ar.categoryName}`}>
                                <div className="featured__item">
                                    <div className="featured__item__pic set-bg" style={{backgroundImage: `url('assets/img/macbook2.jpg')`}} data-setbg="/assets/img/featured/feature-1.jpg">
                                        <div className="prod_info">
                                            <span>Chance to win <b>Macbook Pro</b></span>
                                        </div>
                                        <div className="prod_qty_info">
                                            <span className="info_text">9 sold out of 100</span>
                                            <div className="bar"><div className="progress"></div></div>
                                        </div>
                                        <ul className="featured__item__pic__hover">
                                            <li onClick={(e)=>{e.stopPropagation(); addToWishlist(ar.productCode)}}><a><img className="social_media" src="/assets/img/003-like.png" alt="" /></a></li>
                                            <li onClick={(e)=>{e.stopPropagation(); addToCart(ar.productCode) }}><a><img className="social_media" src="/assets/img/002-shopping-bag.png" alt="" /></a></li>
                                        </ul>
                                    </div>
                                    <div className="featured__item__text">
                                        <div className="prod_default_prod" style={{backgroundImage: `url('${ar.image_url_main}')`}}></div>
                                        <h6><a href="#">{ar.productName}</a></h6>
                                        <h5>{ar.currencyCode} {numberWithCommas(ar.unitPrice)}</h5>
                                        {/* <h5>$30.00</h5> */}
                                    </div>
                                </div>
                            </div>
                        )
                    })

                    }

                </div>
            </div>
            <ProductDetails
            prodIsOpen= {prodIsOpen}
            setProdIsOpen={setProdIsOpen}
            product = {updateProdSummary}
            />
        </section>
    );
};

export default Products;
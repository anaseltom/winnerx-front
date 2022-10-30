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
  import {Products_list} from '../actions/UserAction';
  import {useDispatch, useSelector} from 'react-redux';
  import {RootStore} from '../store';


const Products: React.FC<any> = () => {
    const categories = useSelector((state: RootStore) => state.categories);
    const products_list = useSelector((state: RootStore) => state.products_list);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("categories");
        dispatch(Products_list(""));
    }, []);

    return (
        <section className="featured spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>Featured Product</h2>
                        </div>
                        <div className="featured__controls">
                            <ul>
                                <li className="active" data-filter="*">All</li>
                                <li data-filter=".fresh-meat">Fresh Meat</li>
                                <li data-filter=".vegetables">Vegetables</li>
                                <li data-filter=".fastfood">Fastfood</li>
                            { 
                                // categories && categories.length >0 && categories.map((ar: any) => {
                                //     return (
                                    
                                //     <li key={ar.id} data-filter={ `.${ar.categoryCode}` }>{ar.categoryName}</li>
                                //     <li data-filter=".fresh-meat">Fresh Meat</li>
                                //     <li data-filter=".vegetables">Vegetables</li>
                                //     <li data-filter=".fastfood">Fastfood</li>
                                //     )
                                // })
                            }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row featured__filter">
                    {
                    // products_list && products_list.length >0 && products_list.map((ar: any) => {
                    //     return (

                    //         <div key={ar.id} className={`col-lg-3 col-md-4 col-sm-6 mix ${ar.categoryCode}`}>
                    //             <div className="featured__item">
                    //                 <div className="featured__item__pic set-bg" style={{backgroundImage: `url('/assets/img/product/${ar.imageUrlMain}')` }} data-setbg="/assets/img/featured/feature-1.jpg">
                    //                     <ul className="featured__item__pic__hover">
                    //                         <li><a href="#"><i className="fa fa-heart"></i></a></li>
                    //                         <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                    //                         <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                    //                     </ul>
                    //                 </div>
                    //                 <div className="featured__item__text">
                    //                     <h6><a href="#">Crab Pool Security</a></h6>
                    //                     <h5>$30.00</h5>
                    //                 </div>
                    //             </div>
                    //         </div>
                    //     )
                    // })

                    }

                    <div className="col-lg-3 col-md-4 col-sm-6 mix vegetables fastfood">
                        <div className="featured__item">
                            <div className="featured__item__pic set-bg" style={{backgroundImage: `url('/assets/img/featured/feature-2.jpg')` }} data-setbg="/assets/img/featured/feature-2.jpg">
                                <ul className="featured__item__pic__hover">
                                    <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                    <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                    <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                                </ul>
                            </div>
                            <div className="featured__item__text">
                                <h6><a href="#">Crab Pool Security</a></h6>
                                <h5>$30.00</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 mix vegetables fresh-meat">
                        <div className="featured__item">
                            <div className="featured__item__pic set-bg" style={{backgroundImage: `url('/assets/img/featured/feature-3.jpg')` }} data-setbg="/assets/img/featured/feature-3.jpg">
                                <ul className="featured__item__pic__hover">
                                    <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                    <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                    <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                                </ul>
                            </div>
                            <div className="featured__item__text">
                                <h6><a href="#">Crab Pool Security</a></h6>
                                <h5>$30.00</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 mix fastfood oranges">
                        <div className="featured__item">
                            <div className="featured__item__pic set-bg" style={{backgroundImage: `url('/assets/img/featured/feature-4.jpg')` }} data-setbg="/assets/img/featured/feature-4.jpg">
                                <ul className="featured__item__pic__hover">
                                    <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                    <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                    <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                                </ul>
                            </div>
                            <div className="featured__item__text">
                                <h6><a href="#">Crab Pool Security</a></h6>
                                <h5>$30.00</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 mix fresh-meat vegetables">
                        <div className="featured__item">
                            <div className="featured__item__pic set-bg" style={{backgroundImage: `url('/assets/img/featured/feature-5.jpg')` }} data-setbg="/assets/img/featured/feature-5.jpg">
                                <ul className="featured__item__pic__hover">
                                    <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                    <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                    <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                                </ul>
                            </div>
                            <div className="featured__item__text">
                                <h6><a href="#">Crab Pool Security</a></h6>
                                <h5>$30.00</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 mix oranges fastfood">
                        <div className="featured__item">
                            <div className="featured__item__pic set-bg" style={{backgroundImage: `url('/assets/img/featured/feature-6.jpg')` }} data-setbg="/assets/img/featured/feature-6.jpg">
                                <ul className="featured__item__pic__hover">
                                    <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                    <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                    <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                                </ul>
                            </div>
                            <div className="featured__item__text">
                                <h6><a href="#">Crab Pool Security</a></h6>
                                <h5>$30.00</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 mix fresh-meat vegetables">
                        <div className="featured__item">
                            <div className="featured__item__pic set-bg" style={{backgroundImage: `url('/assets/img/featured/feature-7.jpg')` }} data-setbg="/assets/img/featured/feature-7.jpg">
                                <ul className="featured__item__pic__hover">
                                    <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                    <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                    <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                                </ul>
                            </div>
                            <div className="featured__item__text">
                                <h6><a href="#">Crab Pool Security</a></h6>
                                <h5>$30.00</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 mix fastfood vegetables">
                        <div className="featured__item">
                            <div className="featured__item__pic set-bg" style={{backgroundImage: `url('/assets/img/featured/feature-8.jpg')` }} data-setbg="/assets/img/featured/feature-8.jpg">
                                <ul className="featured__item__pic__hover">
                                    <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                    <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                    <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                                </ul>
                            </div>
                            <div className="featured__item__text">
                                <h6><a href="#">Crab Pool Security</a></h6>
                                <h5>$30.00</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Products;
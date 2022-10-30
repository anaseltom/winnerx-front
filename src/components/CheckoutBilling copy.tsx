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
  import Header from '../components/Header';
  import SearchBar from '../components/SearchBar';
  import CheckoutSummary from '../components/CheckoutSummary';
  import Footer from '../components/Footer';
  import { useState, useRef, useEffect } from 'react';
  import {Products_list} from '../actions/UserAction';
  import {Product_Cart, Product_Cart_Total, Products_Billing} from '../actions/UserAction';
  import {useDispatch, useSelector} from 'react-redux';
  import {RootStore} from '../store';


const Checkout: React.FC<any> = ({feature, title, filterControl}) => {
    const products_list = useSelector((state: RootStore) => state.products_list);
    const products_cart = useSelector((state: RootStore) => state.cart);
    const products_cart_total = useSelector((state: RootStore) => state.cart_total);
    const dispatch = useDispatch();
    let productsBilling: any = [];
    const [cardDetails, setCardDetails] = useState<any>({card:"", mo_ex: "", yr_ex: "", cvv: ""});

    useEffect(() => {
        if(!localStorage.getItem('session_id')) {
            window.location.href = "/signin/redirect";
        }
    }, []);

    useEffect(() => {
        console.log("categories");
        dispatch(Products_list(""));
    }, []);

    useEffect(() => {
        dispatch(Product_Cart());
    }, []);

    const numberWithCommas =(x:any) => {
        if(x)
        {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        else
        {
            return 0;
        }
        
    }

    var product_value = [];
    if(localStorage.getItem('w-commerce-token-qerfdswe')) 
    {
        product_value = JSON.parse(localStorage.getItem('w-commerce-token-qerfdswe')!);
    }

    const getProd = (code:any) => {
        var prodIndex = products_list?.findIndex((s: any) => s.productCode === code);
        return products_list[prodIndex];
    }


    useEffect(() => {
        dispatch(Product_Cart_Total(products_list, products_cart));
    }, [products_list]);

    const confirmCheckout = () => {
        dispatch(Products_Billing(productsBilling,products_cart_total));
    }
    

    return (
        <>
            <Header 
            />

        
        <section className="checkout spad">
            <div className="container">
                <div className="checkout__form">
                    <h4>Billing Details</h4>
                    {/* <form action="#"> */}
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                
                                <div className="checkout__input">
                                    <p>Credit Card # 16digits:<span>*</span></p>
                                    <input value={cardDetails.card} onChange={(e)=>{ setCardDetails({...cardDetails, card:e.target.value}) }} type="number" placeholder="xxxxxxxxxxxxxxxx"/>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="checkout__input">
                                            <p>Card Expiry Date<span>*</span></p>
                                            <div className="input_wrapper">
                                                <input value={cardDetails.mo_ex} onChange={(e)=>{ setCardDetails({...cardDetails, mo_ex:e.target.value}) }} type="number" placeholder="MM" />
                                                <span>/</span>
                                                <input value={cardDetails.yr_ex} onChange={(e)=>{ setCardDetails({...cardDetails, yr_ex:e.target.value}) }} type="number" placeholder="YY" />
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="checkout__input">
                                            <p>CVV<span>*</span></p>
                                            <input value={cardDetails.cvv} onChange={(e)=>{ setCardDetails({...cardDetails, cvv:e.target.value}) }} type="number" placeholder="xxx"/>
                                        </div>
                                    </div>
                                </div>
                                <p>Please select your delivery address. As default we select your current home address as delivery address. </p>
                                <div className="checkout__input">
                                    <p>Delivery Address<span>*</span></p>
                                    <input type="text" />
                                </div>
                                {/* <div className="checkout__input__checkbox">
                                    <label>
                                        Ship to a different address?
                                        <input type="checkbox" id="diff-acc" />
                                        <span className="checkmark"></span>
                                    </label>
                                </div> */}
                                <div className="checkout__input">
                                    <p>Order notes<span>*</span></p>
                                    <input type="text"
                                        placeholder="Notes about your order, e.g. special notes for delivery." />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="checkout__order">
                                    <h4>Your Order</h4>
                                    <div className="checkout__order__products">Products <span>Total</span></div>
                                    <ul>
                                        {/* <li>Vegetable’s Package <span>$75.99</span></li>
                                        <li>Fresh Vegetable <span>$151.99</span></li>
                                        <li>Organic Bananas <span>$53.99</span></li> */}
                                        
                                        {
                                            products_list.length>0 && products_cart && products_cart.length >0 && products_cart.map((ar: any, key: number) => {
                                                const prod = getProd(ar.code);
                                                productsBilling = [
                                                    ...productsBilling,
                                                    {
                                                        price_id: prod.price_id,
                                                        quantity: ar.qty
                                                    }
                                                    
                                                  ];
                                                return (
                                                    <li key={key}>{prod?.productName}<span>{prod?.currencyCode} {numberWithCommas(ar.qty * prod?.unitPrice)}</span></li>
                                                )
                                            })
                                        }
                                        
                                    </ul>
                                    <div className="checkout__order__subtotal">Subtotal <span>{numberWithCommas(products_cart_total?.total)}</span></div>
                                    <div className="checkout__order__total">Total <span>{numberWithCommas(products_cart_total?.total)}</span></div>
                            
                                    <p>Add your payment details to confirm your order.</p>
                                    
                                    <button onClick={()=> { confirmCheckout() }} type="submit" className="site-btn">PLACE ORDER</button>
                                </div>
                            </div>
                        </div>
                    {/* </form> */}
                </div>
            </div>
        </section>


        <Footer />


        </>
    );
};

export default Checkout;
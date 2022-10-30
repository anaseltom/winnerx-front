import React, { useState } from 'react';
import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, IonPage } from '@ionic/react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ProductSummary from '../components/ProductSummary';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {Products_Refunds} from '../actions/UserAction';
import {useDispatch, useSelector} from 'react-redux';
import {RootStore} from '../store';


const RefundDetails: React.FC<any> = ({refundIsOpen, setRefundIsOpen, product}) => {

    const dispatch = useDispatch();
    const [refundDetails, setRefundDetails] = useState<any>({reason:"", issue: "", description: "", product_id: ""});
    const location = useLocation();
    useEffect(() => {
        setRefundIsOpen(false);
    }, [location]);

    const numberWithCommas =(x:any) => {
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const confirmRefund = () => {
        dispatch(Products_Refunds(refundDetails));
    }

  return (
    
        <IonModal className="refund_details" isOpen={refundIsOpen} onDidDismiss={ () => {setRefundIsOpen(false)}} swipeToClose={true}>
          

        <section className="product-details spad" style={{paddingTop: "50px"}}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="product__details__pic">
                            <div className="product__details__pic__item">
                                <img className="product__details__pic__item--large"
                                    src={`assets/img/product/${product?.imageUrlMain}`} alt="" />
                            </div>
                            {/* <div className="product__details__pic__slider owl-carousel">
                                <img data-imgbigurl="img/product/details/product-details-2.jpg"
                                    src="img/product/details/thumb-1.jpg" alt="" />
                                <img data-imgbigurl="img/product/details/product-details-3.jpg"
                                    src="img/product/details/thumb-2.jpg" alt="" />
                                <img data-imgbigurl="img/product/details/product-details-5.jpg"
                                    src="img/product/details/thumb-3.jpg" alt="" />
                                <img data-imgbigurl="img/product/details/product-details-4.jpg"
                                    src="img/product/details/thumb-4.jpg" alt="" />
                            </div> */}
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="product__details__text">
                            <h3>{product?.productName}</h3>
                            <div className="product__details__rating">
                                <img className="social_media" src="/assets/img/star.png" alt="" />
                                <img className="social_media" src="/assets/img/star.png" alt="" />
                                <img className="social_media" src="/assets/img/star.png" alt="" />
                                <img className="social_media" src="/assets/img/star.png" alt="" />
                                <span>(18 reviews)</span>
                            </div>
                            <div className="product__details__price">{product?.currencyCode} {numberWithCommas(product?.unitPrice)}</div>
                            <p>{product?.description}</p>
                            
                            
                        </div>
                    </div>
                </div>
                <div className="row refund_form">
                    <div className="col-lg-12 col-md-12">
                        
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="checkout__input">
                                    <p>Main Reason for return<span>*</span></p>
                                    <select name="reason" onChange={(e)=> { setRefundDetails({...refundDetails, reason:e.target.value}) }} value={refundDetails.reason} id="title">
                                        <option value="" disabled>Select your reason for return</option>
                                        <option value="Not interested with the item anymore">Not interested with the item anymore</option>
                                        <option value="This is not the item I ordered">This is not the item I ordered</option>
                                        <option value="Item Defect">Item Defect</option>
                                        <option value="I want to choose another product">I want to choose another product</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="checkout__input">
                                    <p>Issue Type<span>*</span></p>
                                    <select name="issue" onChange={(e)=> { setRefundDetails({...refundDetails, issue:e.target.value}) }} value={refundDetails.issue} id="issue">
                                        <option value="" disabled>Select your issue type</option>
                                        <option value="Item doesn't match the description">Item doesn't match the description</option>
                                        <option value="It is not working properly">It is not working properly</option>
                                        <option value="It is broken">It is broken</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="checkout__input">
                            <p>Description<span>*</span></p>
                            <textarea value={refundDetails.description} onChange={(e)=> { setRefundDetails({...refundDetails, description:e.target.value}) }} name="" id=""></textarea>
                        </div>
                        <div className="checkout__input__checkbox">
                            <label>
                                By checking, you are agreeing to the return & refund policy
                                <input type="checkbox" id="diff-acc" />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <button onClick={()=> { confirmRefund() }} type="submit" className="site-btn">Confirm Refund Request</button>
                    </div>
                    {/* <div className="col-lg-4 col-md-6">
                        <div className="checkout__order">
                            <h4>Your Order</h4>
                            
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
        


        </IonModal>
      
  );
}

export default RefundDetails;
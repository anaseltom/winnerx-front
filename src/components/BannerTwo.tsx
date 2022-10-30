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



const BannerTwo: React.FC<any> = ({lists}) => {
    return (
        <div className="banner ads">
            <div className="container">
                <div className="row banner_row">
                    
                    {
                        lists && lists.length >0 && lists?.filter((cat:any)=>cat.status == "active"?true:false).slice(0, 4).map((ar:any, index:number) => {
                            return (
                            
                                <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                                    <Link to={`./ref=${ar?.categoryCode}`}>
                                        <div className="banner__pic banner_cat" style={{backgroundImage: 'url(assets/img/bg.jpeg)'}}>
                                            <img src={`${ar.imageSmall}`} alt="" />
                                            <div className="title">
                                                <span className="header">{ar.categoryName}</span>
                                                <span className="subheader">Hot Deals</span>
                                                <button>SHOP NOW</button>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                        
                            )
                        })
                    }
            
                </div>
            </div>
        </div>
    );
};

export default BannerTwo;
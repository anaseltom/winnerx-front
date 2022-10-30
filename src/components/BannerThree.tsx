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



const BannerThree: React.FC<any> = ({lists}) => {
    return (
        <div className="banner ads">
            <div className="container">
                <div className="row banner_row">
                    
                    {
                        lists && lists.length >0 && lists.filter((cat:any)=>cat.status == "active"?true:false).slice(2, 6).map((ar:any, index:number) => {
                            return (
                            
                                <div key={index} className="col-lg-6 col-md-6 col-sm-12 banner-col">
                                    <Link to={`../browse/ref=${ar?.categoryCode}`}>
                                        <div className="banner_box" style={{}}>
                                            <img src={`${ar.imageSmall}`} alt="" />
                                            <div className="title">
                                                <span className="header">{ar.categoryName}</span>
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

export default BannerThree;
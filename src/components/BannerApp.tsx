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



const Banner: React.FC<any> = () => {
    return (
        <div className="banner app">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="banner__pic">
                            <img src="/assets/img/banner/banner-1.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
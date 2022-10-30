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



const Footer: React.FC<any> = () => {
    return (
        <footer className="footer spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="footer__about">
                            <div className="footer__about__logo">
                                <a><Link to={`/home`}><img src="/assets/img/winnerX-logo.png" style={{width: "150px"}} alt="" /></Link></a>
                            </div>
                            <ul>
                                <li>Address: Dubai, UAE</li>
                                <li>Phone: +971 52 52 5222</li>
                                <li>Email: support@winnerx.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-6 offset-lg-1">
                        <div className="footer__widget">
                            <h6>Useful Links</h6>
                            <ul>
                                <li><Link to={`/how-it-works`}>How it works</Link></li>
                                <li><Link to={`/prize-draw-terms`}>Prize Draw Terms</Link></li>
                                <li><Link to={`/faq`}>FAQs</Link></li>
                                <li><Link to={`/terms-of-service`}>Terms of Services</Link></li>
                                <li><Link to={`/privacy-policy`}>Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                    {/* <div className="col-lg-4 col-md-12">
                        <div className="footer__widget">
                        
                            <h6>Join Our Newsletter Now</h6>
                            <p>Get E-mail updates about our latest shop and special offers.</p>
                        
                            <form>
                                <input type="text" placeholder="Enter your mail" />
                                <button type="submit" className="site-btn">Subscribe</button>
                            </form>
                            <div className="footer__widget__social">
                                <a href="#"><i className="fa fa-facebook"></i></a>
                                <a href="#"><i className="fa fa-instagram"></i></a>
                                <a href="#"><i className="fa fa-twitter"></i></a>
                                <a href="#"><i className="fa fa-pinterest"></i></a>
                            </div>
                        </div>
                    </div> */}
                </div>
                {/* <div className="row">
                    <div className="col-lg-12">
                        <div className="footer__copyright">
                            <div className="footer__copyright__text"><p></p></div>
                            <div className="footer__copyright__payment"><img src="/assets/img/payment-item.png" alt="" /></div>
                        </div>
                    </div>
                </div> */}
            </div>
        </footer>
    );
};

export default Footer;
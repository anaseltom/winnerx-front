import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { useState, useRef, useEffect } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {useDispatch, useSelector} from 'react-redux';
import {users} from '../actions/UserAction';
import {RootStore} from '../store';


const Faq: React.FC = () => {


  const [loader, setLoader] = useState<any>("");
  

  useEffect(() => {
    setTimeout(function(){
      setLoader("loader_remove");
    }, 500);
  }, []);

  
  return (
    <>
      <div id="preloder" className={loader}>
          <div className="loader"></div>
      </div>
      <Header 
        />
      
        <div className="pharagraph_wrapper">

          <div className="row">
            <div className="title">FAQs (Frequently Asked Questions)</div>
          </div>
          

          <div className="row">
            <div className="title">What is WinnerX?</div>
            <div className="pharagraph">
              WinnerX is a UAE based company that was recently established to introduce a new innovative approach to the e-commerce shop and win world.
            </div>
          </div>

          <div className="row">
            <div className="title">How can I enter the raffle draw?</div>
            <div className="pharagraph">
              By making any purchase through our website or App.
            </div>
          </div>

          <div className="row">
            <div className="title">Are the brands sold on the website authentic and original?</div>
            <div className="pharagraph">
            Yes, all the brands sold on the website are 100% original and authentic.
            </div>
          </div>

          <div className="row">
            <div className="title">How many tickets can I get at a time?</div>
            <div className="pharagraph">
            For every purchase you get one ticket.
            </div>
          </div>

          <div className="row">
            <div className="title">Is this regulated by a governmental entity?</div>
            <div className="pharagraph">
            Yes, all draws and activities are managed and regulated by the Dubai Economic Department (DED).
            </div>
          </div>

          <div className="row">
            <div className="title">What are the payment options provided?</div>
            <div className="pharagraph">
            you can pay online through master cards, visa cards, and we do offer cash on delivery.
            </div>
          </div>

          <div className="row">
            <div className="title">How will I receive my products?</div>
            <div className="pharagraph">
            You have the option to collect the product from our head office, or have it delivered to your doorstep (applicable delivery charges will apply).
            </div>
          </div>

          <div className="row">
            <div className="title">Is WinnerX available on android and IOS?</div>
            <div className="pharagraph">
            Yes, WinnerX is available on both.
            </div>
          </div>

          <div className="row">
            <div className="title">To which countries do you ship your products?</div>
            <div className="pharagraph">
            To all GCC countries, and soon we will ship internationally.
            </div>
          </div>

          <div className="row">
            <div className="title">Can I buy the product without registering?</div>
            <div className="pharagraph">
            No, you have to register and login to be able to purchase products and enter the draw.
            </div>
          </div>

          <div className="row">
            <div className="title">Am I limited to a specific number of tickets?</div>
            <div className="pharagraph">
            No, you may get as many tickets as you want.
            </div>
          </div>


        </div>
      
      <Footer />

    </>
  );
};

export default Faq;

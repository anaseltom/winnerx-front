import React, { useState } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  useIonToast,
} from "@ionic/react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ProductSummary from "../components/ProductSummary";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ProductDetails: React.FC<any> = ({
  prodIsOpen,
  setProdIsOpen,
  product,
}) => {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    setProdIsOpen(false);
  }, [location]);

  useEffect(() => {
    setProdIsOpen(false);
  }, [history]);
  return (
    <IonModal
      className="prod_details"
      isOpen={prodIsOpen}
      onDidDismiss={() => {
        setProdIsOpen(false);
      }}
      swipeToClose={true}
    >
      {/* <Header 
            /> */}

      <section className="hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 search_hero">
              {/* <SearchBar 
                            /> */}
            </div>
          </div>
        </div>
      </section>

      <ProductSummary product={product} />
    </IonModal>
  );
};

export default ProductDetails;

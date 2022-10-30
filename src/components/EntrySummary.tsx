import { IonReactRouter } from '@ionic/react-router';
import { useState, useRef, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStore} from '../store';
import {Product_Cart, Product_Delete, Product_Cart_Total} from '../actions/UserAction';
import Product_cart from '../reducers/ProductCartReducer';


const EntriesSummary: React.FC<any> = ({ctr, code, price, date}) => {
    
    const date_formatter = (date:any) => {
        const dates = new Date(date);

        const formattedDate = dates.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        // hour: "numeric",
        // minute: "2-digit"
        });

        return formattedDate;
    }

    const numberWithCommas =(x:any) => {
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    

    


    return (
        <tr>
            <td>
                {ctr}
            </td>
            <td>
                {code}
            </td>
            <td>
                {price}
            </td>
            <td>
                {date_formatter(date)}
            </td>
            
        </tr>
    );
};

export default EntriesSummary;
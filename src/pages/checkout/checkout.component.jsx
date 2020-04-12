import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {withRouter} from 'react-router-dom';

import './checkout.styles.scss';

import {selectCartItems, selectCartTotalCost} from '../../redux/cart/cart.selectors';
import CheckOutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

const CheckOutPage = ({cartItems, cartTotalCost}) => (
    <div className="checkout-outer">
        <div className="checkout-page">
            <h1 className="title">Shopping Cart</h1>

            <div className="checkout-header">
                <div className="header-image">Product</div>
                <div className="header-name">Description</div>
                <div className="header-quantity">Quantity</div>
                <div className="header-price">Price</div>
                <div className="header-remove"></div>
            </div>
            
            {
                cartItems.length ?
                    cartItems.map(cartItem => (
                        <CheckOutItem key={cartItem.id} cartItem={cartItem} />
                    ))
                :
                    <span className="empty-message">Your cart is empty.</span>
            }

            <div className="total">Total: ${cartTotalCost}</div>
            {
                !cartTotalCost ? null : (
                    <StripeCheckoutButton price={cartTotalCost} />
                )
            }
            <div className="test-warning">
                Test Credit Card: 4242 4242 4242 4242
                <br/>Security Code: 123, 
                <br/>Expiration : Any Future Date
                <div className="stripe-link" onClick={()=> window.open("https://stripe.com/docs/testing")}>Visit Stripe Testing for more cards.</div>    
            </div>
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector ({
    cartItems: selectCartItems,
    cartTotalCost: selectCartTotalCost
});

export default withRouter(connect(mapStateToProps)(CheckOutPage));
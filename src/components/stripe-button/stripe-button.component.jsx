import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {withRouter} from 'react-router-dom';

import {selectCartItems} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price, cartItems, currentUser}) => {

    const priceInCents = price * 100;
    const email = !currentUser ? null : currentUser.email ;
    const publishableKey = "pk_test_JBKj5PjCB0wusPQxC2xRxqCB00QQYeQrI7";
    
    const processToken = token => {
        console.log("currentUser.id=", currentUser.id);
        console.log("cartItems=",cartItems);
        console.log("token=",token);
        alert('Payment Processed!');
    }

    return (

        <StripeCheckout
            label="Pay Now"
            name="Urban Dragon Wear"
            email={email}

            image=""
            description={`Your total is $${price}`}
            amount={priceInCents}
            panelLabel="Pay Now"
            token={processToken}
            stripeKey={publishableKey}
        />
    )
};

const mapStateToProps = createStructuredSelector ({
    cartItems: selectCartItems,
    currentUser: selectCurrentUser
});


export default withRouter(connect(mapStateToProps)(StripeCheckoutButton));
import React, {useState}from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {withRouter} from 'react-router-dom';

import {selectCartItems} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {createOrderStart} from '../../redux/order/order.actions'
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price, cartItems, currentUser, createOrderStart, history}) => {

    const priceInCents = price * 100;
    const email = !currentUser ? null : currentUser.email ;
    const publishableKey = "pk_test_JBKj5PjCB0wusPQxC2xRxqCB00QQYeQrI7";
    const [orderCreated, setOrderCreated] = useState(false);

    const processToken = token => {

        const orderData = {
            email: token.email,
            phone: '1-212-999-8888 x1234',
            orderStatus: "processing",
            orderTotal: price,
            currency: "usd",
            paymentInfo: {
                paymentType: token.card.brand,
                last4: token.card.last4,
                nameOnCard: "John A. Smith",
                authorizationId: "9999999999",
                billingAddress: {
                    name: "John Smith",
                    line1: "99 Home Street",
                    line2: "Apt 1A",
                    city: "New York",
                    state: "NY",
                    zip: "10001"	
                },
            },
            shippingInfo: {
                shippingMethod: "UPS2DAY",
                shippingAddress: {
                    name: "Mary Smith",
                    line1: "100 Delivery Street",
                    line2: "1st Floor",
                    city: "New York",
                    state: "NY",
                    zip: "10002"	
                }
            },
            orderItems: cartItems
        }

        console.log("orderData=",orderData);
        createOrderStart(orderData);
        setOrderCreated(true);
        history.push("/confirmation");
        
    }

    console.log("orderCreated=", orderCreated);

    return (

        <div>
            <StripeCheckout
            label="Pay With Card"
            name="Urban Dragon Wear"
            email={email}
            image="https://i.ibb.co/TM18jP3/dragonlogosmall.png"
            description={`Your total is $${price}`}
            amount={priceInCents}
            panelLabel="Pay Now"
            token={processToken}
            stripeKey={publishableKey}
            />
        </div>
    )
};

const mapStateToProps = createStructuredSelector ({
    cartItems: selectCartItems,
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    createOrderStart : (cartItems, paymentToken) => dispatch(createOrderStart(cartItems, paymentToken))
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(StripeCheckoutButton));
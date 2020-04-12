import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {

    const priceInCents = price * 100;

    const publishableKey = "pk_test_JBKj5PjCB0wusPQxC2xRxqCB00QQYeQrI7";

    const processToken = token => {
        //console.log("token=",token);
        alert('Payment Pricessed!');
    }

    return (

        <StripeCheckout
            label="Pay Now"
            name="Urban Dragon Wear"
            billingAddress
            shippingAddress
            image=""
            description={`Your total is $${price}`}
            amount={priceInCents}
            panelLabel="Pay Now"
            token={processToken}
            stripeKey={publishableKey}
        />
    )
};

export default StripeCheckoutButton;
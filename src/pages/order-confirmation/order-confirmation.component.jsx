import React from 'react';
import {createStructuredSelector} from 'reselect';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import './order-confirmation.styles.scss';

import OrderDetails from '../../components/order-details/order-details.component';
import {selectNewOrder} from '../../redux/order/order.selectors';

const OrderConfirmationPage = ({order}) => {
    return (
        <div className="order-confirmation-wrapper">
            {
            !order || order.length === 0 ? (
                <div className="no-orders">No order matches the required criteria.</div>
            ) : (
                <div className="order-confirmation">
                    <div className="top-message">
                        <p>Order # {order[0].id}</p>
                        <p>You order has been placed and is being processed.</p>
                    </div>
                    <div className="search-results">
                        <h1 className="title">Order Details</h1>
                        <OrderDetails key={order[0].id} order={order[0]} /> 
                    </div>
                </div>
            )
            }
            
        </div>
    );
}

const mapStateToProps = createStructuredSelector ({
    order : selectNewOrder
});

export default withRouter(connect(mapStateToProps)(OrderConfirmationPage)); 
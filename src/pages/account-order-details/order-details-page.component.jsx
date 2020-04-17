import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import './order-details-page.styles.scss';

import OrderDetails from '../../components/order-details/order-details.component';
import {selectCurrentUser, selectOrderFromOrderHistory} from '../../redux/user/user.selectors'

const OrderDetailsPage = ({order,currentUser}) => {
    
    console.log("order=", order);
    console.log("currentUser=", currentUser);

    if (order) {
        console.log("order.email=", order.email);
        console.log("currentUser.email=", currentUser.email)
    }

    const isAuthorized = order && order.email === currentUser.email;

    return (
        <div className="order-details-wrapper">
            <h1 className="title">Order Details</h1>
            {
            !order || !isAuthorized ? (
                <div>No order matches the required criteria.</div>
            ) : (
                <OrderDetails key={order.id} order={order} /> 
                )
            }   
        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    currentUser : selectCurrentUser(state),
    order: selectOrderFromOrderHistory(Number(ownProps.match.params.orderId))(state)
})

export default withRouter(connect(mapStateToProps)(OrderDetailsPage)); 

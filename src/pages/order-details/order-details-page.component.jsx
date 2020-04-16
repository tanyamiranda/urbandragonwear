import React from 'react';
import {withRouter} from 'react-router-dom';

import './order-details-page.styles.scss';
import {connect} from 'react-redux';

import {selectOrderFromOrderHistory} from '../../redux/user/user.selectors'

const OrderDetailsPage = ({order,match}) => {
    
    console.log("order=", order);
    console.log("match=", match);

    return (
        <div className="order-details-wrapper">
            <div className="order-details">
                <h1 className="title">Order Details</h1>
                {
                    !order ? (
                        <div>Order Not Found.</div>
                    ) : (

                        <div className="details">
                            <div className="detail">
                                <div className="label">Order Id:</div>
                                <div>{order.id}</div>
                            </div>
                            <div className="detail">
                                <div className="label">Date Created:</div>
                                <div>{order.createdDate}</div>
                            </div>
                            <div className="detail">
                                <div className="label">Email:</div>
                                <div>{order.email}</div>
                            </div>
                            <div className="detail">
                                <div className="label">Order Total:</div>
                                <div>{order.orderTotal}</div>
                            </div>
                            <div className="detail">
                                <div className="label">Order Status:</div>
                                <div>{order.orderStatus}</div>
                            </div>
                        </div>
                        
                    )
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    order: selectOrderFromOrderHistory(Number(ownProps.match.params.orderId))(state)
})

export default withRouter(connect(mapStateToProps)(OrderDetailsPage)); 

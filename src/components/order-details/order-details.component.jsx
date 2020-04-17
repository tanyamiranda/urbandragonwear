import React from 'react';

import './order-details.styles.scss';

import {formatDisplayDate, formatDisplayDollarValue} from '../formatting/display-formatting';

const OrderDetails = ({order}) => (

    <div className="order-details">
                    <div className="top-section">
                        <div className="details">
                            <div className="detail">
                                <div className="label">Order Id:</div>
                                <div>{order.id}</div>
                            </div>
                            <div className="detail">
                                <div className="label">Date Created:</div>
                                <div>{formatDisplayDate(order.createdDate)}</div>
                            </div>
                            <div className="detail">
                                <div className="label">Order Total:</div>
                                <div>{formatDisplayDollarValue(order.orderTotal)}</div>
                            </div>
                            <div className="detail">
                                <div className="label">Order Status:</div>
                                <div>{order.orderStatus}</div>
                            </div>
                            <div className="detail">
                                <div className="label">Email:</div>
                                <div>{order.email}</div>
                            </div>
                            <div className="detail">
                                <div className="label">Phone:</div>
                                <div>{order.phone}</div>
                            </div>
                            <div className="detail">
                                <div className="label">Shipping Method:</div>
                                <div>{order.shippingInfo.shippingMethod}</div>
                            </div>
                            <div className="detail">
                                <div className="label">Payment Method:</div>
                                <div>{order.paymentInfo.paymentType} *******{order.paymentInfo.last4}</div>
                            </div>
                        </div>
                        <div className="details">
                            <div className="detail">
                                <div className="label">Shipping Address:</div>
                                <div className="address">
                                    <span>{order.shippingInfo.shippingAddress.name}</span>
                                    <span>{order.shippingInfo.shippingAddress.line1}</span>
                                    <span>{order.shippingInfo.shippingAddress.line2}</span>
                                    <span>{order.shippingInfo.shippingAddress.city}</span>
                                    <span>{order.shippingInfo.shippingAddress.state}, {order.shippingInfo.shippingAddress.zip}</span>
                                </div>
                            </div>
                            <div className="detail">
                                <div className="label">Billing Address:</div>
                                <div className="address">
                                    <span>{order.paymentInfo.billingAddress.name}</span>
                                    <span>{order.paymentInfo.billingAddress.line1}</span>
                                    <span>{order.paymentInfo.billingAddress.line2}</span>
                                    <span>{order.paymentInfo.billingAddress.city}</span>
                                    <span>{order.paymentInfo.billingAddress.state}, {order.shippingInfo.shippingAddress.zip}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-items">
                    {
                        order.orderItems.map(orderItem => (
                            <div className="order-item" key={orderItem.id}>
                                <div className="image-container"><img alt={orderItem.name} src={orderItem.imageUrl} /></div>
                                <span className="name">{orderItem.name}</span>
                                <span className="quantity">{orderItem.quantity}</span>
                                <span className="price">${orderItem.price}</span>
                            </div>
                        ))  
                    }
                    </div>
                </div>


);

export default OrderDetails;
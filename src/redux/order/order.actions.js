import OrderActionTypes from './order.types';

export const searchByOrderIdStart = (orderId, email) => ({
    type : OrderActionTypes.SEARCH_ORDER_BY_ID_START,
    payload: {orderId, email}
});

export const searchByOrderIdSuccess = (order) => ({
    type : OrderActionTypes.SEARCH_ORDER_BY_ID_SUCCESS,
    payload: order
});

export const searchByOrderIdFailure = (error) => ({
    type : OrderActionTypes.SEARCH_ORDER_BY_ID_FAILURE,
    payload: error
});

export const createOrderStart = (orderData) => ({
    type : OrderActionTypes.CREATE_ORDER_START,
    payload: {orderData}
});

export const createOrderSuccess = (order) => ({
    type : OrderActionTypes.CREATE_ORDER_SUCCESS,
    payload: order
});

export const createOrderFailure = (error) => ({
    type : OrderActionTypes.CREATE_ORDER_FAILURE,
    payload: error
})
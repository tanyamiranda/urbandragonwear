import OrderActionType from './order.types';

export const searchByOrderIdStart = (orderId, email) => ({
    type : OrderActionType.SEARCH_ORDER_BY_ID_START,
    payload: {orderId, email}
});

export const searchByOrderIdSuccess = (order) => ({
    type : OrderActionType.SEARCH_ORDER_BY_ID_SUCCESS,
    payload: order
});

export const searchByOrderIdFailure = (error) => ({
    type : OrderActionType.SEARCH_ORDER_BY_ID_FAILURE,
    payload: error
});
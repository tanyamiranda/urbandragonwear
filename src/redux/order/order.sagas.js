import {takeLatest, put, all, call} from 'redux-saga/effects';

import OrderActionTypes from './order.types';
import {getOrdersByOrderIdAndEmail, addCollectionAndDocuments} from '../../firebase/firebase.utils';
import {formatDisplayDateTime} from '../../components/formatting/display-formatting';
import {searchByOrderIdFailure, 
        searchByOrderIdSuccess,
        createOrderFailure, 
        createOrderSuccess
} from './order.actions'

export function* fetchOrderByIdAndEmail({payload: {orderId, email}}) {
    try {
        const orderMap = yield getOrdersByOrderIdAndEmail(Number(orderId), email);
        yield put(searchByOrderIdSuccess(orderMap));  	
    }
    catch (error) {
        yield put(searchByOrderIdFailure(error.message)); 
    }
}	

export function* onSearchOrderByIdAndEmailStart() {
    yield takeLatest(
        OrderActionTypes.SEARCH_ORDER_BY_ID_START, 
        fetchOrderByIdAndEmail
    )
}

export function* createNewOrder({payload: {orderData} }) {
    
    try {

        const now = Date.now();
        orderData.id = now;
        orderData.createdDate = formatDisplayDateTime(now);

        const orderToLoad = [orderData];

        yield addCollectionAndDocuments('orders', orderToLoad);

        const newOrder = yield getOrdersByOrderIdAndEmail(now, orderData.email);

        yield put(createOrderSuccess(newOrder));

    }
    catch (error) {
        yield put(createOrderFailure(error));
    }
}

export function* onCreateOrderStart() {
    yield takeLatest(
        OrderActionTypes.CREATE_ORDER_START, 
        createNewOrder
    )
}

export function* orderSagas() {
    yield all([
        call(onSearchOrderByIdAndEmailStart),
        call(onCreateOrderStart)	
    ]);
}

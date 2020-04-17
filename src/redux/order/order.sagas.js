import {takeLatest, put, all, call} from 'redux-saga/effects';

import OrderActionTypes from './order.types';
import {getOrdersByOrderIdAndEmail} from '../../firebase/firebase.utils';
import {searchByOrderIdFailure, searchByOrderIdSuccess} from './order.actions'

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

export function* orderSagas() {
    yield all([
        call(onSearchOrderByIdAndEmailStart)			
    ]);
}
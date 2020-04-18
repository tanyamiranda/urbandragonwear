import {takeLatest, put, all, call} from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';
import OrderActionTypes from '../order/order.types';
import {clearShoppingCart} from './cart.actions'

export function* clearShoppingCartOnSignOut() {
    yield put(clearShoppingCart());
}

export function* clearCartOnSignOutSuccess() {
    yield takeLatest(
        UserActionTypes.SIGN_OUT_SUCCCESS, 
        clearShoppingCartOnSignOut
    );
}

export function* clearCartOnOrderCreateSucces() {
    yield takeLatest(
        OrderActionTypes.CREATE_ORDER_SUCCESS, 
        clearShoppingCartOnSignOut
    );
}

export function* cartSagas() {

    // Holds all sagas for the app
    yield all([
        call(clearCartOnSignOutSuccess),
        call(clearCartOnOrderCreateSucces)
    ]);

}
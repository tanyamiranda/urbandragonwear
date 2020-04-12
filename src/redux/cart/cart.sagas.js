import {takeLatest, put, all, call} from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';
import {clearShoppingCart} from './cart.actions'

export function* clearShoppingCartOnSignOut() {
    yield put(clearShoppingCart());
}

export function* onSignOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCCESS, clearShoppingCartOnSignOut);
}

export function* cartSagas() {

    // Holds all sagas for the app
    yield all([
        call(onSignOutSuccess)
    ]);

}
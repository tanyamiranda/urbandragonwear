import {all, call} from 'redux-saga/effects';

import {shopSagas} from './shop/shop.sagas';
import {userSagas} from './user/user.sagas';
import {cartSagas} from './cart/cart.sagas';
import {orderSagas} from './order/order.sagas';

export default function* rootSaga() {

    // Holds all sagas for the app
    yield all([
        call(shopSagas),
        call(userSagas),
        call(cartSagas),
        call(orderSagas)
    ]);

}
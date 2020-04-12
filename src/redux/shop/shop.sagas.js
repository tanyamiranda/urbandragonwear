import {takeLatest, call, all, put} from 'redux-saga/effects'; 

import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firebase.utils';
import ShopActionTypes from './shop.types';
import {fetchCollectionSuccess, fetchCollectionsFailure} from './shop.actions';

export function* fetchCollectionsAsync() {

    try {

        const collectionRef = firestore.collection("collections").orderBy("sortOrder", "asc");

        // By using yield in the next few steps, 
        // you are deferring control back to saga middlewear
        // in case issues arise

        const snapshot = yield collectionRef.get();  

        // call() method just waits until the function of the 1st parameter finishes
        // allows for control in case the function takes too long.
        const collectionsMap = yield call(convertCollectionSnapshotToMap,snapshot);

        // put() is just like dispatch()
        yield put(fetchCollectionSuccess(collectionsMap));

    }
    catch (error) {

        yield put(fetchCollectionsFailure(error.message));

    }

}

export function* fetchCollectionStart() {

    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
        ); 
}

export function* shopSagas() {

    // Holds all sagas for the app
    yield all([
        call(fetchCollectionStart)
    ]);

}
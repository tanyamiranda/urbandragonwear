import ShopActionTypes from './shop.types';
import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

/*
    This fetchCollectionStartAsync() function is part of the
    Thunk implementation for synchronization. It is not used 
    when Sagas is used, since it is its own syncronization system. 

    I kept it here for reference.
*/
export const OLD_fetchCollectionStartAsync = () => {
    return dispatch => {

        dispatch(fetchCollectionsStart());

        const collectionRef = firestore.collection("collections").orderBy("sortOrder", "asc");

        collectionRef.get().then(
            snapshot => {
                const collectionsMap = convertCollectionSnapshotToMap(snapshot);
                dispatch(fetchCollectionSuccess(collectionsMap));
            }
        ).catch(
            error => dispatch(fetchCollectionsFailure(error.message))
            );
        
    }
}

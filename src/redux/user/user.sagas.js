import {takeLatest, put, all, call} from 'redux-saga/effects';

import UserActionTypes from './user.types';
import {auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import {
    signInSuccess, 
    signInFailure, 
    signOutSuccess, 
    signOutFailure,
    signUpSuccess,
    signUpFailure
} from './user.actions';

export function* getSnapshotFromUserAuth(userAuth, additionalData){
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(
            signInSuccess({
                id: userSnapshot.id,
                ...userSnapshot.data()
            })
        );
    }
    catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    }
    catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithEmail({payload: {email, password}}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    }
    catch (error) {
        yield put (signInFailure(error));
    }
}

export function* isUserAuthenticated() {

    try{
        const userAuth = yield getCurrentUser();
        
        // If user is NOT logged in, just return.
        if (!userAuth) return;

        // Else, get user snapshot
        yield getSnapshotFromUserAuth(userAuth);

    }
    catch (error) {
        yield put (signInFailure(error));
    }
}

export function* signOutUser() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    }
    catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* signUp({payload: {email, password, displayName}}) {

    try {
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({user, additionalData: {displayName} }));
    }
    catch (error) {
        yield put(signUpFailure(error));
    }

}

export function* signInAfterSignUp({payload: {user, additionalData} }) {
    yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp );
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onUserSignout() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOutUser);
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION,isUserAuthenticated)
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,signInWithEmail);
}

/*
The userSagas is a list of sagas that is loaded upon initialization of the application. 
It defines which actions to listen for. Specifically, the onGoogleSignInStart call
tells redux-saga that whenever the app dispatchs UserActionTypes.GOOGLE_SIGN_IN_START,
it should execute signInWithGoogle(). Also, whenever the app dispatches 
UserActionTypes.EMAIL_SIGN_IN_START, it should execute signInWithEmail(), 
and so on....
*/
export function* userSagas() {

    // Holds all sagas for the app
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onUserSignout),
        call(onSignUpSuccess),
        call(onSignUpStart)
    ]);

}
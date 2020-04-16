import UserActionTypes from './user.types';

export const setCurrentUser = user => ({
    type : UserActionTypes.SET_CURRENT_USER,
    payload: user
});

export const googleSignInStart = () => ({
    type : UserActionTypes.GOOGLE_SIGN_IN_START
});

export const emailSignInStart = (emailAndPassword) => ({
    type : UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

export const signInSuccess = (user) => ({
    type : UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = (error) => ({
    type : UserActionTypes.SIGN_IN_FAILURE,
    payload: error
});

export const checkUserSession = () => ({
    type : UserActionTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
    type : UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
    type : UserActionTypes.SIGN_OUT_SUCCCESS
});

export const signOutFailure = (error) => ({
    type : UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
});

export const signUpStart = (userCredentials) => ({
    type : UserActionTypes.SIGN_UP_START,
    payload: userCredentials
});

export const signUpSuccess = ({ user, additionalData}) => ({
    type : UserActionTypes.SIGN_UP_SUCCESS,
    payload: {user, additionalData}
});

export const signUpFailure = (error) => ({
    type : UserActionTypes.SIGN_UP_FAILURE,
    payload: error
});

export const fetchCurrentUserOrdersStart = () => ({
    type : UserActionTypes.FETCH_CURRENT_USER_ORDERS_START
});

export const fetchCurrentUserOrdersSuccess = (orderHistory) => ({
    type : UserActionTypes.FETCH_CURRENT_USER_ORDERS_SUCCESS,
    payload: orderHistory
});

export const fetchCurrentUserOrdersFailure = (error) => ({
    type: UserActionTypes.FETCH_CURRENT_USER_ORDERS_FAILURE,
    payload: error
});
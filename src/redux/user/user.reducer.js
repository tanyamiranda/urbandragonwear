import UserActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    orderHistory: [],
    error: null    
}

const userReducer = (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS: 
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        case UserActionTypes.SIGN_OUT_SUCCCESS: 
            return {
                ...state,
                currentUser: null,
                orderHistory: [],
                error: null
            }
        case UserActionTypes.SIGN_UP_SUCCESS: 
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        
        case UserActionTypes.FETCH_CURRENT_USER_ORDERS_SUCCESS: 
            return {
                ...state,
                orderHistory: action.payload
            }

        case UserActionTypes.FETCH_ORDERS_BY_EMAIL_FAILURE:
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE: 
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }

}

export default userReducer;
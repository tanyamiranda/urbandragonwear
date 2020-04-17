import OrderActionTypes from './order.types';

const INITIAL_STATE = {
    order: null,
    error: null
}

const orderReducer = (state = INITIAL_STATE, action) => {

    switch(action.type) {

        // exisiting reducers...

        case OrderActionTypes.SEARCH_ORDER_BY_ID_SUCCESS: 
            return {
                ...state,
                order: action.payload,
                error: null
            }
        case OrderActionTypes.SEARCH_ORDER_BY_ID_FAILURE: 
            return {
                ...state,
                order: null,
                error: action.payload
            }
        default: 
            return state;
    }
}

export default orderReducer;
    
        
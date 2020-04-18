import OrderActionTypes from './order.types';

const INITIAL_STATE = {
    searchOrder: null,
    newOrder: null,
    error: null
}

const orderReducer = (state = INITIAL_STATE, action) => {

    switch(action.type) {

        // exisiting reducers...

        case OrderActionTypes.SEARCH_ORDER_BY_ID_SUCCESS: 
            return {
                ...state,
                searchOrder: action.payload,
                newOrder: null,
                error: null
            }
        case OrderActionTypes.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                newOrder: action.payload,
                searchOrder: null,
                error: null
            }

        case OrderActionTypes.CREATE_ORDER_FAILURE: 
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
    
        
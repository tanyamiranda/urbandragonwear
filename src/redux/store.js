import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import {persistStore} from 'redux-persist';
//import thunk from 'redux-thunk'; //using saga for now.
import createSagaMiddleware from 'redux-saga';

import rootSaga from './root-saga';

// !!!IMPORTANT READ!!!! 
// Saga will replace the use of Thunk, 
// but I will NOT delete the thunk-specific code 
// but just comment it out.


// This object is create to hold all middleware calls
// the applyMiddleware() function can actually take
// just the logger import, but we are using more 
// objects in the future, so an array is better  
const middlewareObjects = []; 
//middlewareObjects.push(thunk);  //using saga for now.

const sagaMiddleware = createSagaMiddleware();

middlewareObjects.push(sagaMiddleware);

//Only use logger in development environement
if (process.env.NODE_ENV === 'development') {
    middlewareObjects.push(logger);
}

// Using ...middlewareObjects spreads all objects as 
// individual parameters in the function. Otherwise,
// we could just list them out.
export const store = createStore(rootReducer, applyMiddleware(...middlewareObjects));

sagaMiddleware.run(rootSaga); 

export const persistor = persistStore(store);

export default {store, persistor};
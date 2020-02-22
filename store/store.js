import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { countReducer, countInitialState } from './reducers/countReducer';
import { userReducer, userInitialState } from './reducers/userReducer';

const allReducer = combineReducers({
  counter: countReducer,
  user: userReducer,
});

const initialState = {
  counter: countInitialState,
  user: userInitialState,
};

const store = createStore(allReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;

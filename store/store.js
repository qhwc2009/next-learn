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

export default function inirializeStore(state = {}) {
  const store = createStore(
    allReducer,
    { ...initialState, ...state },
    composeWithDevTools(applyMiddleware(thunk)),
  );
  return store;
}

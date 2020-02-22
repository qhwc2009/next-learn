import { UPDATE_NAME } from '../actions/userAction';

export const userInitialState = {
  userName: 'Jorky',
};

export function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case UPDATE_NAME:
      return {
        userName: action.payload,
      };

    default:
      return state;
  }
}

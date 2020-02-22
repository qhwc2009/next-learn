import { ADD } from '../actions/countAction';

export const countInitialState = {
  count: 0,
};

export function countReducer(state = countInitialState, action) {
  switch (action.type) {
    case ADD:
      return {
        count: state.count + action.payload,
      };

    default:
      return state;
  }
}

export const ADD = 'ADD';

export function add(num) {
  return {
    type: ADD,
    payload: num,
  };
}

export function addAsync(num) {
  return dispatch => {
    setTimeout(() => {
      dispatch(add(num));
    }, 1000);
  };
}

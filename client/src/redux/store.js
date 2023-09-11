import { createStore } from "redux";

const reducerFunc = (state = {}, action) => {
  switch (action.type) {
    case 'username':
      state = { ...state, username: action.payload };
      break;
  }
  return state;
}

const store = createStore(reducerFunc);

export default store;
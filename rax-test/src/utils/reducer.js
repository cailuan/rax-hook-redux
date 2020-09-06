import { createElement, useRef, forwardRef, useReducer, useContext, createContext } from 'rax';

export const initialState = { count: 0 };

export function reducer(state, action) {
  console.log('dispatch reducer',state, action)
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'increment':
      
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      // A reducer must always return a valid state.
      // Alternatively you can throw an error if an invalid action is dispatched.
      return state;
  }
}
export const Context = createContext({});
import { createActions, createReducer } from "reduxsauce";

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
  addTodo: ["text"],
  toggleTodo: ["id"],
  removeTodo: ["id"]
});

/**
 * Handlers
 */
const INITIAL_STATE: any[] = [];

const add = (state = INITIAL_STATE, action: any) => [
  ...state,
  { id: Math.random(), text: action.text, complete: false }
];

const toggle = (state = INITIAL_STATE, action: any) =>
  state.map(
    todo =>
      todo.id === action.id ? { ...todo, complete: !todo.complete } : todo
  );

const remove = (state = INITIAL_STATE, action: any) =>
  state.filter(todo => todo.id !== action.id);

/**
 * Reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.ADD_TODO]: add,
  [Types.TOGGLE_TODO]: toggle,
  [Types.REMOVE_TODO]: remove
});
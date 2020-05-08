import { createActions, createReducer } from "reduxsauce";
import { AsyncStorage } from "react-native";

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
  setAlert: ["data"],
  removeAlert: ["Id"]
});

export interface AlertReducer{
    Id: Number,
    Message: String,
    TypeMessage: String,
    Date: Date | String,
    NameIcon: String,
    Style: any
  }

/**
 * Handlers
 */
const INITIAL_STATE:AlertReducer[] = [];

const set = (state = INITIAL_STATE, action:{ data: AlertReducer} ) => {
  return [...state, { ...action.data, Date: Date.now(), Id: Math.floor(Math.random() * 100) + 1 } ];
};

const remove = (state = INITIAL_STATE, action: { id: Number } ) =>
  state.filter(msg => msg.Id !== action.id);

/**
 * Reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.SET_ALERT]: set,
  [Types.REMOVE_ALERT]: remove
});
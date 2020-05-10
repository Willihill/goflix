import { createActions, createReducer } from "reduxsauce";
import { AsyncStorage } from "react-native";

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
  setUser: ["user"],
  removeUser: ["id"]
});

export interface UserReducer{
    name: string,
    surname: string,
    email: string,
    picture: string,
    birthday: string,
    gender: string,
    tokenJwt: string
}

export declare interface ToggleUserLocation{
    latitude?: Number,
    longitude?: Number,
}

/**
 * Handlers
 */
const INITIAL_STATE:UserReducer = {
    name: '',
    surname: '',
    email: '',
    picture: '',
    birthday: '',
    gender: '',
    tokenJwt: ''
};

const set = (state = INITIAL_STATE, action:{ user: UserReducer} ) => {
    const newState : UserReducer = { ...state, ...action.user };
    return { ...state, ...action.user };
};

const remove = (state = INITIAL_STATE, action: any) => INITIAL_STATE;

/**
 * Reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.SET_USER]: set,
  [Types.REMOVE_USER]: remove
});
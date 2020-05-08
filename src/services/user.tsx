import { UserReducer } from "../store/ducks/user";

export const SaveUser = (dispatch: any, user: UserReducer) => {
    dispatch({type: "UPDATE_USER", data: user});

    // dispatch({type: "SET_USER", data: { 
    //     name: user.name,
    //     pictureUrl: user.pictureUrl,
    //     lat: user.lat || 0,
    //     lng: user.lng || 0,
    //     status: user.status || 0,
    //     clientId: user.clientId || 0,
    //     isAuthenticated: user.isAuthenticated,
    //     requiredStatusInitial: user.requiredStatusInitial
    //  }});    
}
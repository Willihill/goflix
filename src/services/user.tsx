import { UserReducer } from "../store/ducks/user";
import { AsyncStorage } from "react-native";

export const SaveUser = async (dispatch: any, user: UserReducer) => {   
    // Salva o user na AsyncStorage
    await AsyncStorage.setItem("user_name", user.name);
    await AsyncStorage.setItem("user_surname", user.surname ?? "");
    await AsyncStorage.setItem("user_email", user.email);
    await AsyncStorage.setItem("user_picture", user.picture);
    await AsyncStorage.setItem("user_birthday", user.birthday);
    await AsyncStorage.setItem("user_gender", user.gender);
    await AsyncStorage.setItem("tokenJwt", user.tokenJwt);

    dispatch({type: "SET_USER", user});  
}
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../../store";
import {AnyAction} from "redux";
import {editProfileApi} from "../../../api/editProfileApi";
import {authReducerType} from "./authReducer";


export const editProfileAR = (name: string, avatar: string) => {
    return {
        type: 'EDIT_PROFILE_DATA',
        payload: {
            name,
            avatar,
        },
    } as const
}

export const setProfileData = (userData: authReducerType) =>
    ({
        type: 'SET_PROFILE_DATA',
        payload: {
            userData,
        },
    } as const)

export const editProfileTC = (name: string, avatar: string): ThunkAction<void, AppStateType, unknown, AnyAction> =>
    dispatch => {
        editProfileApi
            .updateProfile(name, avatar)
            .then(res =>
                dispatch(editProfileAR(res.data.updatedUser.name, res.data.updatedUser.avatar))
            )
    }

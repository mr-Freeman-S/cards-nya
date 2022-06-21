import {initialStateType, RES_PATH} from "./restorePasswordReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../../store";
import {AnyAction} from "redux";
import {restorePasswordAPI} from "../../../api/restorePasswordAPI";


// action creators
export const setEmailRP = (email: string) => {
    return {type: RES_PATH.SET_EMAIL, email} as const;
}
export const setNewPasswordRP = (password: string) => {
    return {type: RES_PATH.SET_NEW_PASSWORD, password} as const;
}
export const setStatusRP = (status: initialStateType["status"]) => {
    return {type: RES_PATH.SET_STATUS, status} as const;
}
export const setErrorMessageRP = (error: string) => {
    return {type: RES_PATH.SET_ERROR, error} as const
}


//thunks
export const sendMailRestorePassword = (email: string): ThunkAction<void, AppStateType, unknown, AnyAction> =>
    (dispatch) => {
        dispatch(setStatusRP("loading"))
        dispatch(setEmailRP(email))
        restorePasswordAPI.sendRestorePasswordEmail(email)
            .then(() => {
                dispatch(setStatusRP("succeeded"))
            })
            .catch(error => {
                dispatch(setErrorMessageRP(error.response.data.error))
                dispatch(setStatusRP("error"))
            });
    };
export const resetPassword = (password: string, resetPasswordToken: string, resetForm: () => void): ThunkAction<void, AppStateType, unknown, AnyAction> =>
    (dispatch) => {
        dispatch(setStatusRP("loading"))
        restorePasswordAPI.createNewPassword(password, resetPasswordToken)
            .then(() => {
                dispatch(setStatusRP("succeeded"))
            })
            .catch(error => {
                dispatch(setErrorMessageRP(error.response.data.error))
                dispatch(setStatusRP("error"))
            })
        resetForm()
    }
//  properties type for action creators
import {AnyAction} from "redux";
import {AppStateType} from "../store";
import {restorePasswordAPI} from "../../api/restorePasswordAPI";
import {ThunkAction} from "redux-thunk";

const SET_EMAIL = 'restorePassword/SET-EMAIL'
const SET_NEW_PASSWORD = 'restorePassword/SET-NEW-PASSWORD'
const SET_STATUS = 'restorePassword/SET-STATUS'
const SET_ERROR = 'restorePassword/SET-ERROR'

// init state
type initialStateType = {
    email: string,
    newPassword: string
    status: 'idle' | 'loading' | 'succeeded' | 'error',
    error: string
}
const initialStateRP: initialStateType = {
    email: '',
    newPassword: '',
    status: 'idle',
    error: ''
}

// reducer
export const restorePasswordReducer = (state = initialStateRP, action: RestorePasswordReducerActionTypes) => {
    switch (action.type) {
        case SET_EMAIL:
            return {...state, email: action.email}
        case SET_NEW_PASSWORD:
            return {...state, newPassword: action.password}
        case SET_STATUS:
            return {...state, status: action.status}
        case SET_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}
// action creators
export const setEmailRP = (email: string) => {
    return {type: SET_EMAIL, email} as const;
}
export const setNewPasswordRP = (password: string) => {
    return {type: SET_NEW_PASSWORD, password} as const;
}
export const setStatusRP = (status: initialStateType["status"]) => {
    return {type: SET_STATUS, status} as const;
}
export const setErrorMessageRP = (error: string) => {
    return {type: SET_ERROR, error} as const
}
// types action creators
type setEmailType = ReturnType<typeof setEmailRP>
type setNewPasswordType = ReturnType<typeof setNewPasswordRP>
type setStatusType = ReturnType<typeof setStatusRP>
type setErrorMessageType = ReturnType<typeof setErrorMessageRP>
export type RestorePasswordReducerActionTypes = setEmailType | setNewPasswordType | setStatusType | setErrorMessageType

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
export const resetPassword = (password: string, resetPasswordToken: string,resetForm:()=>void): ThunkAction<void, AppStateType, unknown, AnyAction> =>
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
//  properties type for action creators
import {Dispatch} from "redux";
import {AppStateType} from "../store";
import {restorePasswordAPI} from "../../api/restorePasswordAPI";

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
export const restorePasswordReducer = (state = initialStateRP, action: rootActionTypes) => {
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
type rootActionTypes = setEmailType | setNewPasswordType | setStatusType | setErrorMessageType

//thunks
export const sendMailRestorePassword = (email: string) => (dispatch: Dispatch, getState: () => AppStateType) => {
    dispatch(setStatusRP("loading"))
    dispatch(setEmailRP(email))
    restorePasswordAPI.sendRestorePasswordEmail(email)
        .then(response => {
            dispatch(setStatusRP("succeeded"))
        })
        .catch(error => {
            dispatch(setErrorMessageRP(error.error))
            dispatch(setStatusRP("error"))
        })
}
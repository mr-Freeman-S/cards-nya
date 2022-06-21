import {setEmailRP, setErrorMessageRP, setNewPasswordRP, setStatusRP} from "./restorePasswordThunkAction";

export enum RES_PATH {
    SET_EMAIL = 'restorePassword/SET-EMAIL',
    SET_NEW_PASSWORD = 'restorePassword/SET-NEW-PASSWORD',
    SET_STATUS = 'restorePassword/SET-STATUS',
    SET_ERROR = 'restorePassword/SET-ERROR'
}

// init state
export type initialStateType = {
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
        case RES_PATH.SET_EMAIL:
            return {...state, email: action.email}
        case RES_PATH.SET_NEW_PASSWORD:
            return {...state, newPassword: action.password}
        case RES_PATH.SET_STATUS:
            return {...state, status: action.status}
        case RES_PATH.SET_ERROR:
            return {...state, error: action.error}
        default:
            return state
    }
}

// types action creators
type setEmailType = ReturnType<typeof setEmailRP>
type setNewPasswordType = ReturnType<typeof setNewPasswordRP>
type setStatusType = ReturnType<typeof setStatusRP>
type setErrorMessageType = ReturnType<typeof setErrorMessageRP>
export type RestorePasswordReducerActionTypes = setEmailType | setNewPasswordType | setStatusType | setErrorMessageType


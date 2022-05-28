//  properties type for action creators
const SET_EMAIL = 'restorePassword/SET-EMAIL'
const SET_NEW_PASSWORD = 'restorePassword/SET-NEW-PASSWORD'
const SET_STATUS = 'restorePassword/SET-STATUS'

// init state
type initialStateType = {
    email: string,
    newPassword: string
    status: 'idle' | 'loading' | 'succeeded' | 'error'
}
const initialStateRP: initialStateType = {
    email: '',
    newPassword: '',
    status: 'idle'
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
// types action creators
type setEmailType = ReturnType<typeof setEmailRP>
type setNewPasswordType = ReturnType<typeof setNewPasswordRP>
type setStatusType = ReturnType<typeof setStatusRP>
type rootActionTypes = setEmailType | setNewPasswordType | setStatusType
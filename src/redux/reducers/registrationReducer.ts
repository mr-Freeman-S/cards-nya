import {Dispatch} from "redux";
import {registrationAPI, RegistrationParamsType} from "../../api/registrationAPI";

const initialState = {
    isRegisteredIn: false,
    error: null as ErrorType,
    isLoading: false
}
type InitialStateType = typeof initialState

export const registrationReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'registration/SET-IS-REGISTERED-IN':
            return {...state, isRegisteredIn: action.value}
        case "registration/SET-ERROR":
            return {...state, error: action.error}
        case "registration/SET-LOADING":
            return {...state, isLoading: action.isLoading}
        default:
            return state
    }
}
// actions
export const setIsRegisteredInAC = (value: boolean) => ({type: 'registration/SET-IS-REGISTERED-IN', value} as const)
export const setErrorAC = (error: ErrorType) => ({type: 'registration/SET-ERROR', error} as const)
export const setLoadingAC = (isLoading: boolean) => ({type: 'registration/SET-LOADING', isLoading} as const)

// thunks
export const registerTC = (data: RegistrationParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setErrorAC(null))
    registrationAPI.registration(data)
        .then(() => {
            dispatch(setIsRegisteredInAC(true))
        })
        .catch((error) => {
            dispatch(setErrorAC(error.response.data.error));
        })
        .finally(() => {
            dispatch(setLoadingAC(false))
        })
}

// types
type ActionsType = ReturnType<typeof setIsRegisteredInAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setLoadingAC>
export type ErrorType = string | null
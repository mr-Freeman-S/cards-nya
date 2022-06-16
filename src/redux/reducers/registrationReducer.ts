import {AnyAction} from "redux";
import {registrationAPI, RegistrationParamsType} from "../../api/registrationAPI";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../store";

const initialState = {
    isRegistered: false,
    error: null as ErrorType,
    isLoading: false
}
type InitialStateType = typeof initialState

export const registrationReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'registration/SET-IS-REGISTERED':
            return {...state, isRegistered: action.value}
        case "registration/SET-ERROR":
            return {...state, error: action.error}
        case "registration/SET-LOADING":
            return {...state, isLoading: action.isLoading}
        default:
            return state
    }
}
// actions
export const setIsRegisteredAC = (value: boolean) => ({type: 'registration/SET-IS-REGISTERED', value} as const)
export const setErrorAC = (error: ErrorType) => ({type: 'registration/SET-ERROR', error} as const)
export const setLoadingAC = (isLoading: boolean) => ({type: 'registration/SET-LOADING', isLoading} as const)

// thunks
export const registerTC = (data: RegistrationParamsType, resetForm: () => void): ThunkAction<void, AppStateType, unknown, AnyAction> =>
    (dispatch) => {
        dispatch(setLoadingAC(true))
        registrationAPI.registration(data)
            .then(() => {
                dispatch(setIsRegisteredAC(true))
            })
            .catch((error) => {
                if (error.response.data.error.length) {
                    dispatch(setErrorAC(error.response.data.error))
                } else {
                    dispatch(setErrorAC('Some error occurred'))
                }
                dispatch(setLoadingAC(false))
            })
            .finally(() => {
                dispatch(setLoadingAC(false))
                resetForm()
            })
    }

// types
type ActionsType = ReturnType<typeof setIsRegisteredAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setLoadingAC>
export type ErrorType = string | null
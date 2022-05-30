import {Dispatch} from "redux";
import {registrationAPI, RegistrationParamsType} from "../../api/registrationAPI";

const initialState = {
    isRegisteredIn: false,
    error: null as ErrorType
}
type InitialStateType = typeof initialState

export const registrationReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'registration/SET-IS-REGISTERED-IN':
            return {...state, isRegisteredIn: action.value}
        case "registration/SET-ERROR":
            return {...state, error: action.error }
        default:
            return state
    }
}
// actions
export const setIsRegisteredInAC = (value: boolean) => ({type: 'registration/SET-IS-REGISTERED-IN', value} as const)
export const setErrorAC = (error: ErrorType) => ({type: 'registration/SET-ERROR', error} as const)

// thunks
export const registerTC = (data: RegistrationParamsType) => (dispatch: Dispatch<ActionsType>) => {
    registrationAPI.registration(data)
        .then(() => {
            dispatch(setIsRegisteredInAC(true))
        })
        .catch((error) => {
            dispatch(setErrorAC(error));
        })
}

// types
type ActionsType = ReturnType<typeof setIsRegisteredInAC> | ReturnType<typeof setErrorAC>
export type ErrorType = string | null
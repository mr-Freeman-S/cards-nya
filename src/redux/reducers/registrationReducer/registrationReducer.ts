import {setErrorAC, setIsRegisteredAC, setLoadingAC} from "./registrationThunkAction";

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

// types
type ActionsType = ReturnType<typeof setIsRegisteredAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setLoadingAC>
export type ErrorType = string | null
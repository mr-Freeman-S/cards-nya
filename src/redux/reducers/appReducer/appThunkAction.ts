import {ErrorType} from "./appReducer";
//AC


export const setErrorMessageAC = (errorMessage: ErrorType) => {
    return {type: "APP/SET-ERROR-MESSAGE", errorMessage} as const
}
export const setInitializedAC = (isInitialized: boolean) => {
    return {type: 'APP/SET-INITIALIZED', isInitialized} as const
}

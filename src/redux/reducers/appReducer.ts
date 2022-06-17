const initialState = {
    errorMessage: null as ErrorType,
    isInitialized: false
}


export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-ERROR-MESSAGE":
            return {...state, errorMessage: action.errorMessage}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

//AC
export const setErrorMessageAC = (errorMessage: ErrorType) => {
    return {type: "APP/SET-ERROR-MESSAGE", errorMessage} as const
}
export const setInitializedAC = (isInitialized: boolean) => {
    return {type: 'APP/SET-INITIALIZED', isInitialized} as const
}


//Types
export type AppReducerActionType = ReturnType<typeof setErrorMessageAC>
    | ReturnType<typeof setInitializedAC>
type InitialStateType = typeof initialState
export type ErrorType = string | null
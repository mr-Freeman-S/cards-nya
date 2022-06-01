const initialState = {
    errorMessage: ''
}


export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-ERROR-MESSAGE":
            return  {...state, errorMessage: action.errorMessage}
        default:
            return  state
    }
}

//AC
export const setErrorMessageAC = (errorMessage: string) => {
    return {type: "APP/SET-ERROR-MESSAGE", errorMessage} as  const
}

export type AppReducerActionType = ReturnType<typeof setErrorMessageAC>

//Types
type InitialStateType = typeof initialState
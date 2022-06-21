import {setIsLoggedAC} from "./loginThunkAction";

const initialState = {
    isLogged: false,
}

export const loginReducer = (
    state: InitialStateType = initialState,
    action: LoginReducerActionType
): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-STATUS':
            return {...state, isLogged: action.isLogged}
        default:
            return state
    }
}


//Types
type InitialStateType = typeof initialState

export type LoginReducerActionType = ReturnType<typeof setIsLoggedAC>

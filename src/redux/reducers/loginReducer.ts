import {loginAPI} from '../../api/loginAPI'
import {ThunkType} from '../store'
import {setErrorMessageAC, setInitializedAC} from './appReducer'
import {authReducerType, setProfileData} from './authReducer'

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

//AC
export const setIsLoggedAC = (isLogged: boolean) => {
    return {type: 'LOGIN/SET-IS-LOGGED-STATUS', isLogged} as const
}

//Thunks
export const loginTC = (email: string, password: string, rememberMe: boolean, resetForm: () => void): ThunkType =>
    dispatch => {
        loginAPI
            .login({email, password, rememberMe})
            .then(res => {
                dispatch(setIsLoggedAC(true))
                dispatch(setProfileData(res.data))
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : e.message + ', more details in the console'
                dispatch(setErrorMessageAC(error))
            })
            .finally(() => {
                resetForm()
            })
    }
export const authMe = (): ThunkType => dispatch => {
    loginAPI
        .auth()
        .then(res => {
            dispatch(setIsLoggedAC(true))
            dispatch(setProfileData(res.data))
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : e.message + ', more details in the console'
            dispatch(setErrorMessageAC(error))
        })
        .finally(() => dispatch(setInitializedAC(true)))
}
export const logoutTC = (): ThunkType => dispatch => {
    loginAPI
        .logout()
        .then(() => {
            dispatch(setIsLoggedAC(false))
            dispatch(setProfileData({} as authReducerType))
        })
}

//Types
type InitialStateType = typeof initialState

export type LoginReducerActionType = ReturnType<typeof setIsLoggedAC>

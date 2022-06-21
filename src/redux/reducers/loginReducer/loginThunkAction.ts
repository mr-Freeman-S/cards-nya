import {ThunkType} from "../../store";
import {loginAPI} from "../../../api/loginAPI";
import {setProfileData} from "../authReducer/authThunkAction";
import {setErrorMessageAC, setInitializedAC} from "../appReducer/appThunkAction";
import {authReducerType} from "../authReducer/authReducer";


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

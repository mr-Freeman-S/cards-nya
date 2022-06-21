import {registrationAPI, RegistrationParamsType} from "../../../api/registrationAPI";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../../store";
import {AnyAction} from "redux";
import {ErrorType} from "./registrationReducer";


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

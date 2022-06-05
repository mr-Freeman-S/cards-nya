import {AnyAction} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {editProfileApi} from '../../api/editProfileApi'
import {AppStateType} from '../store'

export type authReducerType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}

const initialState = {} as authReducerType

export const authReducer = (state = initialState, action: GeneralType) => {
    switch (action.type) {
        case 'EDIT_PROFILE_DATA':
            return {
                ...state,
                name: action.payload.name,
                avatar: action.payload.avatar,
            }
        case 'SET_PROFILE_DATA':
            let newState = {...state}
            newState = {...action.payload.userData}
            return newState
        default:
            return state
    }
}

export type GeneralType =
    | ReturnType<typeof editProfileAR>
    | ReturnType<typeof setProfileData>

export const editProfileAR = (name: string, avatar: string) => {
    return {
        type: 'EDIT_PROFILE_DATA',
        payload: {
            name,
            avatar,
        },
    } as const
}

export const setProfileData = (userData: authReducerType) =>
    ({
        type: 'SET_PROFILE_DATA',
        payload: {
            userData,
        },
    } as const)

export const editProfileTC =
    (
        name: string,
        avatar: string
    ): ThunkAction<void, AppStateType, unknown, AnyAction> =>
        dispatch => {
            editProfileApi
                .updateProfile(name, avatar)
                .then(res =>
                    dispatch(
                        editProfileAR(res.data.updatedUser.name, res.data.updatedUser.avatar)
                    )
                )
        }

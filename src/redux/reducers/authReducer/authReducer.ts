import {AnyAction} from 'redux'
import {ThunkAction} from 'redux-thunk'
import {editProfileApi} from '../../../api/editProfileApi'
import {AppStateType} from '../../store'
import {editProfileAR, setProfileData} from "./authThunkAction";

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


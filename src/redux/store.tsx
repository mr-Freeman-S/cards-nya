import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {setCheckType, testReducer} from './reducers/testReducer'
import {authReducer, GeneralType} from './reducers/authReducer'
import {appReducer, AppReducerActionType} from "./reducers/appReducer";
import {loginReducer, LoginReducerActionType} from "./reducers/loginReducer";
import {registrationReducer} from "./reducers/registrationReducer";
import {restorePasswordReducer, RestorePasswordReducerActionTypes} from "./reducers/restorePasswordReducer";
import {packsCardReducer, PacksReducerActionType} from "./reducers/packsCardReducer";
import {cardsReducer, CardsReducerActionType} from "./reducers/cardsReducer";

const rootReducer = combineReducers({
    test: testReducer,
    auth: authReducer,
    app: appReducer,
    login: loginReducer,
    registration: registrationReducer,
    resPassword: restorePasswordReducer,
    packsCard: packsCardReducer,
    cards: cardsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
//@ts-ignore
window.store = store
//types
export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
// hooks

// useSelector and useDispatch
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
//export const useAppDispatch =()=> useDispatch<ThunkType>()
export const useAppDispatch = () =>
    useDispatch<ThunkDispatch<AppStateType, unknown, AppActionsType>>()


export type AppActionsType =
    LoginReducerActionType
    | AppReducerActionType
    | GeneralType
    | PacksReducerActionType
    | setCheckType
    | RestorePasswordReducerActionTypes
    | CardsReducerActionType
export type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store // for dev
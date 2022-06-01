import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {testReducer} from './reducers/testReducer'
import {authReducer, GeneralType} from './reducers/authReducer'
import {appReducer, AppReducerActionType} from "./reducers/appReducer";
import {loginReducer, LoginReducerActionType} from "./reducers/loginReducer";

const rootReducer = combineReducers({
	test: testReducer,
	auth: authReducer,
    app: appReducer,
    login: loginReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk))
//types
export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
// hooks

// useSelector and useDispatch
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
//export const useAppDispatch =()=> useDispatch<ThunkType>()
export const useAppDispatch = () =>
    useDispatch<ThunkDispatch<AppStateType, unknown, AnyAction>>()


export type AppActionsType = LoginReducerActionType | AppReducerActionType | GeneralType
export type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionsType>
import {applyMiddleware, combineReducers, createStore } from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {testReducer} from "./reducers/testReducer";
import {loginReducer, LoginReducerActionType} from "./reducers/loginReducer";
import {appReducer, AppReducerActionType} from "./reducers/appReducer";

const rootReducer = combineReducers({
    test:testReducer,
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
export const useAppDispatch =()=> useDispatch<AppDispatch>()

export type AppActionsType = LoginReducerActionType | AppReducerActionType

export type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionsType>
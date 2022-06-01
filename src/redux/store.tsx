import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { testReducer } from './reducers/testReducer'
import { authReducer } from './reducers/authReducer'
import {restorePasswordReducer} from "./reducers/restorePasswordReducer";

const rootReducer = combineReducers({
	test: testReducer,
	auth: authReducer,
	resPassword:restorePasswordReducer

})

export const store = createStore(rootReducer, applyMiddleware(thunk))
//types
export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

// hooks

// useSelector and useDispatch
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
// export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppDispatch = () =>
	useDispatch<ThunkDispatch<AppStateType, unknown, AnyAction>>()

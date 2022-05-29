import {applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {testReducer} from "./reducers/testReducer";

const rootReducer = combineReducers({
    test:testReducer,
})

export const store = createStore(rootReducer,applyMiddleware(thunk))
//types
export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
// hooks

// useSelector and useDispatch
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
export const useAppDispatch =()=> useDispatch<AppDispatch>()
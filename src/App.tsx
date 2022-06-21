import './App.css'
import {useAppDispatch, useAppSelector} from "./redux/store";
import React, {useEffect} from "react";
import {PrivateRoute} from "./components/Routing/PrivateRoute";
import Header from "./components/Header/Header";
import {Preloader} from "./components/Preloader/Preloader";
import {ErrorSnackbar} from "./components/ErrorSnackBar/ErrorSnackBar";
import {authMe} from "./redux/reducers/loginReducer/loginThunkAction";

function App() {
    const isAuth = useAppSelector(state => state.login.isLogged)
    const isInit = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authMe())
    }, [dispatch])

    return (
        <div>
            <ErrorSnackbar/>
            <Header isAuth={isAuth}/>
            {!isInit ? <Preloader isActive={!isInit}/> : <PrivateRoute/>}
        </div>
    )
}

export default App

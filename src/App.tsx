import './App.css'
import {useAppDispatch, useAppSelector} from "./redux/store";
import React, {useEffect} from "react";
import {authMe, logoutTC} from "./redux/reducers/loginReducer";
import {PrivateRoute} from "./components/Routing/PrivateRoute";
import {Loader} from "./components/Loader/Loader";
import Header from "./components/Header/Header";
import {UniverseModalWindow} from "./components/UniverseModal/UniverseModalWindow";
import {Preloader} from "./components/Preloader/Preloader";

function App() {
    const isAuth = useAppSelector(state => state.login.isLogged)
    const isInit = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispatch()
    const logoutButtonHandler = () => {
        dispatch(logoutTC())
    }
    useEffect(() => {
        dispatch(authMe())
    }, [dispatch])
    console.log(isInit)
    return (
        <div>
            {/*<Navbar/>*/}
            <Header isAuth={isAuth}/>
            {!isInit ?  <Preloader isActive={!isInit}/> : <PrivateRoute/>}
        </div>
    )
}

export default App

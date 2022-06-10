import './App.css'
import Navbar from './components/Navbar/Navbar'
import {useAppDispatch, useAppSelector} from "./redux/store";
import {useEffect} from "react";
import {authMe, logoutTC} from "./redux/reducers/loginReducer";
import SuperButton from "./components/SuperButton/SuperButton";
import {PrivateRoute} from "./components/Routing/PrivateRoute";
import {Loader} from "./components/Loader/Loader";
import Header from "./components/Header/Header";

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
    return (
        <div>
            <Navbar/>
            <Header isAuth={isAuth}/>
            {!isInit ? <Loader/> : <PrivateRoute/>}
        </div>
    )
}

export default App

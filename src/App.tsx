import './App.css'
import Navbar from './components/Navbar/Navbar'
import {useAppDispatch, useAppSelector} from "./redux/store";
import {useEffect} from "react";
import {authMe, logout} from "./redux/reducers/loginReducer";
import SuperButton from "./components/SuperButton/SuperButton";
import {PrivateRoute} from "./components/Routing/PrivateRoute";
import {Loader} from "./components/Loader/Loader";

function App() {
    const isAuth = useAppSelector(state => state.login.isLogged)
    const isInit = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispatch()
    const logoutButtonHandler = () => {
        dispatch(logout())

    }
    useEffect(() => {
        dispatch(authMe())
    }, [dispatch])
    return (
        <div>
            <Navbar/>
            {isAuth && <SuperButton onClick={logoutButtonHandler}>Logout</SuperButton>}
            {!isInit ? <Loader/> : <PrivateRoute/>}
        </div>
    )
}

export default App

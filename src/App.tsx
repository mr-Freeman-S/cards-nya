import './App.css'
import Navbar from './components/Navbar/Navbar'
import { PrivateRoute } from './components/Routing/PrivateRoute'
import SuperButton from "./components/SuperButton/SuperButton";
import {useAppDispatch, useAppSelector} from "./redux/store";
import {useEffect} from "react";
import {authMe, logout} from "./redux/reducers/loginReducer";

function App() {
	const isAuth = useAppSelector(state => state.login.isLogged)
	const dispatch = useAppDispatch()
	const logoutButtonHandler = () => {
		dispatch(logout())

	}
	useEffect(()=> {
	dispatch(authMe())
	},[dispatch])
	return (
		<div>
			<Navbar />
			{isAuth && <SuperButton onClick={logoutButtonHandler}>Logout</SuperButton>}
			<PrivateRoute />
		</div>
	)
}

export default App

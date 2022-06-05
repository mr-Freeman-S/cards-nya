import './App.css'
import Navbar from './components/Navbar/Navbar'
import { PrivateRoute } from './components/Routing/PrivateRoute'
import SuperButton from "./components/SuperButton/SuperButton";
import {useAppDispatch} from "./redux/store";
import {useEffect} from "react";
import {authMe, logout} from "./redux/reducers/loginReducer";

function App() {
	const dispatch = useAppDispatch()
	const logoutButtonHandler = () => {
		dispatch(logout())

	}
	useEffect(()=> {
	dispatch(authMe())
	},[])
	return (
		<div>
			<Navbar />
			<SuperButton onClick={logoutButtonHandler}>Logout</SuperButton>
			<PrivateRoute />
		</div>
	)
}

export default App

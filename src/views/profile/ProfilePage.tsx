import {Navigate} from 'react-router-dom'
import {useAppSelector} from '../../redux/store'
import {Search} from "../search/Search";

export const ProfilePage = () => {
    const {isLogged} = useAppSelector(state => state.login)

    if (!isLogged) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <div>Profile page</div>
            <Search/>
        </>
    )
}

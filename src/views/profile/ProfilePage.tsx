import {Navigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../redux/store'
import style from './ProfilePage.module.css'
import userNotFound from '../../assets/images/user-not-found.png'
import {useEffect, useState} from "react";
import {setUserIdPacksAC} from "../../redux/reducers/packsCardReducer";

export const ProfilePage = () => {
    const {isLogged} = useAppSelector(state => state.login)
    const {avatar, name, email} = useAppSelector(state => state.auth)
    const packsCounts = useAppSelector(state => state.packsCard.cardPacks)
    const user_id = useAppSelector(state => state.auth._id)
    const dispatch = useAppDispatch()
    const [packsCount, setPacksCount] = useState(packsCounts.length)

    useEffect(() => {
        //dispatch(setUserIdPacksAC(user_id))
        setPacksCount(packsCounts.length)
    },[])

    if (!isLogged) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={style.bcg}>
            <div className={style.container}>
                <div className={style.block}>
                    <h3 className={style.title}>PROFILE</h3>
                    <div className={style.photoBlock}>
                        <img src={avatar ? avatar : userNotFound} alt='profilePhoto'/>
                    </div>
                    <div className={style.inputNickname}>
                        <span>Name: {name}</span>
                    </div>
                    <div className={style.inputEmail}>
                        <span>Email: {email}</span>
                    </div>
                    <div className={style.packsCount}>
                        <span>Your packs: {packsCount}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

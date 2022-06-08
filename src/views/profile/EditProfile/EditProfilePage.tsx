import {ChangeEvent, useState} from 'react'
import style from './EditProfilePage.module.css'
import userNotFound from '../../../assets/images/user-not-found.png'
import {AiOutlineCamera} from 'react-icons/ai'
import {useNavigate} from 'react-router-dom'
import SuperInputText from '../../../components/SuperInputText/SuperInputText'
import {useAppDispatch, useAppSelector} from '../../../redux/store'
import {editProfileTC} from '../../../redux/reducers/authReducer'
import {PATH} from "../../../utils/routingPath";

export const EditProfilePage = () => {
    const {name, avatar, email} = useAppSelector(state => state.auth)
    const [userName, setUserName] = useState(name)
    const [userEmail] = useState(email)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const photoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files
        const reader = new FileReader()
        if (file) {
            reader.readAsDataURL(file[0])
            reader.onload = e => {
                const avatar = e.target?.result as string
                dispatch(editProfileTC(userName, avatar))
            }
        }
    }

    const userNameChange = () => {
        dispatch(editProfileTC(userName, avatar!))
    }

    return (
        <div className={style.bcg}>
            <div className={style.container}>
                <div className={style.block}>
                    <h3 className={style.title}>Personal Information</h3>
                    <div className={style.photoBlock}>
                        <img src={avatar ? avatar : userNotFound} alt='profilePhoto'/>
                        <div className={style.addPhoto}>
                            <input
                                id='addPhoto'
                                type='file'
                                accept='.jpg, .jpeg, .png'
                                onChange={photoSelected}
                            />
                            <label htmlFor='addPhoto'>
                                <AiOutlineCamera size={24}/>
                            </label>
                        </div>
                    </div>
                    <div className={style.inputNickname}>
                        <span>Nickname</span>
                        <SuperInputText
                            value={userName}
                            onChangeText={setUserName}
                            className={'n'}
                        />
                    </div>
                    <div className={style.inputEmail}>
                        <span>Email</span>
                        <SuperInputText
                            value={userEmail}
                            className={'f'}
                            onChangeText={() => 'x'}
                        />
                    </div>
                    <div className={style.btnBlock}>
                        <button
                            className={style.cancelBtn}
                            onClick={() => navigate(PATH.PROFILE_PAGE)}
                        >
                            Cancel
                        </button>
                        <button className={style.saveBtn} onClick={userNameChange}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

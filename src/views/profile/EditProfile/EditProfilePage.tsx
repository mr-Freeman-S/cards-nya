import { ChangeEvent, useState } from 'react'
import style from './EditProfilePage.module.css'
import profile_photo from '../../../assets/images/profile-photo.png'
import { AiOutlineCamera } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import SuperInputText from '../../../components/SuperInputText/SuperInputText'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { editProfileTC } from '../../../redux/reducers/authReducer'
import { useEffect } from 'react'
import axios from 'axios'

export const EditProfilePage = () => {
	const { name, email, avatar } = useAppSelector(state => state.auth)
	const [userName, setUserName] = useState(name)
	const [userEmail, setUserEmail] = useState(email)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	useEffect(() => {
		//email: 'nya-admin5252@nya.nya', password: '11qazxcvBG'
		axios
			.post(
				'auth/login',
				{
					email: 'nya-admin5252@nya.nya',
					password: '11qazxcvBG',
					rememberMe: false,
				},
				{
					baseURL:
						process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
					withCredentials: true,
				}
			)
			.then(res => console.log(res.data))
	}, [])

	const photoSelected = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files
		const reader = new FileReader()
		if (file) {
			reader.readAsDataURL(file[0])
			reader.onload = e => {
				console.log(e.target?.result)
				const avatar = e.target?.result as string
				dispatch(editProfileTC(userName, avatar))
			}
		}
	}

	const userNameChange = () => {}

	return (
		<div className={style.bcg}>
			<div className={style.container}>
				<div className={style.block}>
					<h3 className={style.title}>Personal Information</h3>
					<div className={style.photoBlock}>
						<img src={avatar ? avatar : profile_photo} alt='profilePhoto' />
						<div className={style.addPhoto}>
							<input
								id='addPhoto'
								type='file'
								accept='.jpg, .jpeg, .png'
								onChange={photoSelected}
							/>
							<label htmlFor='addPhoto'>
								<AiOutlineCamera size={24} />
							</label>
						</div>
					</div>
					<div className={style.inputNickname}>
						<span>Nickname</span>
						{/* <input
							type='text'
							value={nickName}
							onChange={e => setNickName(e.target.value)}
						/> */}
						<SuperInputText
							value={userName}
							onChangeText={setUserName}
							className={'n'}
						/>
					</div>
					<div className={style.inputEmail}>
						<span>Email</span>
						{/* <input
							type='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
						/> */}
						<SuperInputText
							value={userEmail}
							onChangeText={setUserEmail}
							className={'f'}
						/>
					</div>
					<div className={style.btnBlock}>
						<button
							className={style.cancelBtn}
							onClick={() => navigate('/profile')}
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

import { ChangeEvent, useState } from 'react'
import style from './EditProfilePage.module.css'
import profile_photo from '../../../assets/images/profile-photo.png'
import { AiOutlineCamera } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

export const EditProfilePage = () => {
	const [nickName, setNickName] = useState('Petro')
	const [email, setEmail] = useState('example@gmail.com')
	const navigate = useNavigate()

	const photoSelected = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files
		const reader = new FileReader()
		// @ts-ignore
		reader.readAsDataURL(file[0])
		reader.onload = e => {
			console.log(e.target?.result)
		}
	}

	return (
		<div className={style.bcg}>
			<div className={style.container}>
				<div className={style.block}>
					<h3 className={style.title}>Personal Information</h3>
					<div className={style.photoBlock}>
						<img src={profile_photo} alt='profilePhoto' />
						<div className={style.addPhoto}>
							<input id='addPhoto' type='file' onChange={photoSelected} />
							<label htmlFor='addPhoto'>
								<AiOutlineCamera size={24} />
							</label>
						</div>
					</div>
					<div className={style.inputNickname}>
						<span>Nickname</span>
						<input
							type='text'
							value={nickName}
							onChange={e => setNickName(e.target.value)}
						/>
					</div>
					<div className={style.inputEmail}>
						<span>Email</span>
						<input
							type='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div className={style.btnBlock}>
						<button
							className={style.cancelBtn}
							onClick={() => navigate('/profile')}
						>
							Cancel
						</button>
						<button className={style.saveBtn}>Save</button>
					</div>
				</div>
			</div>
		</div>
	)
}

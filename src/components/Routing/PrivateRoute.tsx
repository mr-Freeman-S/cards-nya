import {Route, Routes} from "react-router-dom";
import {ProfilePage} from "../../views/profile/ProfilePage";
import {EditProfilePage} from "../../views/profile/EditProfile/EditProfilePage";
import LoginPage from "../../views/login/LoginPage";
import {RecoverPasswordPage} from "../../views/login/RecoverPasswordPage";
import NewPasswordPage from "../../views/login/NewPasswordPage";
import RegistrationPage from "../../views/login/RegistrationPage";
import Test from "../../views/test/Test";
import Page404 from "../../views/error/Page404";
import {PATH} from "../../utils/routingPath";

export const PrivateRoute = () => {
	return (
		<Routes>
			<Route path={PATH.PROFILE_PAGE} element={<ProfilePage />} />
			<Route path={PATH.EDIT_PROFILE_PAGE} element={<EditProfilePage />} />
			<Route path={PATH.LOGIN_PAGE} element={<LoginPage />} />
			<Route
				path={PATH.RECOVER_PASSWORD_PAGE}
				element={<RecoverPasswordPage />}
			/>
			<Route path={PATH.NEW_PASSWORD_PAGE} element={<NewPasswordPage />} />
			<Route path={PATH.REGISTRATION_PAGE} element={<RegistrationPage />} />
			<Route path={PATH.TEST} element={<Test />} />
			<Route path='*' element={<Page404 />} />
		</Routes>
	)
}


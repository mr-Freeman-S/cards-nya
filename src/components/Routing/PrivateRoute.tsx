import {Route, Routes} from "react-router-dom";
import {ProfilePage} from "../../views/profile/ProfilePage";
import {EditProfilePage} from "../../views/profile/EditProfile/EditProfilePage";
import LoginPage from "../../views/login/LoginPage";
import {RecoverPasswordPage} from "../../views/login/RecoverPasswordPages/RecoverPasswordPage";
import {ResetPasswordPage} from "../../views/login/RecoverPasswordPages/ResetPasswordPage";
import RegistrationPage from "../../views/login/RegistrationPage";
import Test from "../../views/test/Test";
import Page404 from "../../views/error/Page404";
import {PATH} from "../../utils/routingPath";
import {CheckEmail} from "../../views/login/RecoverPasswordPages/CheckEmail";

export const PrivateRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<ProfilePage/>}/>
            <Route path={PATH.PROFILE_PAGE} element={<ProfilePage/>}/>
            <Route path={PATH.EDIT_PROFILE_PAGE} element={<EditProfilePage/>}/>
            <Route path={PATH.LOGIN_PAGE} element={<LoginPage/>}/>
            <Route path={PATH.RECOVER_PASSWORD_PAGE} element={<RecoverPasswordPage/>}/>
            <Route path={PATH.NEW_PASSWORD_PAGE} element={<ResetPasswordPage/>}>
                <Route path=':token' element={<ResetPasswordPage/>}/>
            </Route>
            <Route path={PATH.REGISTRATION_PAGE} element={<RegistrationPage/>}/>
            <Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>}/>
            <Route path={PATH.TEST} element={<Test/>}/>
            <Route path='*' element={<Page404/>}/>
        </Routes>
    )
}


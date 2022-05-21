import React from "react";
import {Route, Routes} from "react-router-dom";
import ProfilePage from "../../views/profile/ProfilePage";
import NewPasswordPage from "../../views/login/NewPasswordPage";
import {PATH} from "../../utils/routingPath";
import RecoverPasswordPage from "../../views/login/RecoverPasswordPage";
import LoginPage from "../../views/login/LoginPage";
import Test from "../../views/test/Test";
import Page404 from "../../views/error/Page404";
import RegistrationPage from "../../views/login/RegistrationPage";


const PrivateRoute = () => {
    return (
        <Routes>
            <Route path={PATH.PROFILE_PAGE} element={<ProfilePage/>}/>
            <Route path={PATH.LOGIN_PAGE} element={<LoginPage/>}/>
            <Route path={PATH.RECOVER_PASSWORD_PAGE} element={<RecoverPasswordPage/>}/>
            <Route path={PATH.NEW_PASSWORD_PAGE} element={<NewPasswordPage/>}/>
            <Route path={PATH.REGISTRATION_PAGE} element={<RegistrationPage/>}/>
            <Route path={PATH.TEST} element={<Test/>}/>
            <Route path="*" element={<Page404/>}/>
        </Routes>
    );
};

export default PrivateRoute;
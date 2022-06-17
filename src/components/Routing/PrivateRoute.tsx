import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {ProfilePage} from '../../views/profile/ProfilePage'
import {PATH} from '../../utils/routingPath'
import {LoginPage} from '../../views/login/LoginPage'
import Test from '../../views/test/Test'
import {RegistrationPage} from '../../views/login/RegistrationPage'
import {EditProfilePage} from '../../views/profile/EditProfile/EditProfilePage'
import {RecoverPasswordPage} from '../../views/login/RecoverPasswordPages/RecoverPasswordPage'
import {ResetPasswordPage} from '../../views/login/RecoverPasswordPages/ResetPasswordPage'
import {CheckEmail} from '../../views/login/RecoverPasswordPages/CheckEmail'
import {Page404} from "../../views/error/Page404";
import {PackListContainer} from "../../views/packList/PackListContainer";
import {TableCards} from "../TableCards/TableCards";
import {LearnCardContainer} from "../LearnCard/LearnCardContainer";

export const PrivateRoute = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to={PATH.PROFILE_PAGE}/>}/>
            <Route path={PATH.PROFILE_PAGE} element={<ProfilePage/>}/>
            <Route path={PATH.LOGIN_PAGE} element={<LoginPage/>}/>
            <Route
                path={PATH.RECOVER_PASSWORD_PAGE}
                element={<RecoverPasswordPage/>}
            />
            <Route path={PATH.NEW_PASSWORD_PAGE} element={<ResetPasswordPage/>}>
                <Route path=':token' element={<ResetPasswordPage/>}/>
            </Route>
            <Route path={PATH.CARDS_LIST_LEARN} element={<LearnCardContainer/>}>
                <Route path={`${PATH.CARDS_LIST_LEARN}/:name/:id`} element={<LearnCardContainer/>}/>
            </Route>
            <Route path={PATH.CARDS_LIST} element={<TableCards/>}>
                <Route path=':id' element={<TableCards/>}/>
            </Route>
            <Route path={PATH.REGISTRATION_PAGE} element={<RegistrationPage/>}/>
            <Route path={PATH.TEST} element={<Test/>}/>
            <Route path={PATH.EDIT_PROFILE_PAGE} element={<EditProfilePage/>}/>
            <Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>}/>
            <Route path={PATH.PACK_LIST} element={<PackListContainer/>}/>
            <Route path='*' element={<Page404/>}/>
        </Routes>
    )
}

import React, {useState} from 'react';
import SuperInputText from "../../../components/SuperInputText/SuperInputText";
import SuperButton from "../../../components/SuperButton/SuperButton";
import {NavLink, useNavigate} from "react-router-dom";
import {PATH} from "../../../utils/routingPath";
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import {sendMailRestorePassword, setStatusRP} from "../../../redux/reducers/restorePasswordReducer";

export const RecoverPasswordPage = () => {
    const {status, error} = useAppSelector(state => state.restorePasswordReducer)
    const dispatch = useAppDispatch()
    const [emailText, setEmailText] = useState<string>('')
    const navigate = useNavigate()
    const onSubmit = () => {
        dispatch(sendMailRestorePassword(emailText))
    }
    if (status === "succeeded") {
        navigate(`/${PATH.CHECK_EMAIL}`)
        dispatch(setStatusRP("idle"))
    }
    return (
        <div>
            <h1>It - incubator</h1>
            <h3>Forgot your password</h3>
            <SuperInputText value={emailText} onChangeText={setEmailText} placeholder="Email"/>
            <p>Enter your email address and we will send you further instruction</p>
            <SuperButton disabled={(status === 'loading')} onClick={onSubmit}>Send Instructions</SuperButton>
            <span>{error}</span>
            <p>Did you remember your password?</p>
            <NavLink to={`/${PATH.LOGIN_PAGE}`}>Try logging in</NavLink>
        </div>
    );
};
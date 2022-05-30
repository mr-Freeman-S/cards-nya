import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import SuperInputText from "../../../components/SuperInputText/SuperInputText";
import SuperButton from "../../../components/SuperButton/SuperButton";
import {resetPassword, setErrorMessageRP, setStatusRP} from "../../../redux/reducers/restorePasswordReducer";
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import {PATH} from "../../../utils/routingPath";

export const ResetPasswordPage = () => {
    const dispatch = useAppDispatch()
    const {status, error} = useAppSelector((state) => state.restorePasswordReducer)
    const navigate = useNavigate()
    const {token} = useParams()
    const [passwordText, setPasswordText] = useState<string>('')
    const onSubmit = () => {
        if (token) {
            dispatch(resetPassword(passwordText, token))
        } else {
            dispatch(setErrorMessageRP("Wrong token"))
        }
    }
    if (status === "succeeded") {
        navigate(`/${PATH.LOGIN_PAGE}`)
        dispatch(setStatusRP("idle"))
    }
    return (
        <div>
            <h1>It-incubator</h1>
            <h3>Create new password</h3>
            <SuperInputText placeholder='Password' type='password' onChangeText={setPasswordText} value={passwordText}/>
            <p>Create new password and we will send you further instructions to email</p>
            <SuperButton disabled={status === "loading"} onClick={onSubmit}>Create new password</SuperButton>
            <span>{error}</span>
        </div>
    )
};
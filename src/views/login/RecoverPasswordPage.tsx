import React, {useState} from 'react';
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import SuperButton from "../../components/SuperButton/SuperButton";
import {NavLink} from "react-router-dom";
import {PATH} from "../../utils/routingPath";

export const RecoverPasswordPage = () => {
    const [email, setEmail] = useState<string>('')
    const onSubmit = () => {
        alert(email)
    }
    return (
        <div>
            <h1>It - incubator</h1>
            <h3>Forgot your password</h3>
            <SuperInputText value={email} onChangeText={setEmail} placeholder="Email"/>
            <p>Enter your email address and we will send you further instruction</p>
            <SuperButton onClick={onSubmit}>Send Instructions</SuperButton>
            <p>Did you remember your password?</p>
            <NavLink to={PATH.LOGIN_PAGE}>Try logging in</NavLink>
        </div>
    );
};


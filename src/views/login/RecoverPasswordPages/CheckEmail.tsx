import {useAppSelector} from "../../../redux/store";
import sentMail from "../../../assets/icons/sentMail.svg";
import React from "react";

export const CheckEmail = () => {
    const email = useAppSelector(state => state.restorePasswordReducer.email)
    return (
        <div>
            <h1>It - incubator</h1>
            <img src={sentMail} alt="sentMail"/>
            <h1>Check Email</h1>
            <p>{`We've sent an Email with instructions to ${email}`}</p>
        </div>
    )
}
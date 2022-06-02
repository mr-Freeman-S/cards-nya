import {useAppSelector} from "../../../redux/store";
import sentMail from "../../../assets/icons/sentMail.svg";
import React from "react";
import style from "./RecoveryPassword.module.css";

export const CheckEmail = () => {
    const email = useAppSelector(state => state.resPassword.email)
    return (
        <div className={`${style.container} ${style.block}`}>
            <h1 className={style.titleText}>It - incubator</h1>
            <img src={sentMail} alt="sentMail"/>
            <h1 className={style.mainText}>Check Email</h1>
            <p className={style.pText}>{`We've sent an Email with instructions to ${email}`}</p>
        </div>
    )
}
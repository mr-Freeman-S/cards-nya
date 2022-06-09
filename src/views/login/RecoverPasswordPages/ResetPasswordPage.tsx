import React, {useEffect} from 'react';
import * as Yup from 'yup'
import {useNavigate, useParams} from "react-router-dom";
import SuperButton from "../../../components/SuperButton/SuperButton";
import {resetPassword, setErrorMessageRP, setStatusRP} from "../../../redux/reducers/restorePasswordReducer";
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import {PATH} from "../../../utils/routingPath";
import {Field, Form, Formik} from "formik";
import style from './RecoveryPassword.module.css'

type setSubmitting = (isSubmitting: boolean) => void
type Value = {
    password: string
}

export const ResetPasswordPage = () => {

    const dispatch = useAppDispatch()
    const {status, error} = useAppSelector((state) => state.resPassword)
    const navigate = useNavigate()
    const {token} = useParams()
    const initialState: Value = {password: ''}
    const validationSchema = Yup.object({
        password: Yup.string().required('Required').min(5, '5 symbols minimum')
    })

    const onSubmit = (values: Value, {
        setSubmitting,
        resetForm
    }: { setSubmitting: setSubmitting, resetForm: () => void }) => {
        if (token) {
            dispatch(resetPassword(values.password, token, resetForm))
        } else {
            dispatch(setErrorMessageRP("Wrong token"))
        }

        setSubmitting(false)
    }
    useEffect(() => {
        setTimeout(() => dispatch(setErrorMessageRP('')), 5000)
    }, [error, dispatch])

    if (status === "succeeded") {
        navigate(PATH.LOGIN_PAGE)
        dispatch(setStatusRP("idle"))
    }

    return (
        <div className={`${style.container}`}>
            <Formik validationSchema={validationSchema} initialValues={initialState} onSubmit={onSubmit}>
                {({isSubmitting}) => <Form className={`${style.block}`}>
                    <span className={style.titleText}>It-incubator</span>
                    <span className={style.mainText}>Create new password</span>
                    <Field className={style.inputField} placeholder='Password' type='password' name='password'/>
                    <p className={style.pText}>Create new password and we will send you further instructions to
                        email</p>
                    <SuperButton type='submit' disabled={isSubmitting}>Create new password</SuperButton>
                    {error && <span>{error}</span>}
                </Form>}

            </Formik>
        </div>
    )
};


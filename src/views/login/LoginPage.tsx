import React from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {PATH} from "../../utils/routingPath";
import {Navigate} from "react-router-dom";
import {loginTC} from "../../redux/reducers/loginReducer";
import style from "./LoginPage.module.css"

export type setSubmitting = (isSubmitting: boolean) => void
export type valuesFromFormikType = {
    email: string
    password: string
    rememberMe: boolean
}
export const LoginPage = () => {
    const initialState: valuesFromFormikType = {
        email: '',
        password: '',
        rememberMe: false
    }
    const isLogged = useAppSelector(state => state.login.isLogged)
    const error = useAppSelector(state => state.app.errorMessage)
    const dispatch = useAppDispatch()

    const validationSchema = Yup.object({
        email: Yup.string().required('Required').email('Invalid email format'),
        password: Yup.string().required('Required').min(5, 'Minimum 5 symbols'),
    })
    const submit = (values: valuesFromFormikType, {setSubmitting, resetForm}: {
        setSubmitting: setSubmitting, resetForm: () => void
    }) => {

        dispatch(loginTC(values.email, values.password, values.rememberMe, resetForm))
        console.log(values)
    }

    if (isLogged) return <Navigate to={PATH.LOGIN_PAGE}/>

    return <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={submit}
    >

        {({isSubmitting}) => (
            <Form>
                <div className={style.loginBox}>
                    <h2>Login</h2>
                    <div className={style.userBox}>
                        <Field placeholder="Login" type="text" name="email"/>
                        <div className={style.error}>
                            <ErrorMessage name="email" component="div"/>
                        </div>
                    </div>
                    <div className={style.userBox}>
                        <Field placeholder="Password" type="password" name="password" autoComplete="on"/>
                        <div className={style.error}>
                            <ErrorMessage name="password" component="div"/>
                        </div>
                    </div>
                    <div className={style.checkbox}>
                        <Field placeholder="Remember me" type="checkbox" name="remember Me"/>
                        <span>Remember me</span>
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        Login
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <div className={style.error}>
                        {error}
                    </div>
                </div>
            </Form>
        )}

    </Formik>
}
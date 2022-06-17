import React, {useEffect} from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {PATH} from "../../utils/routingPath";
import {loginTC} from "../../redux/reducers/loginReducer";
import style from "./LoginPage.module.css"
import {setErrorMessageAC} from "../../redux/reducers/appReducer";
import {Navigate, useNavigate} from 'react-router-dom';

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
    const navigate = useNavigate()

    const validationSchema = Yup.object({
        email: Yup.string().required('Required').email('Invalid email format'),
        password: Yup.string().required('Required').min(7, 'Minimum 7 symbols'),
    })
    const submit = (values: valuesFromFormikType, {setSubmitting, resetForm}: {
        setSubmitting: setSubmitting, resetForm: () => void
    }) => {
        dispatch(loginTC(values.email, values.password, values.rememberMe, resetForm))
    }
    useEffect(() => {
        setTimeout(() => dispatch(setErrorMessageAC(null)), 2000)
    }, [dispatch, error])

    if (isLogged) {
        return <Navigate to={PATH.PROFILE_PAGE}/>
    }

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

                    <div className={style.forgotPass}>
                        <span onClick={() => navigate(PATH.RECOVER_PASSWORD_PAGE)}>Forgot Password</span>
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <button type="submit" disabled={isSubmitting}>
                            Login
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    <div className={style.error}>
                        {error}
                    </div>
                    <div style={{ display: "flex",
                        justifyContent: "center"}}>
                        <span className={style.spanTextAcc}>Don't have an account?</span>
                    </div>
                    <div className={style.singUp}>
                        <span onClick={() => navigate(PATH.REGISTRATION_PAGE)}>Sign Up</span>
                    </div>
                </div>
            </Form>
        )}

    </Formik>
}
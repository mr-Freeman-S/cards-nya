import React from "react";
import * as Yup from "yup";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../redux/store";
import {ErrorType, registerTC} from "../../redux/reducers/registrationReducer";
import SuperButton from "../../components/SuperButton/SuperButton";
import style from "./RegistrationPage.module.css"
import {PATH} from "../../utils/routingPath";
import {ErrorMessage, Field, Form, Formik} from "formik";

export type setSubmitting = (isSubmitting: boolean) => void
export type ValuesRegistrationFormikType = {
    email: string
    password: string
    confirmPassword: string
}

export const RegistrationPage = () => {

    const isRegistered = useSelector<AppStateType, boolean>(state => state.registration.isRegistered)
    const error = useSelector<AppStateType, ErrorType>(state => state.registration.error)
    const isLoading = useSelector<AppStateType, boolean>(state => state.registration.isLoading)
    const dispatch = useAppDispatch()


    const initialValues: ValuesRegistrationFormikType = {
        email: '',
        password: '',
        confirmPassword: ''
    }
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(8, 'Minimum 8 symbols').required('Required'),
        confirmPassword: Yup.string().required('Required')
            .oneOf([Yup.ref("password"), null], "Passwords must match")

    })
    const oSubmit = (values: ValuesRegistrationFormikType, {resetForm}: {
        setSubmitting: setSubmitting, resetForm: () => void
    }) => {
        dispatch(registerTC(values, resetForm))
    }

    if (isRegistered) return <Navigate to={PATH.LOGIN_PAGE}/>

    return <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={oSubmit}
    >

        {({isSubmitting}) => (
            <Form>
                <div className={style.signUpBlock}>
                    <div>
                        <h1 className={style.title}> Sign Up </h1>
                        <div>
                            <p>
                                <label htmlFor="email">Email Address</label>
                            </p>
                            <Field
                                name="email"
                                id="email"
                                type="email"
                            />
                            <div style={{color: "red"}}>
                                <ErrorMessage name="email" component="div"/>
                            </div>
                        </div>
                        <div>
                            <p>
                                <label htmlFor="password">Password</label>
                            </p>
                            <Field
                                id="password"
                                type="password"
                                name="password"
                            />
                            <div style={{color: "red"}}>
                                <ErrorMessage name="password" component="div"/>
                            </div>
                        </div>
                        <div>
                            <p>
                                <label htmlFor="password">Confirm Password</label>
                            </p>
                            <Field
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                            />
                            <div style={{color: "red"}}>
                                <ErrorMessage name="confirmPassword" component="div"/>
                            </div>
                        </div>
                        {isLoading && "Loading. Please, wait."}
                        {error ? <div style={{color: "red"}}>{error}</div> : ''}
                        <div className={style.button}>
                            <p>
                                <SuperButton type="submit" disabled={isSubmitting}>Register</SuperButton>
                            </p>
                        </div>
                    </div>
                </div>
            </Form>
        )}
    </Formik>
};


import React from 'react';
import SuperButton from "../../../components/SuperButton/SuperButton";
import {NavLink, useNavigate} from "react-router-dom";
import * as Yup from "yup"
import {PATH} from "../../../utils/routingPath";
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import {sendMailRestorePassword, setStatusRP} from "../../../redux/reducers/restorePasswordReducer";
import {Field, Form, Formik, FormikHelpers} from "formik";

type Values = {
    email: string
}

export const RecoverPasswordPage = () => {
    const {status,error} = useAppSelector(state => state.resPassword)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const initialState: Values = {email: ''}
    const validationSchema = Yup.object({
        email: Yup.string().required('Required').email('Invalid email format')
    })

    const onSubmit = (values: Values, {setSubmitting}: FormikHelpers<Values>) => {
        dispatch(sendMailRestorePassword(values.email))
        setSubmitting(false)
    }
    if (status === "succeeded") {
        navigate(`/${PATH.CHECK_EMAIL}`)
        dispatch(setStatusRP("idle"))
    }
    return (
        <div>
            <Formik initialValues={initialState} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({isSubmitting}) => (
                    <Form>
                        <h1>It - incubator</h1>
                        <h3>Forgot your password</h3>
                        <Field  name="email" type='email' placeholder="Email"/>
                        <p>Enter your email address and we will send you further instruction</p>
                        <SuperButton type="submit" disabled={status === "loading"}>Send Instructions</SuperButton>
                        <span>{error}</span>
                        <p>Did you remember your password?</p>
                        <NavLink to={`/${PATH.LOGIN_PAGE}`}>Try logging in</NavLink>
                    </Form>)}
            </Formik></div>
    )
}
import React from 'react';
import {useFormik} from "formik";
import { Navigate } from 'react-router-dom';
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../redux/store";
import {ErrorType, registerTC} from "../../redux/reducers/registrationReducer";

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const RegistrationPage = () => {

    const isRegisteredIn = useSelector<AppStateType, boolean>(state => state.registration.isRegisteredIn)
    const error = useSelector<AppStateType, ErrorType>(state => state.registration.error)
    const isLoading = useSelector<AppStateType, boolean>(state => state.registration.isLoading)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
           /* confirmPassword: ''*/
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 7) {
                errors.password = 'Must be more than 7';
            }

          /*  if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
            } else if (values.confirmPassword.length < 3) {
                errors.confirmPassword = 'Must be more than 3';
            }*/

            return errors;
        },
        onSubmit: values => {
            dispatch(registerTC(values))
            formik.resetForm()
        },
    });

    if(isRegisteredIn) {
        return <Navigate to={"/login"} />
    }

    return (
        <div>
            <h2>
                Sign Up
            </h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <p>
                        <label htmlFor="email">Email Address</label>
                    </p>
                    <input
                        id="email"
                        type="email"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email &&
                        <div style={{color: "red"}}>{formik.errors.email}</div>}
                </div>
                <div>
                    <p>
                        <label htmlFor="password">Password</label>
                    </p>
                    <input
                        id="password"
                        type="password"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password &&
                        <div style={{color: "red"}}>{formik.errors.password}</div>}
                </div>
                <div>
                    <p>
                        <label htmlFor="password">Confirm Password</label>
                    </p>
                    <input
                        id="confirmPassword"
                        type="password"
                        {...formik.getFieldProps('confirmPassword')}
                    />
                  {/*  {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                        <div style={{color: "red"}}>{formik.errors.confirmPassword}</div>}*/}
                </div>
                {isLoading && "LOADING..."}
                {error ? error : ''}
                <div>
                    <p>
                        <button type="submit">Register</button>
                    </p>
                </div>
            </form>
        </div>
    );
};


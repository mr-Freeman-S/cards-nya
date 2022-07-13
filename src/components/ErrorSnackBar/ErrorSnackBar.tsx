import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../redux/store";
import {setErrorMessageAC} from "../../redux/reducers/appReducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((
    props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar:React.FC = () => {

    const error = useSelector<AppStateType, string | null>(state => state.app.errorMessage)
    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorMessageAC(null))
    };

    const isOpen = error !== null

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}
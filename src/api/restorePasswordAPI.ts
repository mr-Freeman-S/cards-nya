import {instanceHeroku} from "./index";


export const restorePasswordAPI = {
    sendRestorePasswordEmail(email: string) {
        return instanceHeroku.post('/auth/forgot', {
            email: email, message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/new-password/$token$'>
link</a></div>` //!!! need write reset-password new link
        })
    },
    createNewPassword(password: string, resetPasswordToken: string) {
        return instanceHeroku.post('/auth/set-new-password', {password, resetPasswordToken},)
    }
}
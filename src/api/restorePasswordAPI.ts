import axios from "axios";

export const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
    withCredentials: true
})

export const restorePasswordAPI = {
    sendRestorePasswordEmail(email: string) {
        return instance.post('/auth/forgot', {
            email: email, message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/new-password/$token$'>
link</a></div>` //!!! need write reset-password new link
        })
    },
    createNewPassword(password:string,resetPasswordToken:string){
        return instance.post('/post/set-new-password', {password,resetPasswordToken},)
    }
}
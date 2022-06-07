import {instanceHeroku} from "./index";

export const loginAPI = {
    login({email, password, rememberMe}: LoginPayloadType) {
        return instanceHeroku.post("auth/login", {email, password, rememberMe})
    },
    auth(){
        return instanceHeroku.post("auth/me",{})
    },
    logout(){
        return instanceHeroku.delete("auth/me")
    }

}

//Types
export type LoginPayloadType = {
    email: string
    password: string
    rememberMe: boolean
}


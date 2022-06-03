import {instanceHeroku} from "./index";

export const loginAPI = {
    login({email, password, rememberMe}: LoginPayloadType) {
        return instanceHeroku.post("auth/login", {email, password, rememberMe})
    },

}

//Types
export type LoginPayloadType = {
    email: string
    password: string
    rememberMe: boolean
}


import {AxiosResponse} from "axios";
import {instanceHeroku} from "./index";


//api
export const registrationAPI = {
    registration(data: RegistrationParamsType) {
        return instanceHeroku.post<{ data: RegistrationParamsType }, AxiosResponse<RegisterUserType>>('auth/register', data)
    }
}

//types
export type RegistrationParamsType = {
    email: string
    password: string
}
export type RegisterUserType = {
    addedUser: {}
    error?: string;
}

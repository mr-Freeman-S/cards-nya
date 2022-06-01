import {AxiosResponse} from "axios";
import {instance} from "./index";


//api
export const registrationAPI = {
    registration(data: RegistrationParamsType) {
        return instance.post<{data: RegistrationParamsType}, AxiosResponse<RegisterUserType>>('auth/register', data)
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

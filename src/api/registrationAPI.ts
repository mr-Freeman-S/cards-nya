import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    baseURL: /*process.env.REACT_APP_BACK_URL || */'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

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

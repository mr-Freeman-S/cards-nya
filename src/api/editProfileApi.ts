import {instanceHeroku} from "./index";

export const editProfileApi = {
    updateProfile(name: string, avatar: string) {
        return instanceHeroku.put('auth/me', {name, avatar})
    },
}

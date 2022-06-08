import {AxiosResponse} from 'axios'
import {instanceHeroku} from "./index";
import {ResponsePacksType} from "../utils/types";


//api
export const packsAPI = {
    getPacks(params?: PacksType) {
        return instanceHeroku.get<null,AxiosResponse<ResponsePacksType>>(`cards/pack?${params ? params.sortPacks : null}`)
    },
    createPack(cardsPack: CreatePackType) {
        return instanceHeroku.post<{cardsPack: CreatePackType}, AxiosResponse<ResponseType>>("cards/pack", {cardsPack})
    },
    updatePack(cardsPack: UpdatePackType) {
        return instanceHeroku.put<{cardsPack: UpdatePackType}, AxiosResponse<ResponseType>>("cards/pack", {cardsPack})
    },
    deletePack(id: string) {
        return instanceHeroku.delete<{id: string}, AxiosResponse<ResponseType>>(`cards/pack/${id}`) //не уверен, что будет именно так,
                                                                                                        // надо будет еще перепроверить правильный ли путь
    }
}

//types
type PacksType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: number
}

type CreatePackType = {
    name?: string
    deckCover?: string
    private?: boolean
}

type UpdatePackType = {
    _id: string
    name?: string
    // надо дополнить
}




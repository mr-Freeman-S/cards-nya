import {AxiosResponse} from 'axios'
import {instanceHeroku} from "./index";


//api
export const packsAPI = {
    getPacks(data: PacksType) {
        return instanceHeroku.get<{data: PacksType}, AxiosResponse<ResponsePacksType>>("cards/pack", {data})
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

type CardPacksType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}

type ResponsePacksType = {
    cardPacks: CardPacksType[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}


import {AxiosResponse} from 'axios'
import {instanceHeroku} from "./index";


//api
export const packsAPI = {
    getPacks(data: PacksType) {
        return instanceHeroku.get<{ data: PacksType }, AxiosResponse<ResponsePacksType>>("cards/pack", {params: data})
    },
    createPack(cardsPack: CreatePackType) {
        return instanceHeroku.post<{ cardsPack: CreatePackType }, AxiosResponse<ResponseCreatePackType>>("cards/pack", {cardsPack})
    },
    updatePack(cardsPack: UpdatePackType) {
        return instanceHeroku.put<{ cardsPack: UpdatePackType }, AxiosResponse<ResponseUpdatePackType>>("cards/pack", {cardsPack})
    },
    deletePack(_id: string) {
        return instanceHeroku.delete<{ _id: string }, AxiosResponse<ResponseDeletePackType>>(`cards/pack/?id=${_id}`)
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
    user_id?: string
}

export type CreatePackType = {
    name?: string
    deckCover?: string
    private?: boolean
}

type UpdatePackType = {
    _id: string
    user_id?: string
    user_name?: string
    private?: boolean
    name?: string
    path?: string
    grade?: number
    shots?: number
    cardsCount?: number
    type?: string
    rating?: number
    created?: string
    updated?: string
    more_id?: string
    __v?: number
    deckCover?: string
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

type ResponseCreatePackType = {
    newCardsPack: CardPacksType
    token: string
    tokenDeathTime: number
}

type ResponseDeletePackType = {
    deletedCardsPack: CardPacksType
    token: string
    tokenDeathTime: number
}

type ResponseUpdatePackType = {
    updatedCardsPack: CardPacksType
    token: string
    tokenDeathTime: number
}


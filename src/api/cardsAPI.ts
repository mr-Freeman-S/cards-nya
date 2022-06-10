import {AxiosResponse} from 'axios'
import {instanceHeroku} from "./index";
import {ResponseCardsType} from "../utils/types";


//api
export const cardsAPI = {
    getCards(data: CardsType) {
        return instanceHeroku.get<{data: CardsType}, AxiosResponse<ResponseCardsType>>(`cards/card`, {params: data})
    },
    createCard(card: CreateCardType) {
        return instanceHeroku.post<{ card: CreateCardType }, AxiosResponse<ResponseType>>("cards/card", {card})
    },
    updateCard(card: UpdateCardType) {
        return instanceHeroku.put<{ card: CreateCardType }, AxiosResponse<ResponseType>>("cards/card", {card})
    },
    deleteCard(id: string) {
        return instanceHeroku.delete<{ id: string }, AxiosResponse<ResponseType>>(`cards/card/${id}`) //не уверен, что будет именно так,
        // надо будет еще перепроверить правильный ли путь
    }
}

//types
type CardsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

type CreateCardType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}

type UpdateCardType = {
    _id: string
    question: string
    //... // не обязательно, надо добавить!
    comments: string
}


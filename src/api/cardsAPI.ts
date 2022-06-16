import {AxiosResponse} from 'axios'
import {instanceHeroku} from "./index";
import {ResponseCardsType} from "../utils/types";


//api
export const cardsAPI = {
    getCards(data: CardsType) {
        return instanceHeroku.get<{ data: CardsType }, AxiosResponse<ResponseCardsType>>(`cards/card`, {params: data})
    },
    createCard(card: CreateCardType) {
        return instanceHeroku.post<{ card: CreateCardType }, AxiosResponse<ResponseType>>("cards/card", {card})
    },
    updateCard(card: UpdateCardType) {
        return instanceHeroku.put<{ card: CreateCardType }, AxiosResponse<ResponseType>>("cards/card", {card})
    },
    deleteCard(id: string) {
        return instanceHeroku.delete<{ id: string }, AxiosResponse<ResponseType>>(`cards/card/?id=${id}`) //не увер ен, что будет именно так,
        // надо будет еще перепроверить правильный ли путь
    },
    updateCardGrade(card_id: string, grade: number) {
        return instanceHeroku.put<{card_id: string, grade: number}, AxiosResponse<updateGradeCardType>>("/cards/grade",  {grade, card_id})
    }
}
//<AxiosResponse<ResponseType>>
//types
export type GradeCardType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}
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

type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}

type updateGradeCardType = {
    token: string
    tokenDeathTime: number
    updatedGrade: {
        card_id: string
        cardsPack_id: string
        created: string
        grade: number
        more_id: string
        shots: number
        updated: string
        user_id: string
        __v: number
        _id: string
    }
}


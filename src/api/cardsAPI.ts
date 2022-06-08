import {AxiosResponse} from 'axios'
import {instanceHeroku} from "./index";


//api
export const cardsAPI = {
    getCards(data: CardsType) {
        return instanceHeroku.get<{data: CardsType}, AxiosResponse<ResponseCardsType>>("cards/card", {data})
    },
    createCard(card: CreateCardType) {
        return instanceHeroku.post<{card: CreateCardType}, AxiosResponse<ResponseType>>("cards/card", {card})
    },
    updateCard(card: UpdateCardType) {
        return instanceHeroku.put<{card: CreateCardType}, AxiosResponse<ResponseType>>("cards/card", {card})
    },
    deleteCard(id: string) {
        return instanceHeroku.delete<{id: string}, AxiosResponse<ResponseType>>(`cards/card/${id}`) //не уверен, что будет именно так,
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

type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

type ResponseCardsType = {
    cardPacks: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
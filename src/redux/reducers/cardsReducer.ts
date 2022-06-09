import {AppStateType, ThunkType} from "../store";
import {packsAPI} from "../../api/packsAPI";
import {updatePacksStatusAC} from "./packsCardReducer";
import {cardsAPI} from "../../api/cardsAPI";

const initialState = {
    cardPacks: [] as Array<CardsType>,
    cardAnswer: '',
    cardQuestion: '',
    cardsPack_id: '',
    min: 0,
    max: 0,
    sortCards: '0updated',
    page: 1,
    pageCount: 10,
    cardsTotalCount: 0,
}

//Reducer
export const cardsReducer = (state: InitialStateType = initialState, action: CardsReducerActionType): InitialStateType => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
            return {...state, cardPacks: action.cards}
        case "CARDS/UPDATE-CARDS-TOTAL-COUNT":
            return {...state, cardsTotalCount: action.cardsTotalCount}
        case "CARDS/CHANGE-CARDS-PAGE":
            return {...state, page: action.page}
        case "CARDS/CHANGE-CARDS-PAGE-COUNT":
            return {...state, pageCount: action.pageCount}
        case "CARDS/CHANGE-SORT-CARDS":
            return {...state, sortCards: action.sortPacks}
        default:
            return state
    }
}


//AC
export const setCardsAC = (cards: CardsType[]) => {
    return {type: 'CARDS/SET-CARDS', cards} as const
}
export const changeCardsPageAC = (page: number) => {
    return {type: 'CARDS/CHANGE-CARDS-PAGE', page} as const
}
export const updateCardsTotalCountAC = (cardsTotalCount: number) => {
    return {type: 'CARDS/UPDATE-CARDS-TOTAL-COUNT', cardsTotalCount} as const
}
export const changeCardsPageCountAC = (pageCount: number) => {
    return {type: 'CARDS/CHANGE-CARDS-PAGE-COUNT', pageCount} as const
}
export const changeSortCardsAC = (sortPacks: string) => {
    return {type: 'CARDS/CHANGE-SORT-CARDS', sortPacks} as const
}


//Thunks
export const getCardsTC = (): ThunkType => (dispatch, getState: () => AppStateType) => {
    dispatch(updatePacksStatusAC("loading"))
    const {cardAnswer, cardQuestion, cardsPack_id, min, max, sortCards, page, pageCount} = getState().cards
    cardsAPI.getCards({cardAnswer, cardQuestion, cardsPack_id, min, max, sortCards, page, pageCount})
        .then(res => {
            dispatch(setCardsAC(res.data.cardPacks))
        })
        .catch(e => {

        })
        .finally(() => {
            dispatch(updatePacksStatusAC("idle"))
        })
}

//Types
type InitialStateType = typeof initialState

export type CardsType = {
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

export type CardsReducerActionType =
    ReturnType<typeof setCardsAC>
    | ReturnType<typeof updateCardsTotalCountAC>
    | ReturnType<typeof changeCardsPageAC>
    | ReturnType<typeof changeCardsPageCountAC>
    | ReturnType<typeof changeSortCardsAC>


// export type CardsStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
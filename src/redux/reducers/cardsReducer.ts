import {AppStateType, ThunkType} from "../store";
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
    cardsStatus: 'loading' as CardsStatusType
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
        case "CARDS/SET-ID-PACKS":
            return {...state, cardsPack_id: action.id}
        case "CARDS/UPDATE-GRADE-CARD":
            return {
                ...state,
                cardPacks: state.cardPacks.map(el => el._id === action.id ? {
                        ...el,
                        grade: action.grade,
                        shots: action.shots
                    }
                    : el)
            }
        case "CARDS/UPDATE-CARDS-STATUS":
            return {...state, cardsStatus: action.status}
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
export const setIdPacksAC = (id: string) => {
    return {type: 'CARDS/SET-ID-PACKS', id} as const
}
export const updatedGradeCard = (id: string, grade: number, shots: number) => {
    return {type: 'CARDS/UPDATE-GRADE-CARD', id, grade, shots} as const
}
export const updatedCardsStatus = (status: CardsStatusType) => {
    return {type: 'CARDS/UPDATE-CARDS-STATUS', status} as const
}


//Thunks
export const getCardsTC = (): ThunkType => (dispatch, getState: () => AppStateType) => {
    dispatch(updatedCardsStatus("loading"))
    const {cardAnswer, cardQuestion, cardsPack_id, min, max, sortCards, page, pageCount} = getState().cards
    cardsAPI.getCards({cardAnswer, cardQuestion, cardsPack_id, min, max, sortCards, page, pageCount})
        .then(res => {
            dispatch(setCardsAC(res.data.cards))
        })
        .catch(e => {

        })
        .finally(() => {
            dispatch(updatedCardsStatus("idle"))
        })
}

export const createCardTC = (newTitleQuestion: string, newTitleAnswer: string): ThunkType => (
    dispatch, getState: () => AppStateType) => {
    dispatch(updatePacksStatusAC("loading"))
    let cardsPack_id = getState().cards.cardsPack_id
    cardsAPI.createCard({cardsPack_id, question: newTitleQuestion, answer: newTitleAnswer, grade: 3})
        .then(res => {
            dispatch(getCardsTC())
        })
        .catch(e => {

        })
        .finally(() => {
            dispatch(updatePacksStatusAC("idle"))
        })
}
export const updateGradeCardTC = (cardId: string, grade: number): ThunkType => (
    dispatch, getState: () => AppStateType) => {
    dispatch(updatePacksStatusAC("loading"))
    cardsAPI.updateCardGrade(cardId, grade)
        .then(res => {
            console.log(res)
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
    | ReturnType<typeof setIdPacksAC>
    | ReturnType<typeof updatedGradeCard>
    | ReturnType<typeof updatedCardsStatus>


export type CardsStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
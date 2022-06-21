import {AppStateType, ThunkType} from "../../store";
import {cardsAPI} from "../../../api/cardsAPI";
import {setErrorMessageAC} from "../appReducer/appThunkAction";
import {CardsStatusType, CardsType} from "./cardsReducer";


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
export const updatedGradeCardAC = (id: string, grade: number, shots: number) => {
    return {type: 'CARDS/UPDATE-GRADE-CARD', id, grade, shots} as const
}
export const updatedCardsStatusAC = (status: CardsStatusType) => {
    return {type: 'CARDS/UPDATE-CARDS-STATUS', status} as const
}
export const updatedRandomCardAC = (randomNumber: number) => {
    return {type: 'CARDS/UPDATE-RANDOM-NUMBER', randomNumber} as const
}
export const updatedShowModuleCardAC = (isActive: boolean) => {
    return {type: 'CARDS/UPDATE-SHOW-MODULE-CARD', isActive} as const
}
export const editCardAC = (question: string, answer: string) => {
    return {type: 'CARDS/EDIT-CARD', question, answer} as const
}


//Thunks
export const getCardsTC = (): ThunkType => (dispatch, getState: () => AppStateType) => {
    dispatch(updatedCardsStatusAC("loading"))
    const {cardAnswer, cardQuestion, cardsPack_id, min, max, sortCards, page, pageCount} = getState().cards
    dispatch(updatedRandomCardAC(0))
    cardsAPI.getCards({cardAnswer, cardQuestion, cardsPack_id, min, max, sortCards, page, pageCount})
        .then(res => {
            dispatch(setCardsAC(res.data.cards))
            dispatch(updatedCardsStatusAC("succeeded"))
        })
        .catch((error) => {
            if (error.response.data.error.length) {
                dispatch(setErrorMessageAC(error.response.data.error))
            } else {
                dispatch(setErrorMessageAC('Some error occurred'))
            }
            dispatch(updatedCardsStatusAC("failed"))
        })
        .finally(() => {
            dispatch(updatedCardsStatusAC("idle"))
        })
}

export const createCardTC = (newTitleQuestion: string, newTitleAnswer: string): ThunkType => (
    dispatch, getState: () => AppStateType) => {
    dispatch(updatedCardsStatusAC("loading"))
    let cardsPack_id = getState().cards.cardsPack_id
    cardsAPI.createCard({cardsPack_id, question: newTitleQuestion, answer: newTitleAnswer, grade: 0})
        .then(() => {
            dispatch(getCardsTC())
            dispatch(updatedCardsStatusAC("succeeded"))
        })
        .catch((error) => {
            if (error.response.data.error.length) {
                dispatch(setErrorMessageAC(error.response.data.error))
            } else {
                dispatch(setErrorMessageAC('Some error occurred'))
            }
            dispatch(updatedCardsStatusAC("failed"))
        })
        .finally(() => {
            dispatch(updatedCardsStatusAC("idle"))
        })
}
export const updateGradeCardTC = (cardId: string, grade: number): ThunkType => (
    dispatch) => {
    dispatch(updatedCardsStatusAC("loading"))
    cardsAPI.updateCardGrade(cardId, grade)
        .then(res => {
            dispatch(updatedGradeCardAC(res.data.updatedGrade.card_id, res.data.updatedGrade.grade, res.data.updatedGrade.shots))
        })
        .catch((error) => {
            if (error.response.data.error.length) {
                dispatch(setErrorMessageAC(error.response.data.error))
            } else {
                dispatch(setErrorMessageAC('Some error occurred'))
            }
            dispatch(updatedCardsStatusAC("failed"))
        })
        .finally(() => {
            dispatch(updatedCardsStatusAC("idle"))
            dispatch(updatedShowModuleCardAC(true))
        })

}
export const deleteCardTC = (_id: string): ThunkType => (dispatch) => {
    dispatch(updatedCardsStatusAC("loading"))
    cardsAPI.deleteCard(_id)
        .then(() => {
            dispatch(getCardsTC())
            dispatch(updatedCardsStatusAC("succeeded"))
        })
        .catch((error) => {
            if (error.response.data.error.length) {
                dispatch(setErrorMessageAC(error.response.data.error))
            } else {
                dispatch(setErrorMessageAC('Some error occurred'))
            }
            dispatch(updatedCardsStatusAC("failed"))
        })
        .finally(() => {
            dispatch(updatedCardsStatusAC("idle"))
        })
}
export const updateCardTC = (_id: string, question: string, answer: string): ThunkType => (dispatch) => {
    dispatch(updatedCardsStatusAC("loading"))
    cardsAPI.updateCard({_id, question, answer})
        .then(() => {
            dispatch(getCardsTC())
            dispatch(updatedCardsStatusAC("succeeded"))
        })
        .catch((error) => {
            if (error.response.data.error.length) {
                dispatch(setErrorMessageAC(error.response.data.error))
            } else {
                dispatch(setErrorMessageAC('Some error occurred'))
            }
            dispatch(updatedCardsStatusAC("failed"))
        })
        .finally(() => {
            dispatch(updatedCardsStatusAC("idle"))
        })
}
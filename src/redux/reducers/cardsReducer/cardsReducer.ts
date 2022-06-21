import {
    changeCardsPageAC,
    changeCardsPageCountAC,
    changeSortCardsAC,
    editCardAC,
    setCardsAC,
    setIdPacksAC,
    updateCardsTotalCountAC,
    updatedCardsStatusAC,
    updatedGradeCardAC,
    updatedRandomCardAC,
    updatedShowModuleCardAC
} from "./cardsThunkAction";

const initialStateCards:CardsType[] = [
    {
        answer: "",
        question: "",
        cardsPack_id: "",
        grade: 0,
        shots: 0,
        user_id:"",
        created: "",
        updated: "",
        _id: ""
    }
]


const initialState = {
    cardPacks: initialStateCards,
    cardAnswer: '',
    cardQuestion: '',
    cardsPack_id: '',
    min: 0,
    max: 0,
    sortCards: '0updated',
    page: 1,
    pageCount: 10,
    cardsTotalCount: 0,
    randomNumber: 0,
    showModuleCard: true,
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
        case "CARDS/UPDATE-RANDOM-NUMBER":
            return {...state, randomNumber: action.randomNumber}
        case "CARDS/UPDATE-SHOW-MODULE-CARD":
            return {...state, showModuleCard: action.isActive}
        default:
            return state
    }
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
    | ReturnType<typeof updatedGradeCardAC>
    | ReturnType<typeof updatedCardsStatusAC>
    | ReturnType<typeof updatedRandomCardAC>
    | ReturnType<typeof updatedShowModuleCardAC>
    | ReturnType<typeof editCardAC>


export type CardsStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
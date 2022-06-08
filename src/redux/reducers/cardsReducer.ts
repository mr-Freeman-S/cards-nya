import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../store";
import {AnyAction} from "redux";
import {packsAPI} from "../../api/packsAPI";
import {CardPacksType, ResponsePacksType} from "../../utils/types";

enum actions {
    FETCH_CARDS = "FETCH_CARDS",
    CHANGE_SORT_CARDS = "CHANGE_SORT_CARDS"
}

const initialState: ResponsePacksType = {} as ResponsePacksType

export const cardsReducer = (state = initialState, action: generalType): ResponsePacksType => {
    switch (action.type) {
        case actions.FETCH_CARDS:
        case actions.CHANGE_SORT_CARDS:
            let copyState = {...state}
            copyState.cardPacks = action.payload.cards
            return copyState
        default:
            return state;
    }
}


type generalType = fetchCards | changeSortCardsType


type fetchCards = ReturnType<typeof fetchCards>
export const fetchCards = (cards: CardPacksType[]) => ({
    type: actions.FETCH_CARDS,
    payload: {
        cards
    }
} as const)

type changeSortCardsType = ReturnType<typeof changeSortCards>
export const changeSortCards = (cards: CardPacksType[]) => ({
    type: actions.CHANGE_SORT_CARDS,
    payload: {
        cards
    }
} as const)


// Thunks

export const fetchCardsTC = (): ThunkAction<void, AppStateType, unknown, AnyAction> => (dispatch) => {
    packsAPI.getPacks().then(res => dispatch(fetchCards(res.data.cardPacks)))
}

export const changeSortCardsTC = (sortBy: 'desc' | 'asc'): ThunkAction<void, AppStateType, unknown, AnyAction> => (dispatch) => {
    packsAPI.getPacks({sortPacks: sortBy === 'desc' ? 'sortPacks=1updated' : 'sortPacks=0updated'}).then(res => dispatch(changeSortCards(res.data.cardPacks)))
}
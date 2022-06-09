import {AppStateType, ThunkType} from "../store";
import {packsAPI} from "../../api/packsAPI";

const initialState = {
    cardPacks: [] as Array<CardPacksType>,
    packName: '',
    min: 0,
    max: 0,
    sortPacks: '0updated',
    page: 1,
    pageCount: 10,
    user_id: '',
    cardPacksTotalCount: 0,
    packsStatus: 'idle' as PacksStatusType
}

//Reducer
export const packsCardReducer = (state: InitialStateType = initialState, action: PacksReducerActionType): InitialStateType => {
    switch (action.type) {
        case "PACKS/SET-CARD-PACKS":
            return {...state, cardPacks: action.cardPacks}
        case "PACKS/CHANGE-PACKS-PAGE":
            return {...state, page: action.page}
        case "PACKS/UPDATE-PACKS-STATUS":
            return {...state, packsStatus: action.packsStatus}
        case "PACKS/CHANGE-PACKS-PAGE-COUNT":
            return {...state, pageCount: action.pageCount}
        case "PACKS/SET-USER-ID-PACKS":
            return {...state, user_id: action.user_id}
        case "PACKS/UPDATE-CARD-PACKS-TOTAL-COUNT":
            return {...state, cardPacksTotalCount: action.CardPacksTotalCount}
        case "PACKS/CHANGE-SORT-CARDS":
            return {...state, sortPacks: action.sortPacks}
        default:
            return state
    }
}


//AC
export const setCardPacksAC = (cardPacks: CardPacksType[]) => {
    return {type: 'PACKS/SET-CARD-PACKS', cardPacks} as const
}
export const setPacksPageAC = (page: number) => {
    return {type: 'PACKS/CHANGE-PACKS-PAGE', page} as const
}
export const updatePacksStatusAC = (packsStatus: PacksStatusType) => {
    return {type: 'PACKS/UPDATE-PACKS-STATUS', packsStatus} as const
}
export const updateCardPacksTotalCountAC = (CardPacksTotalCount: number) => {
    return {type: 'PACKS/UPDATE-CARD-PACKS-TOTAL-COUNT', CardPacksTotalCount} as const
}
export const changePacksPageCountAC = (pageCount: number) => {
    return {type: 'PACKS/CHANGE-PACKS-PAGE-COUNT', pageCount} as const
}
export const setUserIdPacksAC = (user_id: string) => {
    return {type: 'PACKS/SET-USER-ID-PACKS', user_id} as const
}
export const changeSortPackCards = (sortPacks: string) => {
    return {type: 'PACKS/CHANGE-SORT-CARDS', sortPacks} as const
}


//Thunks
export const getCardPackTC = (): ThunkType => (dispatch, getState: () => AppStateType) => {
    dispatch(updatePacksStatusAC("loading"))
    const {packName, min, max, sortPacks, page, pageCount, user_id} = getState().packsCard
    packsAPI.getPacks({packName, min, max, sortPacks, page, pageCount, user_id})
        .then(res => {
            dispatch(setCardPacksAC(res.data.cardPacks))
            dispatch(updateCardPacksTotalCountAC(res.data.cardPacksTotalCount))
        })
        .catch(e => {
        })
        .finally(() => {
            dispatch(updatePacksStatusAC("idle"))
        })
}

//Types
type InitialStateType = typeof initialState

export type CardPacksType = {
    _id: string
    user_id: string
    user_name: string
    name: string
    cardsCount: number
    created: string
    updated: string
}

export type PacksReducerActionType =
    ReturnType<typeof setCardPacksAC>
    | ReturnType<typeof setPacksPageAC>
    | ReturnType<typeof updatePacksStatusAC>
    | ReturnType<typeof changePacksPageCountAC>
    | ReturnType<typeof updateCardPacksTotalCountAC>
    | ReturnType<typeof setUserIdPacksAC>
    | ReturnType<typeof changeSortPackCards>

export type PacksStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
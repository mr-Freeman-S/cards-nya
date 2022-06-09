import {AppStateType, ThunkType} from "../store";
import {CreatePackType, packsAPI} from "../../api/packsAPI";

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
        case "PACKS/CHANGE-PAGE":
            return {...state, page: action.page}
        case "PACKS/UPDATE-PACKS-STATUS":
            return {...state, packsStatus: action.packsStatus}
        case "PACKS/CHANGE-PAGE-COUNT":
            return {...state, pageCount: action.pageCount}
        case "PACKS/SET-USER-ID-PACKS":
            return {...state, user_id: action.user_id}
        case "PACKS/UPDATE-CARD-PACKS-TOTAL-COUNT":
            return {...state, cardPacksTotalCount: action.CardPacksTotalCount}
        case "PACKS/CHANGE-SORT-CARDS":
            return {...state, sortPacks: action.sortPacks}
        case "PACKS/SEARCH-PACKS":
            return {...state, packName: action.packName}
        case "PACKS/CREATE-PACK":
            return {...state, ...action.cardPacks}
        default:
            return state
    }
}


//AC
export const setCardPacksAC = (cardPacks: CardPacksType[]) => {
    return {type: 'PACKS/SET-CARD-PACKS', cardPacks} as const
}
export const setPageAC = (page: number) => {
    return {type: 'PACKS/CHANGE-PAGE', page} as const
}
export const updatePacksStatusAC = (packsStatus: PacksStatusType) => {
    return {type: 'PACKS/UPDATE-PACKS-STATUS', packsStatus} as const
}
export const updateCardPacksTotalCountAC = (CardPacksTotalCount: number) => {
    return {type: 'PACKS/UPDATE-CARD-PACKS-TOTAL-COUNT', CardPacksTotalCount} as const
}
export const changePageCountAC = (pageCount: number) => {
    return {type: 'PACKS/CHANGE-PAGE-COUNT', pageCount} as const
}
export const setUserIdPacksAC = (user_id: string) => {
    return {type: 'PACKS/SET-USER-ID-PACKS', user_id} as const
}
export const changeSortCards = (sortPacks: string) => {
    return {type: 'PACKS/CHANGE-SORT-CARDS', sortPacks} as const
}
export const searchPackAC = (packName: string) => {
    return {type: 'PACKS/SEARCH-PACKS', packName} as const
}
export const createPackAC = (cardPacks: CreatePackType) => {
    return {type: "PACKS/CREATE-PACK", cardPacks} as const
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

export const createCardPackTC = (name?:string, deckCover?: string): ThunkType => (dispatch) => {
    dispatch(updatePacksStatusAC("loading"))
    packsAPI.createPack({name, deckCover, private:false})
        .then(res => {
            dispatch(createPackAC(res.data.newCardsPack))
            dispatch(getCardPackTC())
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
    | ReturnType<typeof setPageAC>
    | ReturnType<typeof updatePacksStatusAC>
    | ReturnType<typeof changePageCountAC>
    | ReturnType<typeof updateCardPacksTotalCountAC>
    | ReturnType<typeof setUserIdPacksAC>
    | ReturnType<typeof changeSortCards>
    | ReturnType<typeof searchPackAC>
    | ReturnType<typeof createPackAC>

export type PacksStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
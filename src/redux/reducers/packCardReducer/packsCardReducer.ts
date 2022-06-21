import {
    changePacksPageAC,
    changePacksPageCountAC,
    changeSortPackCardsAC,
    editPackNameAC,
    fetchMinMaxCardCountAC,
    searchPackAC,
    setCardPacksAC,
    setMinMaxSearchCardAC,
    setUserIdPacksAC,
    updateCardPacksTotalCountAC,
    updatePacksStatusAC
} from "./packCardThunkAction";

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
    packsStatus: 'idle' as PacksStatusType,
    minCardsCount: 0,
    maxCardsCount: 0,
    searchPackName: ''
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
        case "PACKS/CHANGE-SORT-PACKS-CARDS":
            return {...state, sortPacks: action.sortPacks}
        case "PACKS/SEARCH-PACKS":
            return {...state, searchPackName: action.searchPackName}
        case "PACKS/FETCH-MINMAX-COUNT-CARDS":
            return {...state, minCardsCount: action.minCardsCount, maxCardsCount: action.maxCardsCount}
        case 'PACKS/SET-MINMAX-SEARCH-CARDS':
            return {...state, min: action.min, max: action.max}
        case "PACKS/EDIT-PACK-NAME":
            return {...state, packName: action.packName}
        default:
            return state
    }
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
    | ReturnType<typeof changePacksPageAC>
    | ReturnType<typeof updatePacksStatusAC>
    | ReturnType<typeof changePacksPageCountAC>
    | ReturnType<typeof updateCardPacksTotalCountAC>
    | ReturnType<typeof setUserIdPacksAC>
    | ReturnType<typeof searchPackAC>
    | ReturnType<typeof changeSortPackCardsAC>
    | ReturnType<typeof fetchMinMaxCardCountAC>
    | ReturnType<typeof setMinMaxSearchCardAC>
    | ReturnType<typeof editPackNameAC>

export type PacksStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
import {AppStateType, ThunkType} from "../store";
import {CreatePackType, packsAPI} from "../../api/packsAPI";
import {setErrorMessageAC} from "./appReducer";

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
    searchPackName:''
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


//AC
export const setCardPacksAC = (cardPacks: CardPacksType[]) => {
    return {type: 'PACKS/SET-CARD-PACKS', cardPacks} as const
}
export const changePacksPageAC = (page: number) => {
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
export const changeSortPackCardsAC = (sortPacks: string) => {
    return {type: 'PACKS/CHANGE-SORT-PACKS-CARDS', sortPacks} as const
}
export const fetchMinMaxCardCountAC = (minCardsCount: number, maxCardsCount: number) => {
    return {type: 'PACKS/FETCH-MINMAX-COUNT-CARDS', minCardsCount, maxCardsCount} as const
}
export const setMinMaxSearchCardAC = (min: number, max: number) => {
    return {type: 'PACKS/SET-MINMAX-SEARCH-CARDS', min, max} as const
}
export const searchPackAC = (searchPackName: string) => {
    return {type: 'PACKS/SEARCH-PACKS', searchPackName} as const
}
export const editPackNameAC = (packName: string) => {
    return {type: 'PACKS/EDIT-PACK-NAME', packName} as const
}

//Thunks
export const getCardPackTC = (): ThunkType => (dispatch, getState: () => AppStateType) => {
    dispatch(updatePacksStatusAC("loading"))
    const {searchPackName, min, max, sortPacks, page, pageCount, user_id} = getState().packsCard
    packsAPI.getPacks({packName:searchPackName, min, max, sortPacks, page, pageCount, user_id})
        .then(res => {
            dispatch(setCardPacksAC(res.data.cardPacks))
            dispatch(updateCardPacksTotalCountAC(res.data.cardPacksTotalCount))
            dispatch(fetchMinMaxCardCountAC(res.data.minCardsCount, res.data.maxCardsCount))
        })
        .catch((error) => {
            if (error.response.data.error.length) {
                dispatch(setErrorMessageAC(error.response.data.error))
            } else {
                dispatch(setErrorMessageAC('Some error occurred'))
            }
            dispatch(updatePacksStatusAC("failed"))
        })
        .finally(() => {
            dispatch(updatePacksStatusAC("idle"))
        })
}

export const createCardPackTC = (name?: string, deckCover?: string, privatePack?: boolean): ThunkType => (dispatch) => {
    dispatch(updatePacksStatusAC("loading"))
    packsAPI.createPack({name, deckCover, private: privatePack})
        .then(() => {
            dispatch(getCardPackTC())
        })
        .catch((error) => {
            if (error.response.data.error.length) {
                dispatch(setErrorMessageAC(error.response.data.error))
            } else {
                dispatch(setErrorMessageAC('Some error occurred'))
            }
            dispatch(updatePacksStatusAC("failed"))
        })
        .finally(() => {
            dispatch(updatePacksStatusAC("idle"))
        })
}

export const deleteCardPackTC = (_id: string): ThunkType => (dispatch) => {
    dispatch(updatePacksStatusAC("loading"))
    packsAPI.deletePack(_id)
        .then(() => {
            dispatch(getCardPackTC())
        })
        .catch((error) => {
            if (error.response.data.error.length) {
                dispatch(setErrorMessageAC(error.response.data.error))
            } else {
                dispatch(setErrorMessageAC('Some error occurred'))
            }
            dispatch(updatePacksStatusAC("failed"))
        })
        .finally(() => {
            dispatch(updatePacksStatusAC("idle"))
        })
}

export const updateCardPackTC = (_id: string, name: string): ThunkType => (dispatch) => {
    dispatch(updatePacksStatusAC("loading"))
    packsAPI.updatePack({_id, name})
        .then((res) => {
            dispatch(editPackNameAC(res.data.updatedCardsPack.name))
            dispatch(getCardPackTC())
        })
        .catch((error) => {
            if (error.response.data.error.length) {
                dispatch(setErrorMessageAC(error.response.data.error))
            } else {
                dispatch(setErrorMessageAC('Some error occurred'))
            }
            dispatch(updatePacksStatusAC("failed"))
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
    | ReturnType<typeof changePacksPageAC>
    | ReturnType<typeof updatePacksStatusAC>
    | ReturnType<typeof changePacksPageCountAC>
    | ReturnType<typeof updateCardPacksTotalCountAC>
    | ReturnType<typeof setUserIdPacksAC>
    | ReturnType<typeof searchPackAC>
//    | ReturnType<typeof createPackAC>
    | ReturnType<typeof changeSortPackCardsAC>
    | ReturnType<typeof fetchMinMaxCardCountAC>
    | ReturnType<typeof setMinMaxSearchCardAC>
    | ReturnType<typeof editPackNameAC>

export type PacksStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
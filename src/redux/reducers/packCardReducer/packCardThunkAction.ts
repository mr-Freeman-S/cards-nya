import {AppStateType, ThunkType} from "../../store";
import {packsAPI} from "../../../api/packsAPI";
import {CardPacksType, PacksStatusType} from "./packsCardReducer";
import {setErrorMessageAC} from "../appReducer/appThunkAction";


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
    packsAPI.getPacks({packName: searchPackName, min, max, sortPacks, page, pageCount, user_id})
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

import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import {setMinMaxSearchCardAC, setUserIdPacksAC} from "../../../redux/reducers/packsCardReducer";


export const ButtonsShowCards = () => {
    const user_id = useAppSelector(state => state.auth._id)
    const dispatch = useAppDispatch()
    const {minCardsCount,maxCardsCount} = useAppSelector(state => state.packsCard)

    const showMyCards = () => {
        dispatch(setUserIdPacksAC(user_id))
        dispatch(setMinMaxSearchCardAC(minCardsCount,maxCardsCount))
    }
    const showAllCards = () => {
        dispatch(setUserIdPacksAC(''))
        dispatch(setMinMaxSearchCardAC(minCardsCount,maxCardsCount))
    }
    return (
        <div>
            <button onClick={showAllCards}>All</button>
            <button onClick={showMyCards}>My</button>
        </div>
    );
};
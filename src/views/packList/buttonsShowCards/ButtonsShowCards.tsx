import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import {setMinMaxSearchCardAC, setUserIdPacksAC} from "../../../redux/reducers/packsCardReducer";
import  style from './ButtonsShowCards.module.css';


export const ButtonsShowCards = () => {
    const user_id = useAppSelector(state => state.auth._id)
    const packId = useAppSelector(state => state.packsCard.user_id)
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
        <div className={style.container}>
            <button className={packId? style.button: `${style.button} ${style.active}`} onClick={showAllCards}>All</button>
            <button className={!packId? style.button: `${style.button} ${style.active}`} onClick={showMyCards}>My</button>
        </div>
    );
};
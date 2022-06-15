import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import {setMinMaxSearchCardAC, setUserIdPacksAC} from "../../../redux/reducers/packsCardReducer";
import  style from './ButtonsShowCards.module.css';


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
        <div className={style.container}>
            <button className={style.allClick} onClick={showAllCards}>All</button>
            <button className={style.myClick} onClick={showMyCards}>My</button>
        </div>
    );
};
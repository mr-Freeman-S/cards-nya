import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import {setUserIdPacksAC} from "../../../redux/reducers/packsCardReducer";


export const ButtonsShowCards = () => {
    const user_id = useAppSelector(state => state.auth._id)
    const dispatch = useAppDispatch()

    const showMyCards = () => {
        dispatch(setUserIdPacksAC(user_id))
    }
    const showAllCards = () => {
        dispatch(setUserIdPacksAC(''))
    }
    return (
        <div>
            <button onClick={showAllCards}>All</button>
            <button onClick={showMyCards}>My</button>
        </div>
    );
};
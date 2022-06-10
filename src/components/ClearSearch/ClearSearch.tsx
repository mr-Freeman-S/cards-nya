import React from "react";
import {useAppDispatch} from "../../redux/store";
import {getCardPackTC, searchPackAC} from "../../redux/reducers/packsCardReducer";

export const ClearSearch = () => {

    const dispatch = useAppDispatch()

    const onclickHandler = () => {
        dispatch(searchPackAC(""))
        dispatch(getCardPackTC())
    }

    return (
        <button onClick={onclickHandler}>Clear Search</button>
    )
}
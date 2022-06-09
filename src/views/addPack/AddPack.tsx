import React from "react"
import {useAppDispatch} from "../../redux/store";
import {createCardPackTC} from "../../redux/reducers/packsCardReducer";

export const AddPack = () => {

    const dispatch = useAppDispatch()
    const packName: string = "Pack by DreamTeam"

    const onclickHandler = (title: string) => {
        console.log(title)
        dispatch(createCardPackTC(title))
    }

    return (
        <div>
            <button onClick={() => {onclickHandler(packName)}}>Add Pack</button>
        </div>
    )
}
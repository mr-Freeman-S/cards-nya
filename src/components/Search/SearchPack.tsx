import React, {ChangeEvent, useState} from "react";
import {DebounceInput} from "react-debounce-input";
import {useAppDispatch} from "../../redux/store";
import {getCardPackTC, searchPackAC} from "../../redux/reducers/packsCardReducer";


export const SearchPack = () => {

    const dispatch = useAppDispatch()

    const [packName, setPackName] = useState<string>("")

    const searchPacksHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(searchPackAC(e.target.value))
        dispatch(getCardPackTC())
        setPackName(packName)
    }

    return (
        <div>
            <DebounceInput
                minLength={2}
                debounceTimeout={2000}
                placeholder={"Search Pack"}
                value={packName}
                onChange={searchPacksHandler}
            />
        </div>
    )
}
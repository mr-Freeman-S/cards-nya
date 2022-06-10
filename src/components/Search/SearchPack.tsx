import React, {ChangeEvent, useState} from "react";
import {DebounceInput} from "react-debounce-input";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {getCardPackTC, searchPackAC} from "../../redux/reducers/packsCardReducer";


export const SearchPack = () => {

    const packName = useAppSelector<string>(state => state.packsCard.packName)
    const dispatch = useAppDispatch()

    const [value, setValue] = useState<string>(packName)

    const searchPacksHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        dispatch(searchPackAC(e.target.value))
        dispatch(getCardPackTC())
    }

    return (
        <div>
            <DebounceInput
                minLength={2}
                debounceTimeout={2000}
                placeholder={"Search Pack"}
                value={value}
                onChange={searchPacksHandler}
            />
        </div>
    )
}

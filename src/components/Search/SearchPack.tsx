import React, {ChangeEvent, useState} from "react";
import {DebounceInput} from "react-debounce-input";
import {useAppDispatch} from "../../redux/store";
import {getCardPackTC, searchPackAC} from "../../redux/reducers/packsCardReducer";


/*type SearchPropsType = {
    placeholderTitle: string
    value: string
}*/

export const SearchPack = (/*props: SearchPropsType*/) => {

    const dispatch = useAppDispatch()

    const [packName, setPackName] = useState<string>("")

    const searchPacksHandler = () => {
        dispatch(searchPackAC(packName))
        dispatch(getCardPackTC())
        setPackName("")
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.target.value)
    }

    return (
        <div>
            <DebounceInput
                debounceTimeout={1000}
                placeholder={"Search Pack"}
                value={packName}
                onChange={onChangeHandler}
            />
            <button onClick={searchPacksHandler}>Search</button>
        </div>
    )
}
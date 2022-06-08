import React, {ChangeEvent, useState} from "react";
import {DebounceInput} from "react-debounce-input";
import {useAppDispatch} from "../../redux/store";

export const Search = () => {

    //const dispatch = useAppDispatch()

    const [packName, setPackName] = useState<string>("")

    const searchPacksHandler = () => {
        console.log(packName)
        //dispatch(setSearchPackAC(packName))
        //dispatch(getPacksTC())
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.target.value)
    }

    return (
        <div>
            <DebounceInput debounceTimeout={1000} value={packName} onChange={onChangeHandler}/>
            <button onClick={searchPacksHandler}>Search</button>
            <div>value: {packName}</div>
        </div>
    )
}
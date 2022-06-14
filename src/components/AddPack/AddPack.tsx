import React, {useState} from "react"
import {FormAddPack} from "../FormAddPack/FormAddPack";
import {UniverseModalWindow} from "../UniverseModal/UniverseModalWindow";

export const AddPack = () => {
    const [isActive,setIsActive] = useState<boolean>(false)
    return (
        <div>
            <button onClick={()=>setIsActive(true)}>Add Pack</button>
            <UniverseModalWindow isActive={isActive} setActive={setIsActive}><FormAddPack setIsActive={setIsActive}/></UniverseModalWindow>
        </div>
    )
}
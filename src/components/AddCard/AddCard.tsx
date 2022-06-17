import React, {useState} from "react"
import {FormAddCard} from "./FormAddCard";
import {UniverseModalWindow} from "../UniverseModal/UniverseModalWindow";

export const AddCard = () => {
    const [isActive,setIsActive] = useState<boolean>(false)
    return (
        <div>
            <button onClick={()=>setIsActive(true)}>Add Card</button>
            <UniverseModalWindow isActive={isActive} setActive={setIsActive}><FormAddCard setIsActive={setIsActive}/></UniverseModalWindow>
        </div>
    )
}
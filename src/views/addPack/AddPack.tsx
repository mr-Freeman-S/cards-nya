import React from "react"

export const AddPack = () => {

    const packName: string = "packName"

    const onclickHandler = () => {
        console.log(packName)
        //dispatch(createNewPackTC(packName))
    }

    return (
        <div>
            <button onClick={onclickHandler}>Add Pack</button>
        </div>
    )
}
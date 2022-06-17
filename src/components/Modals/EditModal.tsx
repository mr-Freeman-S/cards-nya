import React from 'react';

type EditModalPropsType = {
    title: string
    packId: string
    onClickSaveHandler: (id: string, title: string) => void
    onClickCancelHandler: () => void
    setTitle: (title: string) => void

}

export const EditModal = (props: EditModalPropsType) => {

    return (
        <div>
            <div>
                {`Enter new Name`}
            </div>
            <input style={{marginTop: 30}} value={props.title} onChange={(e) => {
                props.setTitle(e.currentTarget.value)
            }}/>
            <div style={{marginBottom: 40, marginTop: 40}}>
                <button onClick={() => props.onClickSaveHandler(props.packId, props.title)}>Save</button>
                <button style={{marginLeft: 40}} onClick={props.onClickCancelHandler}>Cancel</button>
            </div>
        </div>
    )
};
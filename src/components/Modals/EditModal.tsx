import React from 'react';

type DeleteModalPropsType = {
    title: string
    packId: string
    onClickSaveHandler: (id:string, title:string) => void
    onClickCancelHandler: () => void
    setTitle: (title:string) => void
}

export const EditModal = (props: DeleteModalPropsType) => {
    return (
        <div>
            <div>
                {`Edit new PackName`}
            </div>
            <input style={{marginTop: 40}} value={props.title} onChange={(e) => {
                props.setTitle(e.currentTarget.value)
            }}/>
            <div style={{marginBottom: 40, marginTop: 40}}>
                <button onClick={() => props.onClickSaveHandler(props.packId, props.title)}>Save</button>
                <button style={{marginLeft: 40}} onClick={props.onClickCancelHandler}>Cancel</button>
            </div>
        </div>
    );
};
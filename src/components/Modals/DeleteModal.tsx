import React from 'react';

type DeleteModalPropsType = {
    title?: string
    packId: string
    onClickYesHandler: (id:string) => void
    onClickNoHandler: () => void
}

export const DeleteModal = (props: DeleteModalPropsType) => {
    return (
        <div style={{marginTop: 40}}>
            <div>
                {`Are you really want to delete ${props.title ? props.title : ""} ?`}
            </div>
            <div style={{marginBottom: 40, marginTop: 40}}>
                <button onClick={() => props.onClickYesHandler(props.packId)}>Yes</button>
                <button style={{marginLeft: 40}} onClick={props.onClickNoHandler}>No</button>
            </div>
        </div>
    );
};
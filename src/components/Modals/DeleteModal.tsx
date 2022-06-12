import React from 'react';


type DeleteModalPropsType = {
    name: string
}

export const DeleteModal = (props: DeleteModalPropsType)  => {

    const onClickYesHandler = () => {

    }

    const onClickNoHandler = () => {

    }

    return (
        <div>
            <div>
                {`Are you really want to delete ${props.name} ?`}
            </div>
            <div>
                <button onClick={onClickYesHandler}>Yes</button>
                <button onClick={onClickNoHandler}>No</button>
            </div>
        </div>
    );
};
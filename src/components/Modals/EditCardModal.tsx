import React from 'react';

type EditModalPropsType = {
    packId: string
    onClickSaveHandler: (id: string, question: string, answer: string) => void
    onClickCancelHandler: () => void
    question: string
    answer: string
    setAnswer: (answer: string) => void
    setQuestion: (question: string) => void
}

export const EditCardModal = (props: EditModalPropsType) => {

    return (
        <div>
            <div>
                {`Edit Question`}
            </div>
            <input style={{marginTop: 10}} value={props.question} onChange={(e) => {
                props.setQuestion(e.currentTarget.value)
            }}/>
            <div style={{marginTop: 30}}>
                {`Edit Answer`}
            </div>
            <input style={{marginTop: 10}} value={props.answer} onChange={(e) => {
                props.setAnswer(e.currentTarget.value)
            }}/>
            <div style={{marginBottom: 40, marginTop: 40}}>
                <button onClick={() => props.onClickSaveHandler(props.packId, props.question, props.answer)}>Save</button>
                <button style={{marginLeft: 40}} onClick={props.onClickCancelHandler}>Cancel</button>
            </div>
        </div>
    )
};
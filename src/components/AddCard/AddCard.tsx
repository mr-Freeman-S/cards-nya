import React from "react"
import {useAppDispatch} from "../../redux/store";
import {createCardTC} from "../../redux/reducers/cardsReducer";

export const AddCard = () => {

    const dispatch = useAppDispatch()
    const question: string = "Question"
    const answer: string = "Answer"

    const onclickHandler = (question: string, answer: string) => {
        dispatch(createCardTC(question, answer))
    }

    return (
        <div>
            <button onClick={() => {onclickHandler(question, answer)}}>Add Card</button>
        </div>
    )
}
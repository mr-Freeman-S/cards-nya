import React from 'react';
import style from './CardQuestion.module.css'
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../utils/routingPath";
import {CardsType} from "../../../redux/reducers/cardsReducer";

type LearnPackQuestionPropsType = {
    callback: (isActive: boolean) => void
    namePacks: string
    cardPack: CardsType
}

export const CardQuestion: React.FC<LearnPackQuestionPropsType> = ({callback, namePacks, cardPack}) => {
    const navigate = useNavigate()

    const returnToTable = () => {
        navigate(PATH.PACK_LIST)
    }
    const showAnswer = () => {
        callback(false)
    }

    return (
        <div className={style.container}>
            <div className={style.text}>
                <h2>{`Learn "${namePacks}"`}</h2>
            </div>
            <div className={style.textQuestion}>
                <span>Question:</span>
                {` "${cardPack?.question}"`}
            </div>
            <div className={style.buttons}>
                <button  className={style.buttonCancel} onClick={returnToTable}> Cancel</button>
                <button className={style.buttonShow} onClick={showAnswer}> Show answer</button>
            </div>
        </div>
    );
};
import {useAppDispatch} from "../../redux/store";
import React, {useEffect, useState} from "react";
import SuperInputText from "../SuperInputText/SuperInputText";
import SuperButton from "../SuperButton/SuperButton";
import {createCardTC} from "../../redux/reducers/cardsReducer";
import style from "./FormAddCard.module.css"

type FormAddCardPropsType = {
    setIsActive: (isActive:boolean)=> void
}

export const FormAddCard = ({setIsActive}:FormAddCardPropsType) => {

    const dispatch = useAppDispatch()
    const [question,setQuestion] = useState('')
    const [answer,setAnswer] = useState('')
    const [error,setError] = useState('')
    const cancelHandler = () => setIsActive(false)
    const saveHandler = ()=> {
        if (question && answer){
            dispatch(createCardTC(question,answer))
            setIsActive(false)
        } else {
            setError('Enter question and answer')
        }
    }

    useEffect(()=> {
        setTimeout(() => setError(''), 2000)
    },[error])
    return (
        <div className={style.container}>
            <h3 className={style.title}>Add card</h3>
            <div className={style.questionField}><SuperInputText value={question} onChangeText={setQuestion} placeholder='Question'/></div>
            <div className={style.answerField}><SuperInputText value={answer} onChangeText={setAnswer} placeholder='Answer'/></div>
            <SuperButton onClick={cancelHandler} className={style.cancelBtn}>Cancel</SuperButton>
            <SuperButton onClick={saveHandler} className={style.saveBtn}>Save</SuperButton>
            {error && <div className={style.error}>{error}</div> }
        </div>
    );
};
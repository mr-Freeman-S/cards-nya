import React, {useEffect, useState} from 'react';
import SuperInputText from "../SuperInputText/SuperInputText";
import SuperButton from "../SuperButton/SuperButton";
import style from "./FormAddPack.module.css"
import {createCardPackTC} from "../../redux/reducers/packsCardReducer";
import {useAppDispatch} from "../../redux/store";
import SuperCheckbox from "../SuperCheckbox/SuperCheckbox";

type FormAddPackPropsType = {
    setIsActive: (isActive:boolean)=> void
}

export const FormAddPack = ({setIsActive}:FormAddPackPropsType) => {
    const dispatch = useAppDispatch()
    const [isPrivate,setPrivate] = useState(false)
    const [packName,setPackName] = useState('')
    const [error,setError] = useState('')
    const cancelHandler = () => setIsActive(false)
    const saveHandler = ()=> {
        if (packName){
            dispatch(createCardPackTC(packName,'',isPrivate))
            setIsActive(false)
        } else {
            setError('Enter pack name')
        }
    }

    useEffect(()=> {
        setTimeout(() => setError(''), 2000)
    },[error])
    return (
        <div className={style.container}>
            <h3 className={style.title}>Add pack</h3>
            <div className={style.input}><SuperInputText value={packName} onChangeText={setPackName} placeholder='Pack title'/></div>
            <SuperCheckbox checked={isPrivate} onChangeChecked={setPrivate} /><span>Private</span>
            <SuperButton onClick={cancelHandler} className={style.cancelBtn}>Cancel</SuperButton>
            <SuperButton onClick={saveHandler} className={style.saveBtn}>Save</SuperButton>
            {error && <div className={style.error}>{error}</div> }
        </div>
    );
};

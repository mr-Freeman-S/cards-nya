import React, {useState} from 'react';
import SuperButton from "../../components/SuperButton/SuperButton";
import SuperCheckbox from "../../components/SuperCheckbox/SuperCheckbox";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {setCheck} from "../../redux/reducers/testReducer";
import {Tables} from "../../components/Table/Table";

const Test = () => {
    const checked = useAppSelector(state => state.test.isChecked)
    const dispatch = useAppDispatch()
    const [name,setName] = useState<string>('')
    const onClickAlert = () => {
        alert(`Hello ${name}. I am glad to see you my friend!`)
    }
    const onChangeChecked = () => {
      dispatch(setCheck(!checked))
    }
    return (
        <div style={{


        }}>
            <SuperInputText placeholder="Enter name" value={name} onChangeText={setName} />
            <SuperButton onClick={onClickAlert}>
                CLICK
            </SuperButton>
            <SuperCheckbox checked={checked} onChangeChecked={onChangeChecked} >Hello</SuperCheckbox>
            <Tables />
        </div>
    );
};

export default Test;
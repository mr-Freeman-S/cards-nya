import React, {useState} from 'react';
import SuperButton from "../../components/SuperButton/SuperButton";
import SuperCheckbox from "../../components/SuperCheckbox/SuperCheckbox";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {setCheck} from "../../redux/reducers/testReducer";
import {UniverseModalWindow} from "../../components/UniverseModal/UniverseModalWindow";
import {FormAddPack} from "../../components/FormAddPack/FormAddPack";

const Test = () => {
    const checked = useAppSelector(state => state.test.isChecked)
    const dispatch = useAppDispatch()
    const [name, setName] = useState<string>('')
    const [activeModal, setActiveModal] = useState<boolean>(false)


    const onChangeChecked = () => {
        dispatch(setCheck(!checked))
    }
    return (
        <div style={{}}>
            <SuperInputText placeholder="Enter name" value={name} onChangeText={setName}/>
            <SuperButton onClick={() => setActiveModal(!activeModal)}>
                CLICK
            </SuperButton>
            <SuperCheckbox checked={checked} onChangeChecked={onChangeChecked}>Hello</SuperCheckbox>
            <UniverseModalWindow isActive={activeModal} setActive={setActiveModal}><FormAddPack
                setIsActive={setActiveModal}/></UniverseModalWindow>
        </div>
    );
};

export default Test;
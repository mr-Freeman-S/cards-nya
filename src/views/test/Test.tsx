import React, {useState} from 'react';
import SuperButton from "../../components/SuperButton/SuperButton";
import SuperCheckbox from "../../components/SuperCheckbox/SuperCheckbox";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {setCheck} from "../../redux/reducers/testReducer";
import {TablePacks} from "../../components/TablePacks/TablePacks";
import {TableCards} from "../../components/TableCards/TableCards";
import {MultiRangeSlider} from "../../components/MultiRangeSlider/MultiRangeSlider";
import {UniverseModalWindow} from "../../components/UniverseModal/UniverseModalWindow";
import {Loader} from "../../components/Loader/Loader";

const Test = () => {
    const checked = useAppSelector(state => state.test.isChecked)
    const dispatch = useAppDispatch()
    const [name,setName] = useState<string>('')
    const [{min,max},setMinMax] = useState<{min:number,max:number}>({min:0,max:0})
    const [activeModal,setActiveModal] = useState<boolean>(false)
    const onClickAlert = () => {
        alert(`Hello ${name}. I am glad to see you my friend!`)
    }

    const onChangeChecked = () => {
      dispatch(setCheck(!checked))
    }

    const onMouse = ()=> {
        console.log(min, max)
    }

    const onChangeS = ({min,max}:{min:number,max:number}) => {
        //setMinMax({min,max})
    }
    return (
        <div style={{
        }}>
            <SuperInputText placeholder="Enter name" value={name} onChangeText={setName} />
            <SuperButton onClick={()=> setActiveModal(!activeModal)}>
                CLICK
            </SuperButton>
            <SuperCheckbox checked={checked} onChangeChecked={onChangeChecked} >Hello</SuperCheckbox>
            {/*<TablePacks />*/}
            {/*<TableCards />*/}
            <UniverseModalWindow isActive={activeModal} setActive={setActiveModal}><Loader/></UniverseModalWindow>
        </div>
    );
};

export default Test;
import React, {useState} from 'react';
import SuperButton from "../../components/SuperButton/SuperButton";
import SuperCheckbox from "../../components/SuperCheckbox/SuperCheckbox";
import SuperInputText from "../../components/SuperInputText/SuperInputText";

const Test = () => {
    const [checked,setChecked] = useState<boolean>(false)
    const [name,setName] = useState<string>('')
    const onClickAlert = () => {

        alert(`Hello ${name}. I glad to see you my friend!`)
    }
    return (
        <div style={{
            display:'block'

        }}>
            <SuperInputText placeholder="Enter name" value={name} onChangeText={setName} />
            <SuperButton onClick={onClickAlert}>
                CLICK
            </SuperButton>
            <SuperCheckbox checked={checked} onChangeChecked={setChecked} />

        </div>
    );
};

export default Test;
import React, {useState} from 'react';
import SuperButton from "../../components/SuperButton/SuperButton";
import SuperCheckbox from "../../components/SuperCheckbox/SuperCheckbox";
import SuperInputText from "../../components/SuperInputText/SuperInputText";

const Test = () => {
    const [checked,setChecked] = useState<boolean>(false)
    return (
        <div>
            <SuperButton>
                CLICK
            </SuperButton>
            <SuperCheckbox checked={checked} onChangeChecked={setChecked} />
            <SuperInputText/>
        </div>
    );
};

export default Test;
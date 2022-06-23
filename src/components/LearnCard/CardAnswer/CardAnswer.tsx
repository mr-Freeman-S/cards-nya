import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from '@mui/material';
import React from 'react';
import {CardsType, setCardsAC, updatedRandomCardAC} from "../../../redux/reducers/cardsReducer";
import style from './CardAnswer.module.css'
import {PATH} from "../../../utils/routingPath";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../redux/store";


type LearnPackAnswerPropsType = {
    callback: (isActive: boolean, grade: number) => void
    namePack: string
    cardPack: CardsType
}

export const CardAnswer: React.FC<LearnPackAnswerPropsType> = ({cardPack, namePack, callback}) => {
    const [value, setValue] = React.useState(5);
    const navigate = useNavigate()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number((event.target as HTMLInputElement).value))
    }
    const showNextCard = () => {
        callback(true, value)
    }
    const returnToTable = () => {
        navigate(PATH.PACK_LIST)
    }
    return (
        <div className={style.container}>
            <div>
                <h2>Learn {`"${namePack}"`}</h2>
            </div>
            <div className={style.text}>
                <div className={style.textQuestion}>
                    <span>Question:</span>
                    {` "${cardPack?.question}"`}
                </div>
                <div className={style.textAnswer}>
                    <span>Answer:</span>
                    {` "${cardPack?.answer}"`}
                </div>

            </div>
            <div className={style.radioMain}>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group"><span
                        style={{color: '#21268F', fontSize: '18px'}}>Rate yourself:</span></FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                    >
                        <FormControlLabel value={1} control={<Radio sx={{
                            '& .MuiSvgIcon-root': {
                                fontSize: 16,
                            },
                        }} size={'small'}/>} label="Did not know"/>
                        <FormControlLabel value={2} control={<Radio sx={{
                            '& .MuiSvgIcon-root': {
                                fontSize: 16,
                            },
                        }} size={'small'}/>} label="Forgot"/>
                        <FormControlLabel value={3} control={<Radio sx={{
                            '& .MuiSvgIcon-root': {
                                fontSize: 16,
                            },
                        }} size={'small'}/>} label="A lot of thought"/>
                        <FormControlLabel value={4} control={<Radio sx={{
                            '& .MuiSvgIcon-root': {
                                fontSize: 16,
                            },
                        }} size={'small'}/>} label="Сonfused"/>
                        <FormControlLabel value={5} control={<Radio sx={{
                            '& .MuiSvgIcon-root': {
                                fontSize: 16,
                            },
                        }} size={'small'}/>} label="Knew the answer"/>
                    </RadioGroup>
                </FormControl>
            </div>
            <div className={style.shots}>
                <span>{`Card has been shown ${cardPack.shots} times`}</span>
            </div>
            <div className={style.buttons}>
                <button  className={style.buttonCancel} onClick={returnToTable}>Cancel</button>
                <button  className={style.buttonNext} onClick={showNextCard}>Next</button>
            </div>
        </div>
    );
};



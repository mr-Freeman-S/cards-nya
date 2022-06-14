import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useCallback, useEffect, useRef} from 'react';
import style from './multiRangeSlider.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type MultiRangeSliderType = DefaultInputPropsType & {
    min: number
    max: number
    minVal:number
    maxVal:number
    setMinVal: (n:number) => void
    setMaxVal: (n:number) => void
    //onChangeSlider: ({min, max}: { min: number, max: number }) => void


}

export const MultiRangeSlider = (({min, max,minVal,maxVal,setMinVal,setMaxVal, /*onChangeSlider*/ ...restProps}: MultiRangeSliderType) => {

    const minValRef = useRef<HTMLInputElement>(null)
    const maxValRef = useRef<HTMLInputElement>(null)
    const range = useRef<HTMLDivElement>(null)

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                // тут нужно подправить стиль

                range.current.style.width = `${maxPercent - minPercent}%`
            }
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        setMinVal(minVal)
        setMaxVal(maxVal)
        //onChangeSlider({min: minVal, max: maxVal});
    }, [minVal, maxVal,setMinVal, setMaxVal/*onChangeSlider*/]);


    const minOnchangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(+event.target.value, maxVal - 1)
        setMinVal(value)
        event.target.value = value.toString();
    }
    const maxOnchangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(+event.target.value, minVal + 1)
        setMaxVal(value)
        event.target.value = value.toString();
    }
    // Get min and max values when their state changes
    useEffect(() => {
        setMinVal(min)
        setMaxVal(max)
       // onChangeSlider({min: minVal, max: maxVal});
    }, [min, max,setMinVal,setMaxVal /*onChangeSlider*/]);

    return (
        <div className={style.container}>
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                ref={minValRef}
                onChange={minOnchangeHandler}
                className={`${style.thumb} ${style.thumbZIndex3}`}
                onMouseUp={restProps.onMouseUp}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                ref={maxValRef}
                onChange={maxOnchangeHandler}
                className={`${style.thumb} ${style.thumbZIndex4}`}
                onMouseUp={restProps.onMouseUp}
            />

            <div className={style.slider}>
                <div className={style.slider__track}/>
                <div ref={range} className={style.slider__range}/>
                <div className={style.slider__left_value}>{minVal}</div>
                <div className={style.slider__right_value}>{maxVal}</div>
            </div>
        </div>
    );
});


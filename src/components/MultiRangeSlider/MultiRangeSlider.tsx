import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useCallback, useEffect, useRef} from 'react';
import style from './multiRangeSlider.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type MultiRangeSliderType = DefaultInputPropsType & {
    min: number
    max: number
    minVal: number
    maxVal: number
    setMinVal: (n: number) => void
    setMaxVal: (n: number) => void
}

export const MultiRangeSlider: React.FC<MultiRangeSliderType> = (({
                                                                      min,
                                                                      max,
                                                                      minVal,
                                                                      maxVal,
                                                                      setMinVal,
                                                                      setMaxVal, /*onChangeSlider*/
                                                                      ...restProps
                                                                  }) => {

    const minValRef = useRef<HTMLInputElement>(null)
    const maxValRef = useRef<HTMLInputElement>(null)
    const range = useRef<HTMLDivElement>(null)

    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(+maxValRef.current.value);
            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(+minValRef.current.value);
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`
            }
        }
    }, [maxVal, getPercent]);

    useEffect(() => {
        setMinVal(minVal)
        setMaxVal(maxVal)
    }, [minVal, maxVal, setMinVal, setMaxVal]);


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

    useEffect(() => {
        setMinVal(min)
        setMaxVal(max)

    }, [min, max, setMinVal, setMaxVal]);

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


import React from 'react';
import style from './multiRangeSlider.module.css'

export const MultiRangeSlider = () => {
    return (
        <>
            <input
                type="range"
                min="0"
                max="1000"
                className={`${style.thumb} ${style.thumbZIndex3}`}/>
            <input
                type="range"
                min="0"
                max="1000"
                className={`${style.thumb} ${style.thumbZIndex4}`}/>
            <div className={style.slider}>
                <div className={style.slider__track}/>
                <div className={style.slider__range}/>
            </div>
        </>
    );
};


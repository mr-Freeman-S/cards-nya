import React from 'react';
import style from './Preloader.module.css'


export const Preloader = () => {
    return         <div className={style.loading}>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
        </div>
};

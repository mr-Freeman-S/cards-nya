import React from 'react';
import style from './Preloader.module.css'


export const Preloader: React.FC<{ isActive: boolean }> = ({isActive}) => {
    return <div className={isActive ? `${style.loader} ${style.active}` : style.loader}>
        <div className={style.loading}>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
        </div>
    </div>

};

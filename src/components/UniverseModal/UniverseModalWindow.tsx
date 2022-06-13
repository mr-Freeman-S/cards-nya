import React from 'react';
import style from './UniverseModal.module.css'

type UniverseModalWindowPropsType = {
    isActive: boolean
    setActive: (active: boolean) => void
    children?:React.ReactNode

}

export const UniverseModalWindow = ({isActive, setActive,children}: UniverseModalWindowPropsType) => {
    return (
        <div className={isActive ? `${style.modal} ${style.active}` : style.modal} onClick={() => setActive(false)}>
            <div className={isActive ? `${style.modal__content} ${style.active}` : style.modal__content}
                 onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};


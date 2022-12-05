import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import s from './SuperCheckbox.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = (
    {
        type,
        onChange, onChangeChecked,
        className, spanClassName,
        children,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeChecked && onChangeChecked(e.currentTarget.checked)
        onChange && onChange(e)
    }

    const finalInputClassName = ` ${className ? className : s._checkbox}`

    return (
        <label className='container'>
            <input
                type={'checkbox'}
                onChange={onChangeCallback}
                className={finalInputClassName}


                {...restProps}
            />
            <svg
                className={`${s.checkbox} ${restProps.checked ? s.checkboxActive : ""}`}

                aria-hidden="true"
                viewBox="0 0 15 11"
                fill="none"
            >
                <path
                    d="M1 4.5L5 9L14 1"
                    strokeWidth="2"
                    stroke={restProps.checked ? "#fff" : "none"}
                />
            </svg>
            {children && <span className={s.spanClassName}>{children}</span>}
        </label>

    )
}

export default SuperCheckbox

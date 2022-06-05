import React from 'react'
import style from './Page404.module.css'

export function Page404() {
    return (
        <div className={style.main}>
            <div className={style.container}>
                <div className={style.content}>Oops!
                    <p className={style.errorText}>We can't seem to find the page you're looking for</p>
                </div>
                <img alt='ERROR 404'
                    src="https://a0.muscache.com/airbnb/static/error_pages/404-Airbnb_final-d652ff855b1335dd3eedc3baa8dc8b69.gif"/>
            </div>
        </div>
    )
}

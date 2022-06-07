import React, {useEffect} from 'react';
import {cardsAPI} from "../../api/cardsAPI";
import {packsAPI} from "../../api/packsAPI";
import {authMe} from "../../redux/reducers/loginReducer";
import {loginAPI} from "../../api/loginAPI";
import {log} from "util";

export  const PackList = () => {
    useEffect(()=> {
        packsAPI.getPacks({}).then(console.log)
    }, [])
    return (
        <div>
            <button onClick={()=> { loginAPI.auth().then(res => console.log(res))}}/>
            PackList
        </div>
    );
};
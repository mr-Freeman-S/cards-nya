import React from 'react';
import {CardPacksType} from "../../redux/reducers/packsReducer";

type PacksListPropsType = {
    packs: CardPacksType[]
}

export const PacksList = (props: PacksListPropsType) => {

    return (
        <div>
            {props.packs.map((el, i) => {
                return <div key={el._id} style={{display: "flex", margin: '5px'}}>
                    {i+1}
                    <div style={{border: '1px solid', margin: '5px', display: 'flex'}}>
                        <div>  {el.name}</div>
                        <div>  {el.cardsCount}</div>
                        <div>  {el.user_name}</div>
                        <div>  {el._id}</div>
                        <div>  {el.user_id}</div>
                        <div>  {el.created}</div>
                        <div>  {el.updated}</div>
                    </div>
                </div>
            })
            }
        </div>
    );
};
import React, {ChangeEvent} from 'react';
import {changePageCountAC, setPageAC} from "../../../redux/reducers/packsReducer";
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import {Pagination} from "@material-ui/core";

export const PaginationCards = () => {
    const pageCount = useAppSelector(state => state.packsCard.pageCount)
    const page = useAppSelector(state => state.packsCard.page)
    const cardPacksTotalCount = useAppSelector(state => state.packsCard.cardPacksTotalCount)

    const numberOfPages = Math.ceil(cardPacksTotalCount / pageCount)

    const dispatch = useAppDispatch()

    const changePageHandler = (event: ChangeEvent<unknown>, page: number) => {
        dispatch(setPageAC(page))
    }
    const changePageCountHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(changePageCountAC(+event.currentTarget.value))
    }

    return <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}>
        <Pagination count={numberOfPages} page={page} color="primary" onChange={changePageHandler}/>
        <span>Show</span>
        <select value={pageCount} onChange={changePageCountHandler}>
            <option>5</option>
            <option>10</option>
        </select>
        <span>per Page</span>
    </div>

}

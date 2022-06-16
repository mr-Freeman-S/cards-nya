import React, {useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {getCardPackTC, setMinMaxSearchCardAC} from "../../redux/reducers/packsCardReducer";
import {Preloader} from "../../components/Preloader/Preloader";
import {Navigate} from "react-router-dom";
import {PATH} from "../../utils/routingPath";
import {PaginationCards} from "./pagination/Pagination";
import {ButtonsShowCards} from "./buttonsShowCards/ButtonsShowCards";
import {TablePacks} from "../../components/TablePacks/TablePacks";
import {MultiRangeSlider} from "../../components/MultiRangeSlider/MultiRangeSlider";
import {SearchPack} from "../../components/Search/SearchPack";
import {AddPack} from "../../components/AddPack/AddPack";
import style from './PackListContainer.module.css'

export const PackListContainer = () => {
    const packs = useAppSelector(state => state.packsCard.cardPacks)
    const page = useAppSelector(state => state.packsCard.page)
    const pageCount = useAppSelector(state => state.packsCard.pageCount)
    const packsStatus = useAppSelector(state => state.packsCard.packsStatus)
    const user_id = useAppSelector(state => state.packsCard.user_id)
    const {min, max, minCardsCount, maxCardsCount} = useAppSelector(state => state.packsCard)
    const sortByUpdatePacks = useAppSelector(state => state.packsCard.sortPacks)
    const isLogged = useAppSelector(state => state.login.isLogged)
    const dispatch = useAppDispatch()

    const [minVal, setMinVal] = useState(minCardsCount)
    const [maxVal, setMaxVal] = useState(maxCardsCount)

    const onMouseUpHandler = useCallback(() => {
        dispatch(setMinMaxSearchCardAC(minVal, maxVal))
    }, [minVal, maxVal, dispatch])

    useEffect(() => {
        dispatch(getCardPackTC())
    }, [dispatch, page, pageCount, user_id, min, max, sortByUpdatePacks])

    if (!isLogged) {
        return <Navigate to={PATH.LOGIN_PAGE}/>
    }
    return (
        <div className={style.parentEl}>
            <div>
                {packsStatus !== 'loading' ? <div className={style.search}><SearchPack/> <AddPack/></div> :
                    <Preloader isActive={packsStatus === 'loading'}/>}
            </div>
            <div className={style.tablePacks}>
                {/*{packsStatus === 'loading' && <Preloader/>}*/}
                {/*{packsStatus !== 'loading' && (<TablePacks rows={packs}/>)}*/}
                <TablePacks rows={packs}/>
            </div>
            <MultiRangeSlider
                min={minCardsCount}
                max={maxCardsCount}
                minVal={minVal}
                maxVal={maxVal}
                setMinVal={setMinVal}
                setMaxVal={setMaxVal}
                onMouseUp={onMouseUpHandler}
            />
            <ButtonsShowCards/>
            <div className={style.pagination}>
                <PaginationCards/>
            </div>
        </div>
    );
};

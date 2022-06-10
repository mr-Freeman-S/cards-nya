import React, {useEffect, useState} from 'react';
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
import {ClearSearch} from "../../components/ClearSearch/ClearSearch";

export const PackListContainer = () => {
    const packs = useAppSelector(state => state.packsCard.cardPacks)
    const page = useAppSelector(state => state.packsCard.page)
    const pageCount = useAppSelector(state => state.packsCard.pageCount)
    const packsStatus = useAppSelector(state => state.packsCard.packsStatus)
    const user_id = useAppSelector(state => state.packsCard.user_id)
    const {min, max} = useAppSelector(state => state.packsCard)
    const {minCardsCount, maxCardsCount} = useAppSelector(state => state.packsCard)
    const sortByUpdatePacks = useAppSelector(state => state.packsCard.sortPacks)
    const isLogged = useAppSelector(state => state.login.isLogged)

    const [minVal, setMinVal] = useState(min)
    const [maxVal, setMaxVal] = useState(max)

    const onMouseUpHandler = () => {
        dispatch(setMinMaxSearchCardAC(minVal, maxVal))
    }
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCardPackTC())
    }, [dispatch, page, pageCount, user_id, min, max, sortByUpdatePacks])

    if (!isLogged) {
        return <Navigate to={PATH.LOGIN_PAGE}/>
    }
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            maxWidth: '1000px',
            alignItems: 'center',
            margin: '0 auto',
            border: '1px solid',
            minHeight: '100%',
            marginTop: '20px'
        }}>
            <div>
                {packsStatus !== 'loading' ? <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}><SearchPack/> <ClearSearch/> <AddPack/></div> : <Preloader />}
            </div>
            <div style={{
                minHeight: '250px',
                display: 'flex',
                alignItems: 'center',
                marginTop: '20px'
            }}>

                {/*{packsStatus === 'loading' && <Preloader/>}*/}

                {/*{packsStatus !== 'loading' && (<TablePacks rows={packs}/>)}*/}
                <TablePacks rows={packs} />
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
            <div style={{flex: '1 1 auto'}}>

                <PaginationCards/>
            </div>
        </div>
    );
};

import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {getCardPackTC} from "../../redux/reducers/packsCardReducer";
import {Preloader} from "../../components/Preloader/Preloader";
import {PacksList} from "./PacksList";
import {Navigate} from "react-router-dom";
import {PATH} from "../../utils/routingPath";
import {PaginationCards} from "./pagination/Pagination";
import {ButtonsShowCards} from "./buttonsShowCards/ButtonsShowCards";

export const PackListContainer = () => {
    const packs = useAppSelector(state => state.packsCard.cardPacks)
    const page = useAppSelector(state => state.packsCard.page)
    const pageCount = useAppSelector(state => state.packsCard.pageCount)
    const packsStatus = useAppSelector(state => state.packsCard.packsStatus)
    const user_id = useAppSelector(state => state.packsCard.user_id)

    const isLogged = useAppSelector(state => state.login.isLogged)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCardPackTC())
    }, [page, pageCount, user_id])

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
            minHeight: '100%'
        }}>
            <div style={{
                minHeight: '250px',
                display: 'flex',
                alignItems: 'center',
            }}>
                {packsStatus === 'loading' && <Preloader/>}

                {packsStatus !== 'loading' && (<PacksList packs={packs}/>)}
            </div>
            <ButtonsShowCards/>
            <div style={{flex: '1 1 auto'}}>
                <PaginationCards/>
            </div>
        </div>
    );
};

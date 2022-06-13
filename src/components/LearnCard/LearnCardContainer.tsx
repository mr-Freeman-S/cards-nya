import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {Navigate, useParams} from "react-router-dom";
import {UniverseModalWindow} from "../UniverseModal/UniverseModalWindow";
import {getCardsTC, setIdPacksAC, updateGradeCardTC} from "../../redux/reducers/cardsReducer";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {CardQuestion} from "./LearnPackQuestion/CardQuestion";
import {Preloader} from "../Preloader/Preloader";
import {PATH} from "../../utils/routingPath";
import {CardAnswer} from "./CardAnswer/CardAnswer";


export const LearnCardContainer = memo(() => {
    console.log('LearnCardContainer')
    const cardsStatus = useAppSelector(state => state.cards.cardsStatus)
    const isLogged = useAppSelector(state => state.login.isLogged)
    const cardPacks = useAppSelector(state => state.cards.cardPacks)

    const {id} = useParams()
    // const namePacks = useAppSelector(state => state.packsCard.cardPacks).filter(el => el._id === id)[0].name
    const namePacks = 'vit'

    console.log(id)

    const dispatch = useAppDispatch()
    const [isActive, setIsActive] = useState<boolean>(true)

    const getRandomInt = useCallback((min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min
    }, [])
    const randomNumber = getRandomInt(0, cardPacks.length)
    const cardPack = cardPacks[randomNumber]

    useEffect(() => {
        dispatch(setIdPacksAC(id!))
        dispatch(getCardsTC())
    }, []);

    const showAnswerCard = (isActive: boolean) => {
        setIsActive(isActive)
    }
    const showQuestionCard = (isActive: boolean, grade: number) => {
        setIsActive(isActive)
        dispatch(updateGradeCardTC(cardPack._id, grade))
    }

    if (!isLogged) {
        return <Navigate to={PATH.LOGIN_PAGE}/>
    }

    return (

        <div>
            {cardsStatus === 'loading' ? <Preloader isActive={true}/>
                : <>
                    <UniverseModalWindow  isActive={isActive} setActive={() => {
                    }}>
                        <CardQuestion
                            callback={showAnswerCard}
                            cardPack={cardPack}
                            namePacks={namePacks}
                        />
                    </UniverseModalWindow>

                    <UniverseModalWindow isActive={!isActive} setActive={() => {
                    }}>
                        <CardAnswer
                            callback={showQuestionCard}
                            cardPack={cardPack}
                            namePacks={namePacks}
                        />
                    </UniverseModalWindow>
                </>
            }


        </div>
    );
})
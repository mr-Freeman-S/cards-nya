import React, {useEffect} from 'react';
import {Navigate, useParams} from "react-router-dom";
import {
    CardsType,
    getCardsTC,
    setCardsAC,
    setIdPacksAC,
    updatedRandomCardAC,
    updatedShowModuleCardAC,
    updateGradeCardTC
} from "../../redux/reducers/cardsReducer";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {Preloader} from "../Preloader/Preloader";
import {PATH} from "../../utils/routingPath";
import {UniverseModalWindow} from '../UniverseModal/UniverseModalWindow';
import {CardQuestion} from "./LearnPackQuestion/CardQuestion";
import {CardAnswer} from "./CardAnswer/CardAnswer";


export const LearnCardContainer = () => {
    const {cardsStatus, cardPacks, randomNumber, showModuleCard} = useAppSelector(state => state.cards)
    const isLogged = useAppSelector(state => state.login.isLogged)
    const dispatch = useAppDispatch()

    const {id, name} = useParams()
    const namePack = name ? name : ''

    const cardPack = cardPacks[randomNumber]

    const cleverRandom = (cardPacks: CardsType[]) => {
        if (cardPacks.length) {
            let rand: Array<number> = []
            cardPacks.map((el, number) => {
                for (let i = 0; i < (6 - Math.floor(el.grade)); i++) {
                    rand.push(number)
                }
            })
            const min = 0;
            const max = Math.floor(rand.length)
            const randomNumber = Math.floor(Math.random() * (max - min)) + min
            dispatch(updatedRandomCardAC(rand[randomNumber]))
        } else {
            dispatch(updatedRandomCardAC(0))
        }
    }

    useEffect(() => {
        if (id) {
            dispatch(setIdPacksAC(id))
            dispatch(getCardsTC())
        }
        return function () {
            dispatch(updatedRandomCardAC(0))
            dispatch(setCardsAC([]))
            dispatch(updatedShowModuleCardAC(true))
        }
    }, []);

    useEffect(() => {
        cleverRandom(cardPacks)
    }, [cardPacks])

    const showAnswerCard = (isActive: boolean) => {
        dispatch(updatedShowModuleCardAC(isActive))
    }
    const showQuestionCard = (isActive: boolean, grade: number) => {
        dispatch(updateGradeCardTC(cardPack._id, grade))
        cleverRandom(cardPacks)
    }

    if (!isLogged) {
        return <Navigate to={PATH.LOGIN_PAGE}/>
    }

    if (cardPacks.length === 0) {
        return <Preloader isActive={true}/>
    }

    return <div>
        {cardsStatus === 'loading' ? <Preloader isActive={true}/>
            : <>
                <UniverseModalWindow isActive={showModuleCard} setActive={() => {
                }}>
                    <CardQuestion
                        callback={showAnswerCard}
                        cardPack={cardPack}
                        namePack={namePack}
                    />
                </UniverseModalWindow>

                <UniverseModalWindow isActive={!showModuleCard} setActive={() => {
                }}>
                    <CardAnswer
                        callback={showQuestionCard}
                        cardPack={cardPack}
                        namePack={namePack}
                    />
                </UniverseModalWindow>
            </>
        }
    </div>
}
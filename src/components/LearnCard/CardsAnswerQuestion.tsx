import React, {useState} from 'react';
import {UniverseModalWindow} from "../UniverseModal/UniverseModalWindow";
import {CardQuestion} from "./LearnPackQuestion/CardQuestion";
import {CardAnswer} from "./CardAnswer/CardAnswer";
import {CardsType} from "../../redux/reducers/cardsReducer";

type CardsAnswerQuestionType = {
    namePack: string
    cardPack: CardsType
    updateGradeCard: (grade: number)=> void
}

export const CardsAnswerQuestion: React.FC<CardsAnswerQuestionType> = ({cardPack, namePack, updateGradeCard}) => {
    const [isActive, setIsActive] = useState<boolean>(true)

    const showAnswerCard = (isActive: boolean) => {
        setIsActive(isActive)
    }
    const showQuestionCard = (isActive: boolean, grade: number) => {
        setIsActive(isActive)
        updateGradeCard(grade)
    }

    return (
        <div>
            <UniverseModalWindow  isActive={isActive} setActive={() => {
            }}>
                <CardQuestion
                    callback={showAnswerCard}
                    cardPack={cardPack}
                    namePack={namePack}
                />
            </UniverseModalWindow>

            <UniverseModalWindow isActive={!isActive} setActive={() => {
            }}>
                <CardAnswer
                    callback={showQuestionCard}
                    cardPack={cardPack}
                    namePack={namePack}
                />
            </UniverseModalWindow>
        </div>
    );
};
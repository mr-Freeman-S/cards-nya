import {useAppDispatch, useAppSelector} from "../../redux/store";
import React, {useEffect, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {AiOutlineArrowUp} from "react-icons/ai";
import TableBody from "@mui/material/TableBody";
import {sortType} from "../TablePacks/TablePacks";
import {CardType} from "../../utils/types";
import {
    changeSortCardsAC,
    deleteCardTC,
    getCardsTC,
    setIdPacksAC,
    updateCardTC
} from "../../redux/reducers/cardsReducer";
import {Rating} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {PATH} from "../../utils/routingPath";
import style from './TableCards.module.css'
import {AddCard} from "../AddCard/AddCard";
import {Preloader} from "../Preloader/Preloader";
import {DeleteModal} from "../Modals/DeleteModal";
import {UniverseModalWindow} from "../UniverseModal/UniverseModalWindow";
import {EditCardModal} from "../Modals/EditCardModal";


const colums = ['Question', 'Answer', 'Last Update', 'Grade']
// const rows = [
//     {
//         _id: '22323123234dfsdfdf23423',
//         question: 'Value',
//         answer: 'djfkjsdfkjskdf',
//         updated: '121',
//         grave: 3
//     }
// ]

export const TableCards = () => {
    const {id} = useParams()
    const rows = useAppSelector(state => state.cards.cardPacks)
    const cardStatus = useAppSelector(state => state.cards.cardsStatus)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [sortBy, setSortBy] = useState<sortType>('desc')
    const [activeModal, setActiveModal] = useState<boolean>(false)
    const [modalMod, setModalMod] = useState<"delete" | "edit">("delete")
    const [answer, setAnswer] = useState<string>("")
    const [question, setQuestion] = useState<string>("")
    const [packId, setPackId] = useState<string>("")


    const sortByUpdatePacks = useAppSelector(state => state.cards.sortCards)
    const myId = useAppSelector<string>(state => state.auth._id)

    useEffect(() => {
        dispatch(setIdPacksAC(id!))
        dispatch(getCardsTC())
    }, [sortByUpdatePacks]);

    const changeSortHandler = () => {
        sortBy === 'asc' ? setSortBy('desc') : setSortBy('asc')
        dispatch(changeSortCardsAC(sortByUpdatePacks === '0updated' ? '1updated' : '0updated'))
    }
    const onClickDeleteHandler = (id: string) => {
        setPackId(id)
        setModalMod("delete")
        setActiveModal(true)
    }

    const onClickEditHandler = (id: string, question: string, answer: string) => {
        setPackId(id)
        setQuestion(question)
        setAnswer(answer)
        setModalMod("edit")
        setActiveModal(true)
    }

    const onClickNoDeleteHandler = () => {
        setActiveModal(false)
    }

    const onClickYesDeleteHandler = (id: string) => {
        dispatch(deleteCardTC(id))
        setActiveModal(false)
    }
    const onClickCancelUpdateHandler = () => {
        setActiveModal(false)
    }
    const onClickSaveUpdateHandler = (id: string, question: string, answer: string) => {
        dispatch(updateCardTC(id, question, answer))
        setActiveModal(false)
    }

    return (
        <div>
            <div className={style.back}>
                {cardStatus !== 'loading'
                    ? <div className={style.back}>
                        <button onClick={() => navigate(PATH.PACK_LIST)}>Back</button>
                        <AddCard/>
                    </div>
                    : <Preloader isActive={cardStatus === 'loading'}/>}
            </div>
            <TableContainer style={{width: 850, margin: '0 auto',}} component={Paper}>
                <Table sx={{width: 850}} aria-label='simple table'>
                    <TableHead>
                        <TableRow sx={{backgroundColor: '#ECECF9'}}>
                            {
                                colums && colums.map((el, i) => {
                                    return (el === 'Last Update' ?
                                        <TableCell className={style.click} key={`${el}_${i}`} onClick={changeSortHandler}
                                                   align={"center"}>
                                            {el}<AiOutlineArrowUp
                                            style={sortBy === 'asc' ? {transform: 'rotate(180deg)'} : {}}/>
                                        </TableCell> : <TableCell key={`${el}_${i}`} align={"center"}>{el}</TableCell>)
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.map((row: CardType) => (
                            <TableRow
                                key={row._id}
                                sx={{
                                    '&:last-child td, &:last-child th': {border: ''},
                                    '&:nth-of-type(2)': {backgroundColor: '#F8F7FD'}
                                }}
                            >
                                <TableCell align={"center"} component='th' scope='row'>
                                    {row.question}
                                </TableCell>
                                <TableCell align='center'>{row.answer}</TableCell>
                                <TableCell align='center'>{row.updated}</TableCell>
                                <TableCell align='center'><Rating name="read-only" value={row.grade}
                                                                  readOnly/></TableCell>
                                <TableCell align='center'>
                                    {myId === row.user_id &&
                                        <button
                                            onClick={() => onClickEditHandler(row._id, row.question, row.answer)}>Edit</button>}
                                    {myId === row.user_id &&
                                        <button onClick={() => onClickDeleteHandler(row._id)}>Delete</button>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <UniverseModalWindow isActive={activeModal} setActive={setActiveModal}>
                {modalMod === "delete" &&
                    <DeleteModal
                        packId={packId}
                        onClickYesHandler={onClickYesDeleteHandler}
                        onClickNoHandler={onClickNoDeleteHandler}
                    />
                }
                {modalMod === "edit" &&
                    <EditCardModal
                        packId={packId}
                        answer={answer}
                        question={question}
                        onClickSaveHandler={onClickSaveUpdateHandler}
                        onClickCancelHandler={onClickCancelUpdateHandler}
                        setAnswer={setAnswer}
                        setQuestion={setQuestion}
                    />
                }
            </UniverseModalWindow>
        </div>
    )
}
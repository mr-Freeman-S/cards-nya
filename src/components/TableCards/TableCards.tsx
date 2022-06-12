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
import {changeSortCardsAC, getCardsTC, setIdPacksAC} from "../../redux/reducers/cardsReducer";
import {Rating} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {PATH} from "../../utils/routingPath";
import style from './TableCards.module.css'
import {AddCard} from "../AddCard/AddCard";
import {Preloader} from "../Preloader/Preloader";


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
    const packsStatus = useAppSelector(state => state.packsCard.packsStatus)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [sortBy, setSortBy] = useState<sortType>('desc')


    const sortByUpdatePacks = useAppSelector(state => state.cards.sortCards)

    useEffect(() => {
        dispatch(setIdPacksAC(id!))
        dispatch(getCardsTC())
    }, [sortByUpdatePacks]);

    const changeSortHandler = () => {
        sortBy === 'asc' ? setSortBy('desc') : setSortBy('asc')
        dispatch(changeSortCardsAC(sortByUpdatePacks === '0updated' ? '1updated' : '0updated'))
    }

    return (
        <div>
            <div className={style.back}>
                {packsStatus !== 'loading'
                    ? <div className={style.back}>
                        <button onClick={() => navigate(PATH.PACK_LIST)}>Back</button>
                        <AddCard/>
                    </div>
                    : <Preloader/>}
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
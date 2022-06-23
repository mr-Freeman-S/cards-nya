import React, {useState} from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {AiOutlineArrowUp} from 'react-icons/ai'
import style from './TablePacks.module.css'
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {
    CardPacksType,
    changeSortPackCardsAC,
    deleteCardPackTC,
    updateCardPackTC
} from "../../redux/reducers/packsCardReducer";
import {useNavigate} from 'react-router-dom'
import {UniverseModalWindow} from "../UniverseModal/UniverseModalWindow";
import {DeleteModal} from "../Modals/DeleteModal";
import {EditModal} from "../Modals/EditModal";


const colums = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions']

export type sortType = 'asc' | 'desc';
type TablePropsType = {
    rows: CardPacksType[]
}


export function TablePacks({rows}: TablePropsType) {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [sortBy, setSortBy] = useState<sortType>('desc')
    const [activeModal, setActiveModal] = useState<boolean>(false)
    const [modalMod, setModalMod] = useState<"delete" | "edit">("delete")
    const [title, setTitle] = useState<string>("")
    const [packId, setPackId] = useState<string>("")
    const sortByUpdatePacks = useAppSelector(state => state.packsCard.sortPacks)
    const myId = useAppSelector<string>(state => state.auth._id)


    const changeSortHandler = () => {
        sortBy === 'asc' ? setSortBy('desc') : setSortBy('asc')
        dispatch(changeSortPackCardsAC(sortByUpdatePacks === '0updated' ? '1updated' : '0updated'))
    }

    const onClickLearnHandler = (id: string, name: string) => {
        name = name.replace(/[^a-zа-яё0-9\s]/gi, ' ');
        navigate(`/cards/learn/${name}/${id}`)
    }

    const onClickDeleteHandler = (id: string, name: string) => {
        setPackId(id)
        setTitle(name)
        setModalMod("delete")
        setActiveModal(true)
    }

    const onClickEditHandler = (id: string, name: string) => {
        setPackId(id)
        setTitle(name)
        setModalMod("edit")
        setActiveModal(true)
    }

    const onClickNoDeleteHandler = () => {
        setActiveModal(false)
    }

    const onClickYesDeleteHandler = (id: string) => {
        dispatch(deleteCardPackTC(id))
        setActiveModal(false)
    }

    const onClickCancelUpdateHandler = () => {
        setActiveModal(false)
    }
    const onClickSaveUpdateHandler = (id: string, name: string) => {
        dispatch(updateCardPackTC(id, name))
        setActiveModal(false)
    }

    const onClickCardsHandler = (id: string) => {
        navigate(`/cards/${id}`)
    }


    return (
        <div>
            <TableContainer style={{width: 850, margin: '0 auto',}} component={Paper}>
                <Table sx={{width: 850}} aria-label='simple table'>
                    <TableHead>
                        <TableRow sx={{backgroundColor: '#ECECF9'}} onClick={(e) => {
                            console.log("row", e)
                        }}>
                            {
                                colums && colums.map((el, i) => {
                                    return (el === 'Last Updated' ?
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
                        {rows && rows.map((row: CardPacksType) => {
                            let date = new Date(row.updated).toLocaleDateString()
                            return <TableRow
                                key={row._id}
                                sx={{
                                    '&:last-child td, &:last-child th': {border: ''},
                                    '&:nth-of-type(2n)': {backgroundColor: '#F8F7FD'}
                                }}
                            >
                                <TableCell
                                    className={`${row.cardsCount > 0 ? style.enableHoverName : style.disableHoverName} ${style.border}`}
                                    align={"center"}
                                    component='th'
                                    scope='row'
                                    onClick={() => onClickCardsHandler(row._id)}
                                >
                                    {row.name}
                                </TableCell>
                                <TableCell align='center'>{row.cardsCount}</TableCell>
                                <TableCell align='center'>{date}</TableCell>
                                <TableCell align='center'>{row.user_name}</TableCell>
                                <TableCell align='center'>
                                    {myId === row.user_id &&
                                        <button className={style.enableButtonEvent} onClick={() => onClickEditHandler(row._id, row.name)}>Edit</button>}
                                    {myId === row.user_id &&
                                        <button className={style.deleteButton} onClick={() => onClickDeleteHandler(row._id, row.name)}>Delete</button>}
                                    <button
                                        disabled={row.cardsCount === 0}
                                        className={`${row.cardsCount === 0 ? style.disableButtonEvent : style.enableButtonEvent}`}
                                        onClick={() => onClickLearnHandler(row._id, row.name)}
                                    >
                                        Learn
                                    </button>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <UniverseModalWindow isActive={activeModal} setActive={setActiveModal}>
                {modalMod === "delete" &&
                    <DeleteModal
                        title={title}
                        packId={packId}
                        onClickYesHandler={onClickYesDeleteHandler}
                        onClickNoHandler={onClickNoDeleteHandler}
                    />
                }
                {modalMod === "edit" &&
                    <EditModal
                        title={title}
                        packId={packId}
                        onClickSaveHandler={onClickSaveUpdateHandler}
                        onClickCancelHandler={onClickCancelUpdateHandler}
                        setTitle={setTitle}
                    />
                }
            </UniverseModalWindow>
        </div>
    )
}



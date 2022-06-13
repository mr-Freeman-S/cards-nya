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


const colums = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions']

export type sortType = 'asc' | 'desc';
type TablePropsType = {
    rows: CardPacksType[]
}


export function TablePacks({rows}: TablePropsType) {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [sortBy, setSortBy] = useState<sortType>('desc')
    const [activeDeleteModal, setActiveDeleteModal] = useState<boolean>(false)
    const [activeUpdateModal, setActiveUpdateModal] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const sortByUpdatePacks = useAppSelector(state => state.packsCard.sortPacks)
    const myId = useAppSelector<string>(state => state.auth._id)


    const changeSortHandler = () => {
        sortBy === 'asc' ? setSortBy('desc') : setSortBy('asc')
        dispatch(changeSortPackCardsAC(sortByUpdatePacks === '0updated' ? '1updated' : '0updated'))
    }

    const onClickLearnHandler = (id: string) => {
        navigate(`/cards/${id}`)
    }

    const onClickDeleteHandler = () => {
        setActiveDeleteModal(true)
    }
    const onClickUpdateHandler = () => {
        setActiveUpdateModal(true)
    }

    const onClickNoDeleteHandler = () => {
        setActiveDeleteModal(false)
    }

    const onClickYesDeleteHandler = (id: string) => {
        dispatch(deleteCardPackTC(id))
        setActiveDeleteModal(false)
    }

    const onClickNoUpdateHandler = () => {
        setActiveUpdateModal(false)
    }
    const onClickYesUpdateHandler = (id: string, name: string) => {
        dispatch(updateCardPackTC(id, name))
        setActiveUpdateModal(false)
        setTitle("")
    }


    return (
        <TableContainer style={{width: 850, margin: '0 auto',}} component={Paper}>
            <Table sx={{width: 850}} aria-label='simple table'>
                <TableHead>
                    <TableRow sx={{backgroundColor: '#ECECF9'}}>
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
                    {rows && rows.map((row: CardPacksType) => (
                        <TableRow
                            key={row._id}
                            sx={{
                                '&:last-child td, &:last-child th': {border: ''},
                                '&:nth-of-type(1)': {backgroundColor: '#F8F7FD'}
                            }}
                        >
                            <TableCell align={"center"} component='th' scope='row'> {row.name}</TableCell>
                            <TableCell align='center'>{row.cardsCount}</TableCell>
                            <TableCell align='center'>{row.updated}</TableCell>
                            <TableCell align='center'>{row.user_name}</TableCell>
                            <TableCell align='center'>
                                {myId === row.user_id &&
                                    <button onClick={onClickUpdateHandler}>Edit</button>}
                                <UniverseModalWindow
                                    isActive={activeUpdateModal}
                                    setActive={setActiveUpdateModal}
                                >
                                    <div style={{marginTop: 40}}>
                                        <div>
                                            {`Enter new Name`}
                                        </div>
                                        <input style={{marginTop: 40}} value={title}
                                               onChange={(e) => setTitle(e.currentTarget.value)}/>
                                        <div style={{marginBottom: 40, marginTop: 40}}>
                                            <button onClick={() => onClickYesUpdateHandler(row._id, title)}>Save</button>
                                            <button style={{marginLeft: 40}} onClick={onClickNoUpdateHandler}>Cancel
                                            </button>
                                        </div>
                                    </div>
                                </UniverseModalWindow>
                                {myId === row.user_id &&
                                    <button onClick={onClickDeleteHandler}>Delete</button>}
                                <UniverseModalWindow
                                    isActive={activeDeleteModal}
                                    setActive={setActiveDeleteModal}
                                >
                                    <div style={{marginTop: 40}}>
                                        <div>
                                            {`Are you really want to delete "${row.name}" ?`}
                                        </div>
                                        <div style={{marginBottom: 40, marginTop: 40}}>
                                            <button onClick={() => onClickYesDeleteHandler(row._id)}>Yes</button>
                                            <button style={{marginLeft: 40}} onClick={onClickNoDeleteHandler}>No
                                            </button>
                                        </div>
                                    </div>
                                </UniverseModalWindow>
                                <button onClick={() => onClickLearnHandler(row._id)}>Learn</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}



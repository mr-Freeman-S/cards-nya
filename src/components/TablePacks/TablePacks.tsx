import {useState} from 'react'
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
import {changeSortPackCardsAC} from "../../redux/reducers/packsCardReducer";
import {useNavigate} from 'react-router-dom'


const colums = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions']

export type sortType = 'asc' | 'desc';
type TablePropsType = {
    rows: any
}


export function TablePacks({rows}: TablePropsType) {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [sortBy, setSortBy] = useState<sortType>('desc')


    const sortByUpdatePacks = useAppSelector(state => state.packsCard.sortPacks)

    const changeSortHandler = () => {
        sortBy === 'asc' ? setSortBy('desc') : setSortBy('asc')
        dispatch(changeSortPackCardsAC(sortByUpdatePacks === '0updated' ? '1updated' : '0updated'))
    }

    const clickHandler = (id: string) => {
        navigate(`/cards/${id}`)
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
                    {rows && rows.map((row: any) => (
                        <TableRow
                            key={row._id}
                            sx={{
                                '&:last-child td, &:last-child th': {border: ''},
                                '&:nth-of-type(2)': {backgroundColor: '#F8F7FD'}
                            }}
                        >
                            <TableCell align={"center"} component='th' scope='row'>
                                {row.name}
                            </TableCell>
                            <TableCell align='center'>{row.cardsCount}</TableCell>
                            <TableCell align='center'>{row.updated}</TableCell>
                            <TableCell align='center'>{row.user_name}</TableCell>
                            <TableCell align='center'>{<button
                                onClick={() => clickHandler(row._id)}>Learn</button>}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


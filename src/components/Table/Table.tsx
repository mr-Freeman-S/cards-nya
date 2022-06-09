import {useEffect, useState} from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {AiOutlineArrowUp} from 'react-icons/ai'
import {cardsAPI} from "../../api/cardsAPI";
import style from './Table.module.css'
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {getCardPackTC} from "../../redux/reducers/packsCardReducer";


const colums = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions']

type sortType = 'asc' | 'desc';

export function Tables() {
    // const [rows, setRows] = useState<any>([])
    const rows = useAppSelector(state => state.packsCard.cardPacks)
    const dispatch = useAppDispatch()
    const [sortBy, setSortBy] = useState<sortType>('desc')

    useEffect(() => {
        dispatch(getCardPackTC())
    }, []);

    const changeSortHandler = () => {
        sortBy === 'asc' ? setSortBy('desc') : setSortBy('asc')

    }


    return (
        <TableContainer style={{width: 850, margin: '0 auto',}} component={Paper}>
            <Table sx={{width: 850}} aria-label='simple table'>
                <TableHead>
                    <TableRow sx={{backgroundColor: '#ECECF9'}}>
                        {
                            colums && colums.map((el, i) => {
                                return (el === 'Last Updated' ?
                                    <TableCell className={style.click} key={`${el}_${i}`} onClick={() => changeSortHandler()} align={"center"}>
                                        {el}<AiOutlineArrowUp style={sortBy === 'asc' ? {transform: 'rotate(180deg)'} : {}}/>
                                    </TableCell> : <TableCell key={`${el}_${i}`} align={"center"}>{el}</TableCell>)
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows && rows.map((row: any) => (
                        <TableRow
                            key={row.name}
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
                            <TableCell align='center'>{111}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


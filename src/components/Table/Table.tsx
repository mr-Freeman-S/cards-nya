import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const colums = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions']

const rows = [
	{
		cardsCount: 0,
		created: "2021-07-07T15:11:20.385Z",
		grade: 0,
		more_id: "60e5c327feaa5207a029a59c",
		name: "no Name",
		path: "/def",
		private: false,
		rating: 0,
		shots: 0,
		type: "pack",
		updated: "2021-07-07T15:11:20.385Z",
		user_id: "60e5c327feaa5207a029a59c",
		user_name: "123nbvvcxzlkjh64@2swi.com",
		__v: 0,
		_id: "60e5c418feaa5207a029a5b8",
	},
	{
		cardsCount: 0,
		created: "2021-07-07T15:11:17.927Z",
		grade: 0,
		more_id: "60e5c327feaa5207a029a59c",
		name: "no Name",
		path: "/def",
		private: false,
		rating: 0,
		shots: 0,
		type: "pack",
		updated: "2021-07-07T15:11:17.927Z",
		user_id: "60e5c327feaa5207a029a59c",
		user_name: "123nbvvcxzlkjh64@2swi.com",
		__v: 0,
		_id: "60e5c415feaa5207a029a5b7",},

	{
		cardsCount: 0,
		created: "2021-07-07T15:11:20.385Z",
		grade: 0,
		more_id: "60e5c327feaa5207a029a59c",
		name: "no Name",
		path: "/def",
		private: false,
		rating: 0,
		shots: 0,
		type: "pack",
		updated: "2021-07-07T15:11:20.385Z",
		user_id: "60e5c327feaa5207a029a59c",
		user_name: "123nbvvcxzlkjh64@2swi.com",
		__v: 0,
		_id: "60e5c418feaa5207a029a5b8",
	},
	{
		cardsCount: 0,
		created: "2021-07-07T15:11:20.385Z",
		grade: 0,
		more_id: "60e5c327feaa5207a029a59c",
		name: "no Name",
		path: "/def",
		private: false,
		rating: 0,
		shots: 0,
		type: "pack",
		updated: "2021-07-07T15:11:20.385Z",
		user_id: "60e5c327feaa5207a029a59c",
		user_name: "123nbvvcxzlkjh64@2swi.com",
		__v: 0,
		_id: "60e5c418feaa5207a029a5b8",
	}
]

export function Tables() {

	return (
		<TableContainer style={{width: 850, margin: '0 auto',}} component={Paper}>
			<Table sx={{ width: 850 }} aria-label='simple table'>
				<TableHead>
					<TableRow sx={{backgroundColor: '#ECECF9'}}>
						{
							colums && colums.map(el => {
								return <TableCell align={"center"}>{el}</TableCell>
							})
						}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map(row => (
						<TableRow
							key={row.name}
							sx={{ '&:last-child td, &:last-child th': { border: '' }, '&:nth-child(even)': {backgroundColor: '#F8F7FD'} }}
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


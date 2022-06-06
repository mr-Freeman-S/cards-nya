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
	// @ts-ignore
	// @ts-ignore
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

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
// 	if (b[orderBy] < a[orderBy]) {
// 		return -1
// 	}
// 	if (b[orderBy] > a[orderBy]) {
// 		return 1
// 	}
// 	return 0
// }
//
// type Order = 'asc' | 'desc'
//
// function getComparator<Key extends keyof any>(
// 	order: Order,
// 	orderBy: Key
// ): (
// 	a: { [key in Key]: number | string },
// 	b: { [key in Key]: number | string }
// ) => number {
// 	return order === 'desc'
// 		? (a, b) => descendingComparator(a, b, orderBy)
// 		: (a, b) => -descendingComparator(a, b, orderBy)
// }
//
// interface HeadCell {
// 	disablePadding: boolean
// 	id: keyof Data
// 	label: string
// 	numeric: boolean
// }
//
// interface EnhancedTableProps {
// 	numSelected: number
// 	onRequestSort: (
// 		event: React.MouseEvent<unknown>,
// 		property: keyof Data
// 	) => void
// 	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
// 	order: Order
// 	orderBy: string
// 	rowCount: number
// }
//
// function EnhancedTableHead(props: EnhancedTableProps) {
// 	const {
// 		onSelectAllClick,
// 		order,
// 		orderBy,
// 		numSelected,
// 		rowCount,
// 		onRequestSort,
// 	} = props
// 	const createSortHandler =
// 		(property: keyof Data) => (event: React.MouseEvent<unknown>) => {
// 			onRequestSort(event, property)
// 		}
//
// 	return (
// 		<TableHead>
// 			<TableRow>
// 				</TableCell>
// 				{headCells.map(headCell => (
// 					<TableCell
// 						key={headCell.id}
// 						align={headCell.numeric ? 'right' : 'left'}
// 						padding={headCell.disablePadding ? 'none' : 'normal'}
// 						sortDirection={orderBy === headCell.id ? order : false}
// 					>
// 						<TableSortLabel
// 							active={orderBy === headCell.id}
// 							direction={orderBy === headCell.id ? order : 'asc'}
// 							onClick={createSortHandler(headCell.id)}
// 						>
// 							{headCell.label}
// 							{orderBy === headCell.id ? (
// 								<Box component='span' sx={visuallyHidden}>
// 									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
// 								</Box>
// 							) : null}
// 						</TableSortLabel>
// 					</TableCell>
// 				))}
// 			</TableRow>
// 		</TableHead>
// 	)
// }
//
// interface EnhancedTableToolbarProps {
// 	numSelected: number
// }
//
// const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
// 	const { numSelected } = props
//
// 	return (
// 		<Toolbar
// 			sx={{
// 				pl: { sm: 2 },
// 				pr: { xs: 1, sm: 1 },
// 				...(numSelected > 0 && {
// 					bgcolor: theme =>
// 						alpha(
// 							theme.palette.primary.main,
// 							theme.palette.action.activatedOpacity
// 						),
// 				}),
// 			}}
// 		>
// 			{numSelected > 0 ? (
// 				<Typography
// 					sx={{ flex: '1 1 100%' }}
// 					color='inherit'
// 					variant='subtitle1'
// 					component='div'
// 				>
// 					{numSelected} selected
// 				</Typography>
// 			) : (
// 				<Typography
// 					sx={{ flex: '1 1 100%' }}
// 					variant='h6'
// 					id='tableTitle'
// 					component='div'
// 				>
// 					Nutrition
// 				</Typography>
// 			)}
// 			{numSelected > 0 ? (
// 				<Tooltip title='Delete'>
// 					<IconButton>
// 						<DeleteIcon />
// 					</IconButton>
// 				</Tooltip>
// 			) : (
// 				<Tooltip title='Filter list'>
// 					<IconButton>
// 						<FilterListIcon />
// 					</IconButton>
// 				</Tooltip>
// 			)}
// 		</Toolbar>
// 	)
// }
//
// export default function EnhancedTable() {
// 	const [order, setOrder] = React.useState<Order>('asc')
// 	const [orderBy, setOrderBy] = React.useState<keyof Data>('calories')
// 	const [dense, setDense] = React.useState(false)
// 	const [rowsPerPage, setRowsPerPage] = React.useState(5)
//
// 	const handleRequestSort = (
// 		event: React.MouseEvent<unknown>,
// 		property: keyof Data
// 	) => {
// 		const isAsc = orderBy === property && order === 'asc'
// 		setOrder(isAsc ? 'desc' : 'asc')
// 		setOrderBy(property)
// 	}
//
// 	const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
// 		const selectedIndex = selected.indexOf(name)
// 		let newSelected: readonly string[] = []
//
// 		if (selectedIndex === -1) {
// 			newSelected = newSelected.concat(selected, name)
// 		} else if (selectedIndex === 0) {
// 			newSelected = newSelected.concat(selected.slice(1))
// 		} else if (selectedIndex === selected.length - 1) {
// 			newSelected = newSelected.concat(selected.slice(0, -1))
// 		} else if (selectedIndex > 0) {
// 			newSelected = newSelected.concat(
// 				selected.slice(0, selectedIndex),
// 				selected.slice(selectedIndex + 1)
// 			)
// 		}
//
// 		setSelected(newSelected)
// 	}
//
// 	const handleChangePage = (event: unknown, newPage: number) => {
// 		setPage(newPage)
// 	}
//
// 	const handleChangeRowsPerPage = (
// 		event: React.ChangeEvent<HTMLInputElement>
// 	) => {
// 		setRowsPerPage(parseInt(event.target.value, 10))
// 		setPage(0)
// 	}
//
// 	const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		setDense(event.target.checked)
// 	}
//
// 	const isSelected = (name: string) => selected.indexOf(name) !== -1
//
// 	// Avoid a layout jump when reaching the last page with empty rows.
// 	const emptyRows =
// 		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0
//
// 	return (
// 		<Box sx={{ width: '100%' }}>
// 			<Paper sx={{ width: '100%', mb: 2 }}>
// 				<EnhancedTableToolbar numSelected={selected.length} />
// 				<TableContainer>
// 					<Table
// 						sx={{ minWidth: 750 }}
// 						aria-labelledby='tableTitle'
// 						size={dense ? 'small' : 'medium'}
// 					>
// 						<EnhancedTableHead
// 							numSelected={selected.length}
// 							order={order}
// 							orderBy={orderBy}
// 							onSelectAllClick={handleSelectAllClick}
// 							onRequestSort={handleRequestSort}
// 							rowCount={rows.length}
// 						/>
// 						<TableBody>
// 							{/* if you don't need to support IE11, you can replace the `stableSort` call with:
//               rows.slice().sort(getComparator(order, orderBy)) */}
// 							{stableSort(rows, getComparator(order, orderBy))
// 								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
// 								.map((row, index) => {
// 									const isItemSelected = isSelected(row.name)
// 									const labelId = `enhanced-table-checkbox-${index}`
//
// 									return (
// 										<TableRow
// 											hover
// 											onClick={event => handleClick(event, row.name)}
// 											role='checkbox'
// 											aria-checked={isItemSelected}
// 											tabIndex={-1}
// 											key={row.name}
// 											selected={isItemSelected}
// 										>
// 											<TableCell padding='checkbox'>
// 												<Checkbox
// 													color='primary'
// 													checked={isItemSelected}
// 													inputProps={{
// 														'aria-labelledby': labelId,
// 													}}
// 												/>
// 											</TableCell>
// 											<TableCell
// 												component='th'
// 												id={labelId}
// 												scope='row'
// 												padding='none'
// 											>
// 												{row.name}
// 											</TableCell>
// 											<TableCell align='right'>{row.calories}</TableCell>
// 											<TableCell align='right'>{row.fat}</TableCell>
// 											<TableCell align='right'>{row.carbs}</TableCell>
// 											<TableCell align='right'>{row.protein}</TableCell>
// 										</TableRow>
// 									)
// 								})}
// 							{emptyRows > 0 && (
// 								<TableRow
// 									style={{
// 										height: (dense ? 33 : 53) * emptyRows,
// 									}}
// 								>
// 									<TableCell colSpan={6} />
// 								</TableRow>
// 							)}
// 						</TableBody>
// 					</Table>
// 				</TableContainer>
// 				<TablePagination
// 					rowsPerPageOptions={[5, 10, 25]}
// 					component='div'
// 					count={rows.length}
// 					rowsPerPage={rowsPerPage}
// 					page={page}
// 					onPageChange={handleChangePage}
// 					onRowsPerPageChange={handleChangeRowsPerPage}
// 				/>
// 			</Paper>
// 			<FormControlLabel
// 				control={<Switch checked={dense} onChange={handleChangeDense} />}
// 				label='Dense padding'
// 			/>
// 		</Box>
// 	)
// }

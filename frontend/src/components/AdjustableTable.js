import React from 'react';
import { CloseIcon } from '@chakra-ui/icons';

import { Table, Tbody, Tr, Td, IconButton, Th } from '@chakra-ui/react';

const Row = (props) => {
	const { time, loc, patname } = props;
	return (
		<Tr>
			<Td>{time}</Td>
			<Td>{loc}</Td>
			<Td>{patname}</Td>
			{/* <Td>
				<IconButton
					aria-label="Delete appointment"
					icon={<CloseIcon />}
					onClick={onDelete}
				/>
			</Td> */}
		</Tr>
	);
};

const AdjustableTable = (props) => {
	const { data, setRows } = props;
	// const onDeleteRow = (index) => {
	// 	setRows((prevRows) => prevRows.filter((_, i) => i !== index));
	// };

	const [tableData, setTableData] = React.useState([]);

	async function fetchData() {
		try {
			const response = await fetch('/doctor');
			const body = await response.json();
			console.log('Response:', response);
			console.log('Body:', body);
			setTableData(body);
		} catch (error) {
			console.error(error);
		}
	}

	React.useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch('/doctor');
				const body = await response.json();
				console.log('Response:', response);
				console.log('Body:', body);
				setTableData(body);
			} catch (error) {
				console.log('error');
			}
			fetchData();
		}
	}, []);
	return (
		<Table variant="striped" colorScheme="blue">
			<Th>Time</Th>
			<Th>Location</Th>
			<Th>Patient Name</Th>
			<Th>Cancel</Th>
			{/* <Tbody>
				{data.map((row, index) => (
					<Row
						key={`key-${index}`}
						time={row.time}
						loc={row.loc}
						patname={row.patname}
						onDelete={() => onDeleteRow(index)}
					/>
				))}
			</Tbody> */}
			<Tbody>
				{tableData.map((person) => (
					<Row
						key={person.id}
						time={person.age}
						patname={person.name}
						// onDelete={() => onDeleteRow(index)}
					/>
				))}
			</Tbody>
		</Table>
	);
};

export default AdjustableTable;

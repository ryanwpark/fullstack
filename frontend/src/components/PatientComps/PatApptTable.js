import React from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { Table, Tbody, Tr, Td, IconButton, Th } from '@chakra-ui/react';

const mock = [
	{
		time: '7:00AM',
		loc: '1500 Blah st, Houston, Texas, 77002',
		patname: 'John Adams',
		date: '05-21-2019',
		docname: 'mike jodan',
	},
	{
		time: '11:00AM',
		loc: '1500 Blah st, Houston, Texas, 77002',
		patname: 'Jack Small',
		date: '03-22-2023',
		docname: 'mike tyson',
	},
	{
		time: '5:00AM',
		loc: '1500 Blah st, Houston, Texas, 77002',
		patname: 'Mary Kim',
		date: '01-12-2023',
		docname: 'soulja boy',
	},
];

const Row = (props) => {
	const { time, loc, onDelete, docname } = props;
	return (
		<Tr>
			<Td>{time}</Td>
			<Td>{loc}</Td>
			<Td>{docname}</Td>
			<Td>
				<IconButton
					aria-label="Delete appointment"
					icon={<CloseIcon />}
					onClick={onDelete}
				/>
			</Td>
		</Tr>
	);
};

const PatApptTable = (props) => {
	const { data, setRows } = props;
	const onDeleteRow = (index) => {
		setRows((prevRows) => prevRows.filter((_, i) => i !== index));
	};
	return (
		<Table variant="striped" colorScheme="blue">
			<Th>Time</Th>
			<Th>Location</Th>
			<Th>Doctor</Th>
			<Th>Cancel</Th>
			<Tbody>
				{data.map((row, index) => (
					<Row
						key={`key-${index}`}
						time={row.time}
						loc={row.loc}
						docname={row.docname}
						onDelete={() => onDeleteRow(index)}
					/>
				))}
			</Tbody>
		</Table>
	);
};

export default PatApptTable;

import React from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { Table, Tbody, Tr, Td, IconButton, Th } from '@chakra-ui/react';

const Row = (props) => {
	const { time, docname, patname, onDelete } = props;
	return (
		<Tr>
			<Td>{time}</Td>
			<Td>{docname}</Td>
			<Td>{patname}</Td>
			<IconButton
				aria-label="Delete appointment"
				icon={<CloseIcon />}
				onClick={onDelete}
			/>
		</Tr>
	);
};

const OfficeAppts = (props) => {
	const { data, setRows } = props;
	const onDeleteRow = (index) => {
		setRows((prevRows) => prevRows.filter((_, i) => i !== index));
	};
	return (
		<Table colorScheme="blue">
			<Th>Time</Th>
			<Th>Doctor Name</Th>
			<Th>Patient Name</Th>
			<Tbody>
				{data.map((row, index) => (
					<Row
						// eslint-disable-next-line
						key={'key -${index}'}
						time={row.time}
						docname={row.docname}
						patname={row.patname}
						onDelete={() => onDeleteRow(index)}
					/>
				))}
			</Tbody>
		</Table>
	);
};

export default OfficeAppts;

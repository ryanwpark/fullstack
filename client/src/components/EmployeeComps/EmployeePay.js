import React from 'react';
import { Table, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const Row = (props) => {
	const { hours, pay, othours } = props;
	return (
		<Tr>
			<Td>{hours}</Td>
			<Td>{othours}</Td>
			<Td>{pay}</Td>
		</Tr>
	);
};

const EmployeePay = (props) => {
	const { data } = props;
	return (
		<Table variant="striped" colorScheme="blue">
			<Th>Hours Worked</Th>
			<Th>Overtime Hours Worked</Th>
			<Th>Paycheck Amount($)</Th>

			<Tbody>
				{data.map((row, index) => (
					<Row
						// eslint-disable-next-line
						key={'key -${index}'}
						hours={row.hours}
						othours={row.othours}
						pay={row.pay}
					/>
				))}
			</Tbody>
		</Table>
	);
};

export default EmployeePay;

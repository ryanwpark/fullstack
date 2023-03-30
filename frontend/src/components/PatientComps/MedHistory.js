import React from 'react';
import { Table, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const Row = (props) => {
	const { allergies, conditions, medications, vaccs } = props;
	return (
		<Tr>
			<Td>{allergies}</Td>
			<Td>{vaccs}</Td>
			<Td>{medications}</Td>
			<Td>{conditions}</Td>
		</Tr>
	);
};

const MedHistory = (props) => {
	const { data } = props;
	return (
		<Table variant="striped" colorScheme="blue">
			<Th>Allergies</Th>
			<Th>Vaccinations</Th>
			<Th>Current Medications</Th>
			<Th>Pre-existing Conditions</Th>

			<Tbody>
				{data.map((row, index) => (
					<Row
						// eslint-disable-next-line
						key={'key -${index}'}
						allergies={row.allergies}
						vaccs={row.vaccs}
						medications={row.medications}
						conditions={row.conditions}
					/>
				))}
			</Tbody>
		</Table>
	);
};

export default MedHistory;

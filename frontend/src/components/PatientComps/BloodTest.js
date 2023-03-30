import React from 'react';
import { Table, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const Row = (props) => {
	const { date, bloodtype, rbc, wbc, hmg, hmt, pltct } = props;
	return (
		<Tr>
			<Td>{date}</Td>
			<Td>{bloodtype}</Td>
			<Td>{rbc}</Td>
			<Td>{wbc}</Td>

			<Td>{hmg}</Td>
			<Td>{hmt}</Td>

			<Td>{pltct}</Td>
		</Tr>
	);
};

const BloodTest = (props) => {
	const { data } = props;
	return (
		<Table variant="striped" colorScheme="blue">
			<Th>Date</Th>
			<Th>Blood Type</Th>
			<Th fontSize={9}>BLOOD RBC (MILLION)(CELLS/MCL)</Th>
			<Th fontSize={9}>BLOOD WBC (THOUSAND)(CELLS/MCL) </Th>
			<Th fontSize={9}>BLOOD HEMOGLOBIN (G/DL)</Th>
			<Th fontSize={9}>BLOOD HEMATOCRIT (%)</Th>
			<Th fontSize={9}>BLOOD PLATELETS (THOUSAND) (PLATELETS/MCL)</Th>
			<Tbody>
				{data.map((row, index) => (
					<Row
						// eslint-disable-next-line
						key={'key -${index}'}
						date={row.date}
						bloodtype={row.bloodtype}
						wbc={row.wbc}
						rbc={row.rbc}
						hmg={row.hmg}
						hmt={row.hmt}
						pltct={row.pltct}
					/>
				))}
			</Tbody>
		</Table>
	);
};

export default BloodTest;

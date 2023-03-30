import React, { useState } from 'react';
import { Table, Tbody, Tr, Th, Td, Tag, VStack } from '@chakra-ui/react';
import DoctorFooter from '../Footer/DoctorFooter';

const mock = [
	{
		time: '7:00AM',
		loc: '1500 Blah st, Houston, Texas, 77002',
		patname: 'John Adams',
		apptdate: '05-21-2019',
	},
	{
		time: '11:00AM',
		loc: '1500 Blah st, Houston, Texas, 77002',
		patname: 'Jack Small',
		apptdate: '03-22-2023',
	},
	{
		time: '5:00AM',
		loc: '1500 Blah st, Houston, Texas, 77002',
		patname: 'Mary Kim',
		apptdate: '01-12-2023',
	},
];

const Row = (props) => {
	const { apptdate, loc, patname } = props;
	return (
		<Tr>
			<Td>{apptdate}</Td>
			<Td>{loc}</Td>
			<Td>{patname}</Td>
		</Tr>
	);
};

const MyTable = (props) => {
	const { data } = props;
	// console.log('data bellow');
	// console.log(data);
	return (
		<Table variant="striped" colorScheme="blue">
			<Th>Date</Th>
			<Th>Location</Th>
			<Th>Patient Name</Th>
			<Tbody>
				{data.map((row, index) => (
					<Row
						// eslint-disable-next-line
						key={'key -${index}'}
						apptdate={row.apptdate}
						loc={row.loc}
						patname={row.patname}
					/>
				))}
			</Tbody>
		</Table>
	);
};

export default function DoctorPrevAppt() {
	const [rows] = useState(mock);
	return (
		<VStack spacing={4} align="left">
			<DoctorFooter />

			<Tag size="lg" variant="solid" colorScheme="blue">
				Past Appointments
			</Tag>

			<MyTable data={rows}>
				<Tr>
					<Th className="appttime">Date</Th>
					<Th className="apptloc">Location</Th>
					<Th className="apptpatname">Patient Name</Th>
				</Tr>
			</MyTable>
		</VStack>
	);
}

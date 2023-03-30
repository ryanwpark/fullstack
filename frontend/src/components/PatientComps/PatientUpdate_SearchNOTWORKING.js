import React, { useState } from 'react';
import { Box, Card, CardBody, Input, Text } from '@chakra-ui/react';

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
		patname: 'Sophie Li',
		apptdate: '01-12-2023',
	},
];

const getFilteredList = (query, patient) => {
	if (!query) return patient;
	return patient.filter((patname) => patname.patname.includes(query));
};

export default function PatientUpdate() {
	const [query, setQuery] = useState('');
	const { allpatients } = mock;
	const { patient } = allpatients;

	const filteredList = getFilteredList(query, patient);

	return (
		<Box>
			Search up patient by name to edit information.
			<Input
				type="text"
				onChange={(e) => setQuery(e.target.value)}></Input>
			<Card>
				<CardBody>
					{filteredList.map((value) => (
						<Text key={value.patname}>{value.patname}</Text>
					))}
				</CardBody>
			</Card>
		</Box>
	);
}

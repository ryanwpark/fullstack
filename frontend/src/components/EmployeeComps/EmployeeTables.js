import React, { useState } from 'react';
import { Tag, TableContainer, VStack } from '@chakra-ui/react';
import OfficeAppts from './OfficeAppts';
import EmployeePay from './EmployeePay';

const mockApptData = [
	{
		time: '7:00AM',
		loc: '1500 Blah st, Houston, Texas, 77002',
		patname: 'John Adams',
		apptdate: '05-21-2019',
		reason: 'General Checkup',
		docname: 'Jack Ma',
	},
	{
		time: '11:00AM',
		loc: '1500 Blah st, Houston, Texas, 77002',
		patname: 'Jack Small',
		apptdate: '03-22-2023',
		reason: 'Blood Test',
		docname: 'Elon Usk',
	},
	{
		time: '5:00AM',
		loc: '1500 Blah st, Houston, Texas, 77002',
		patname: 'Mary Kim',
		apptdate: '01-12-2023',
		reason: 'General Checkup',
		docname: 'Steve Harvey',
	},
];

const mockPay = [
	{
		hours: '4',
		othours: '2',
		pay: '500',
	},
	{
		hours: '64',
		othours: '22',
		pay: '466',
	},
	{
		hours: '4.5',
		othours: '211',
		pay: '',
	},
];

export default function EmployeeTables() {
	const [apptrows] = useState(mockApptData);
	const [payrows] = useState(mockPay);

	return (
		<VStack spacing={4} align="left">
			<Tag size="lg" variant="solid" colorScheme="blue">
				Appointments for Today
			</Tag>
			<TableContainer>
				<OfficeAppts data={apptrows}></OfficeAppts>
			</TableContainer>
			<Tag size="lg" variant="solid" colorScheme="blue">
				Your Payroll
			</Tag>
			<TableContainer>
				<EmployeePay data={payrows}></EmployeePay>
			</TableContainer>
		</VStack>
	);
}

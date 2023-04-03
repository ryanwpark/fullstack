import React from 'react';
import { Tag, TableContainer, VStack } from '@chakra-ui/react';
import OfficeAppts from './OfficeAppts';
// import EmployeePay from './EmployeePay';

export default function EmployeeTables() {
	return (
		<VStack spacing={4} align="left">
			<Tag size="lg" variant="solid" colorScheme="blue">
				Appointments for Today
			</Tag>
			<TableContainer>
				<OfficeAppts />
			</TableContainer>
			{/* <Tag size="lg" variant="solid" colorScheme="blue">
				Your Payroll
			</Tag>
			<TableContainer><EmployeePay /></TableContainer> */}
		</VStack>
	);
}

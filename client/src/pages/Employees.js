import React from 'react';
import { VStack, Box, Card } from '@chakra-ui/react';
import EmployeeFooter from '../components/Footer/EmployeeFooter';
import EmployeeTables from '../components/EmployeeComps/EmployeeTables';
import banner from './banner.jpg';
import CreateTest from '../components/EmployeeComps/CreateTest';

export default function Employees() {
	return (
		<VStack
			// divider={<StackDivider borderColor="gray.200" />}
			spacing={6}
			alignItems="flex-start"
			style={{
				backgroundImage: `url(${banner})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
			height="90vh">
			<Box width="100%">
				<EmployeeFooter />
			</Box>
			<Box width="95%" alignSelf="center">
				<Card>
					<EmployeeTables />
				</Card>
			</Box>

			<Box alignSelf="center">
				<CreateTest />
			</Box>
		</VStack>
	);
}

import React from 'react';
import { VStack, Box } from '@chakra-ui/react';
import EmployeeFooter from '../components/Footer/EmployeeFooter';
import EmployeeTables from '../components/EmployeeComps/EmployeeTables';
import banner from './banner.jpg';

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
			<Box width="100%">
				<EmployeeTables />
			</Box>
		</VStack>
	);
}

<h3 class="ui block header">Block Header</h3>;

//Add data report of appointments for the day (include appt info)
import React from 'react';
import { VStack, Box, Card, CardHeader, HStack } from '@chakra-ui/react';
import DoctorFooter from '../components/Footer/DoctorFooter';
import DoctorCurrAppt from '../components/DoctorComps/DoctorCurrAppt';
import banner from '../pages/banner.jpg';
import DoctorRefs from '../components/DoctorComps/DoctorRefs';
import CreateRef from '../components/DoctorComps/CreateRef';

export default function Doctor() {
	return (
		<VStack
			spacing={4}
			alignItems="center"
			style={{
				backgroundImage: `url(${banner})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
			height="90vh">
			<Box width="100%" align="center">
				<DoctorFooter />
			</Box>
			<Card width="95%" bg="blue.100" align="center">
				<CardHeader
					textAlign="center"
					variant="solid"
					colorScheme="blue">
					Appointments for Today
				</CardHeader>
				<DoctorCurrAppt />
			</Card>
			<HStack spacing={50} align="center">
				<Card>
					<DoctorRefs />
				</Card>
				<Card>
					<CreateRef />
				</Card>
			</HStack>
		</VStack>
	);
}

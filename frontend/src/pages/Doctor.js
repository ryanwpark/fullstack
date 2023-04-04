//Add data report of appointments for the day (include appt info)
import React from 'react';
import { VStack, Box, Card, CardHeader } from '@chakra-ui/react';
import DoctorFooter from '../components/Footer/DoctorFooter';
import DoctorCurrAppt from '../components/DoctorComps/DoctorCurrAppt';
import banner from '../pages/banner.jpg';

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
			<Box width="100%">
				<DoctorFooter />
			</Box>
			<Card width="95%" bg="blue.100">
				<CardHeader
					textAlign="center"
					variant="solid"
					colorScheme="blue">
					Appointments for Today
				</CardHeader>
			</Card>
			<Card width="95%">
				<DoctorCurrAppt />
			</Card>
		</VStack>
	);
}

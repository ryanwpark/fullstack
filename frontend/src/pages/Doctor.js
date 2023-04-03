//Add data report of appointments for the day (include appt info)
import React from 'react';
import { Tag, VStack } from '@chakra-ui/react';
import DoctorFooter from '../components/Footer/DoctorFooter';
import DoctorCurrAppt from '../components/DoctorComps/DoctorCurrAppt';

export default function Doctor() {
	return (
		<VStack spacing={4} align="left">
			<DoctorFooter />

			<Tag size="lg" variant="solid" colorScheme="blue">
				Appointments for Today
			</Tag>
			<DoctorCurrAppt />
		</VStack>
	);
}

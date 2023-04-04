//Add data report of appointments for the day (include appt info)
import React from 'react';
import { Tag, VStack, Box } from '@chakra-ui/react';
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

			<Tag size="lg" variant="solid" colorScheme="blue" width={900}>
				Appointments for Today
			</Tag>
			<DoctorCurrAppt />
		</VStack>
	);
}

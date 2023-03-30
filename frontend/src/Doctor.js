//Add data report of appointments for the day (include appt info)
import React, { useState, Component } from 'react';
import { Tag, VStack } from '@chakra-ui/react';
import DoctorFooter from './components/Footer/DoctorFooter';
import AdjustableTable from './components/AdjustableTable';
import ApptTable from './components/DoctorComps/ApptTable';

export default function Doctor() {
	return (
		<VStack spacing={4} align="left">
			<DoctorFooter />

			<Tag size="lg" variant="solid" colorScheme="blue">
				Appointments for Today
			</Tag>
			<ApptTable />
		</VStack>
	);
}

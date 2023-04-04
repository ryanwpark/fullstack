import React from 'react';
import { Box, Card, CardHeader, VStack } from '@chakra-ui/react';
import PatientsFooter from '../components/Footer/PatientsFooter';
import banner from './banner.jpg';
import PatientDash from '../components/PatientComps/PatientDash';
import UpcomingAppt from '../components/PatientComps/UpcomingAppt';

export default function Patients() {
	console.log(window.localStorage.getItem('name'));
	return (
		<VStack
			spacing={8}
			alignItems="center"
			style={{
				backgroundImage: `url(${banner})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
			height="90vh">
			<Box width="100%">
				<PatientsFooter alignItems="left" />
			</Box>

			<Box width="95%">
				<Card textAlign="center">
					<CardHeader bg="blue.100" p={1}>
						Upcoming Appointments
					</CardHeader>
					<UpcomingAppt />
				</Card>
			</Box>
			<Box width="95%">
				<Card>
					<CardHeader bg="blue.100" textAlign="center">
						User Dashboard
					</CardHeader>
					<br />
					<PatientDash alignItems="left" />
				</Card>
			</Box>
		</VStack>
	);
}

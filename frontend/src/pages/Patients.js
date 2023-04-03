import React from 'react';
import { Box, Card, CardBody, CardHeader, VStack } from '@chakra-ui/react';
import PatientsFooter from '../components/Footer/PatientsFooter';
import banner from './banner.jpg';
import PatientDash from '../components/PatientComps/PatientDash';
import UpcomingAppt from '../components/PatientComps/UpcomingAppt';

export default function Patients() {
	console.log(window.localStorage.getItem('name'));
	return (
		<VStack
			spacing={8}
			alignItems="flex-start"
			style={{
				backgroundImage: `url(${banner})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
			height="90vh">
			<Box width="100%">
				<PatientsFooter alignItems="left" />
			</Box>

			<Box mx="auto">
				<Card width={400}>
					<CardHeader bg="blue.100" p={1} textAlign="center">
						Upcoming Appointments
					</CardHeader>
					<UpcomingAppt />
					{/* <CardBody>
						<PatApptTable/>
					</CardBody> */}
				</Card>
			</Box>

			<Box mx="auto">
				<Card width={400}>
					<CardBody bg="blue.100" p={1} textAlign="center">
						User Dashboard
					</CardBody>
				</Card>
			</Box>
			<Box width="100%">
				<PatientDash alignItems="left" />
			</Box>
		</VStack>
	);
}

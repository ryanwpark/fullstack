import React, { useState, useEffect } from 'react';
import {
	Table,
	Tbody,
	Tr,
	Td,
	Th,
	VStack,
	Box,
	Card,
	CardHeader,
} from '@chakra-ui/react';
import DoctorFooter from '../Footer/DoctorFooter';
import axios from 'axios';
import banner from '../../pages/banner.jpg';

export default function DoctorPrevAppt() {
	const [myAppointments, setMyAppointments] = useState([]);

	useEffect(() => {
		axios
			.get('https://medical-clinic-main.herokuapp.com/doctor/appthistory')
			.then((response) => {
				console.log('MY RESPONSE');
				console.log(response);
				setMyAppointments(response.data);
			})
			.catch((error) => {
				// console.log('error from location.js');
				console.log(error);
			});
	}, []);
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
			<Card bg="blue.100" width="95%">
				<CardHeader
					size="lg"
					colorScheme="blue"
					textAlign="center"
					fontWeight="bold">
					Previous Appointments
				</CardHeader>
			</Card>
			<Card width="95%" alignSelf="center">
				<Table variant="striped" colorScheme="blue">
					<Tbody>
						<Tr bg="blue.100">
							<Th>Date</Th>
							<Th>Time</Th>
							<Th>Patient ID</Th>
							<Th>Office Location</Th>
						</Tr>
						{myAppointments?.map((appointment) => (
							<Tr key={appointment.appointment_id}>
								<Td>{appointment.appt_date.slice(0, 10)}</Td>
								<Td>{appointment.appt_time}</Td>
								<Td>{appointment.appt_Patient_id}</Td>
								<Td>{appointment.city}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</Card>
		</VStack>
	);
}

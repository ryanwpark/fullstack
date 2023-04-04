import React, { useState, useEffect } from 'react';
import { Table, Tbody, Tr, Td, Th, Tag, VStack } from '@chakra-ui/react';
import DoctorFooter from '../Footer/DoctorFooter';
import axios from 'axios';

export default function DoctorPrevAppt() {
	const [myAppointments, setMyAppointments] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:3000/doctor/appthistory')
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
		<VStack spacing={4} align="left">
			<DoctorFooter />

			<Tag size="lg" variant="solid" colorScheme="blue">
				Previous Appointments
			</Tag>

			<Table variant="striped" colorScheme="blue">
				<Tbody>
					<Tr>
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
		</VStack>
	);
}

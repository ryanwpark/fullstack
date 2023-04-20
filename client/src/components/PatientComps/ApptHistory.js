import React, { useState, useEffect } from 'react';
import { Table, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';

export default function ApptHistory() {
	const [myAppointments, setMyAppointments] = useState([]);

	useEffect(() => {
		axios
			.get(
				'https://medical-clinc-backend.herokuapp.com/patient/appthistory'
			)
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
		<Table variant="striped" colorScheme="blue">
			<Tbody>
				<Tr>
					<Th>Date</Th>
					<Th>Time</Th>
					<Th>Location</Th>
					<Th>Doctor</Th>
				</Tr>
				{myAppointments?.map((appointment) => (
					<Tr key={appointment.appointment_id}>
						<Td>{appointment.appt_date.slice(0, 10)}</Td>
						<Td>{appointment.appt_time.slice(0, 5)}</Td>
						<Td>{appointment.office_city}</Td>
						{/* <Td>{appointment.appt_Patient_id}</Td> */}
						<Td>{appointment.doctor_name}</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	);
}

import React, { useState, useEffect } from 'react';
import { Table, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';

export default function ApptHistory() {
	const [myAppointments, setMyAppointments] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:3000/patient/appthistory')
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
				<Th>Date</Th>
				<Th>Time</Th>
				<Th>Location</Th>
				<Th>Doctor</Th>
				{myAppointments?.map((appointment) => (
					<Tr key={appointment.appointment_id}>
						<Td>{appointment.appt_date}</Td>
						<Td>{appointment.appt_time}</Td>
						<Td>{appointment.office_city}</Td>
						{/* <Td>{appointment.appt_Patient_id}</Td> */}
						<Td>{appointment.doctor_name}</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	);
}

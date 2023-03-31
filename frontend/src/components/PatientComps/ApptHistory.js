import React, { useState, useEffect } from 'react';
import { Table, Tbody, Tr, Td } from '@chakra-ui/react';
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
				{myAppointments?.map((appointment) => (
					<Tr key={appointment.appointment_id}>
						<Td>{appointment.appt_date}</Td>
						<Td>{appointment.appt_office_id}</Td>
						<Td>{appointment.appt_Patient_id}</Td>
						<Td>{appointment.appt_Doctor_id}</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	);
}

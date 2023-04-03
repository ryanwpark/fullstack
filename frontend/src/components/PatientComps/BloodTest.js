import React, { useState, useEffect } from 'react';
import { Table, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';

export default function ApptHistory() {
	const [myAppointments, setMyAppointments] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:3000/patient/blood/history')
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
				<Th>Blood Type</Th>
				<Th>WBC</Th>
				<Th>RBC</Th>
				<Th>Hemoglobin count</Th>
				<Th>Hematocrit %</Th>
				<Th>Platelets count</Th>
				{myAppointments?.map((appointment) => (
					<Tr key={appointment.Blood_ID}>
						<Td>{appointment.blo_type}</Td>
						<Td>{appointment.blo_WBC}</Td>
						<Td>{appointment.blo_RBC}</Td>
						<Td>{appointment.blo_hemoglobin}</Td>
						<Td>{appointment.blo_Hematocrit_percent}</Td>
						<Td>{appointment.blo_platelets}</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	);
}

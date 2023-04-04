import React, { useState, useEffect } from 'react';
import { Table, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';

export default function ApptHistory() {
	const [myAppointments, setMyAppointments] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:3000/patient/medicalhistory')
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
					<Th>Current Medications</Th>
					<Th>Smoker</Th>
					<Th>Diabete</Th>
					<Th>Heart Disease</Th>
					<Th>Pregnant</Th>
					<Th>Sexually Active</Th>
					<Th>Cancer</Th>
				</Tr>
				{myAppointments?.map((appointment, index) => (
					<Tr key={index}>
						<Td>{appointment.med_h_current_meds}</Td>
						<Td>{appointment.med_h_smoker ? 'Yes' : 'No'}</Td>
						<Td>{appointment.med_h_diabetes ? 'Yes' : 'No'}</Td>

						<Td>
							{appointment.med_h_heart_disease ? 'Yes' : 'No'}
						</Td>
						<Td>{appointment.med_h_pregnant ? 'Yes' : 'No'}</Td>
						<Td>
							{appointment.med_h_sexual_active ? 'Yes' : 'No'}
						</Td>
						<Td>{appointment.med_h_cancer ? 'Yes' : 'No'}</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	);
}

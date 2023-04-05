import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Tbody, Tr, Th, Td } from '@chakra-ui/react';

export default function PatientDiagnosis() {
	const [ref, setref] = useState([]);
	useEffect(() => {
		axios
			.get('http://localhost:3000/patient/diagnosis')
			.then((response) => {
				console.log('My response:', response.data);
				setref(response.data);
			})
			.catch((error) => {
				console.log('!!!!! ', error);
			});
	}, []);

	return (
		<Table colorScheme="blue" variant="striped">
			<Tbody>
				<Tr bg="blue.100">
					<Th>Diagnosis</Th>
					<Th>Doctor</Th>
				</Tr>
				{ref.length > 0 ? (
					ref.map((reflist, index) => (
						<Tr key={index}>
							<Td>{reflist.diag_desc}</Td>
							<Td>{reflist.doctor_name}</Td>
						</Tr>
					))
				) : (
					<Tr>
						<Td colSpan={5}>No Diagnosis</Td>
					</Tr>
				)}
			</Tbody>
		</Table>
	);
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Table,
	Tbody,
	Tr,
	Th,
	Td,
	Button,
	Card,
	CardHeader,
} from '@chakra-ui/react';

export default function DoctorRefs() {
	const [ref, setref] = useState([]);
	useEffect(() => {
		axios
			.get('https://medical-clinic-main.herokuapp.com/doctor/getrefs')
			.then((response) => {
				console.log('My response:', response.data);
				setref(response.data);
			})
			.catch((error) => {
				console.log('!!!!! ', error);
			});
	}, []);

	const cancelref = (ref_ID) => {
		console.log('deleting:', ref_ID);
		axios
			.post(
				'https://medical-clinic-main.herokuapp.com/doctor/cancelref',
				{ refid: ref_ID },
				{
					headers: { 'Content-Type': 'application/json' },
				}
			)
			.then((response) => {
				console.log('Res:', response);
			})
			.catch((error) => {
				console.log('Err:', error);
			});
	};

	const onDeleteRow = (refID) => {
		const updatedRef = ref.filter((ref) => ref.ref_ID !== refID);
		setref(updatedRef);
	};

	return (
		<Card bg="blue.100" textAlign="center">
			<CardHeader fontWeight="bold">Referral History</CardHeader>

			<Table colorScheme="blue" variant="striped" width={100}>
				<Tbody>
					<Tr bg="blue.100">
						<Th>Referral ID</Th>
						<Th>Doctor Referred To</Th>
						<Th>Specialization</Th>
						<Th>Patient ID</Th>
						<Th color="red">Delete</Th>
					</Tr>
					{ref.length > 0 ? (
						ref.map((reflist, index) => (
							<Tr key={index}>
								<Td>{reflist.ref_ID}</Td>
								<Td>{reflist.speacialist_referred}</Td>
								<Td>{reflist.doctor_specialization}</Td>
								<Td>{reflist.patient_id}</Td>
								<Td>
									<Button
										color="red"
										onClick={() => {
											onDeleteRow(reflist.ref_ID);
											cancelref(reflist.ref_ID);
										}}>
										Delete
									</Button>
								</Td>
							</Tr>
						))
					) : (
						<Tr>
							<Td colSpan={5}>No Referrals</Td>
						</Tr>
					)}
				</Tbody>
			</Table>
		</Card>
	);
}

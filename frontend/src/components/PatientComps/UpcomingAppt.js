import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Tbody, Tr, Td } from '@chakra-ui/react';

export default function UpcomingAppt() {
	const [myAppointments, setMyAppointments] = useState('');

	useEffect(() => {
		axios
			.get('http://localhost:3000/patient/upcomingappt')
			.then((response) => {
				console.log('My response:', response.data);
				setMyAppointments(response.data);
			})
			.catch((error) => {
				console.log('!!!!! ', error);
			});
	}, []);

	const onDeleteRow = (appointmentId) => {
		setMyAppointments((prevAppointments) =>
			prevAppointments.filter(
				(appointment) => appointment.appointment_id !== appointmentId
			)
		);
	};

	return (
		<Table variant="striped" colorScheme="blue">
			<Tbody>
				{myAppointments.length > 1 ? (
					myAppointments.map((appointment) => (
						<Tr key={appointment.appointment_id}>
							<Td>{appointment.appt_date}</Td>
							<Td>{appointment.appt_office_id}</Td>
							<Td>{appointment.appt_Patient_id}</Td>
							<Td>{appointment.appt_Doctor_id}</Td>
							<Td>
								<button
									onClick={() =>
										onDeleteRow(appointment.appointment_id)
									}>
									Delete
								</button>
							</Td>
						</Tr>
					))
				) : (
					<Tr>
						<Td colSpan={5}>No upcoming appointments</Td>
					</Tr>
				)}
			</Tbody>
		</Table>
	);
}

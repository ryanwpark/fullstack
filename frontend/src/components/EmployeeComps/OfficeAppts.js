import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';

export default function OfficeAppts() {
	const [myAppointments, setMyAppointments] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:8000/employee/upcomingappt')
			.then((response) => {
				console.log('My response:', response.data);
				setMyAppointments(response.data);
			})
			.catch((error) => {
				console.log('!!!!! ', error);
			});
	}, []);

	const cancelAppt = (appt_id) => {
		console.log(appt_id);
		axios
			.post(
				'http://localhost:8000/cancelappt',
				{ appt_id: appt_id },
				{
					headers: { 'Content-Type': 'application/json' },
				}
			)
			.then((response) => {
				console.log('RESPONSE.DATA:');
				console.log(response.data.message);
			})
			.catch((error) => {
				console.log('ERROR.DATA:');
				console.log(error.data);
			});
	};

	const onDeleteRow = (appointmentId) => {
		const updatedAppointments = myAppointments.filter(
			(appointment) => appointment.appointment_id !== appointmentId
		);
		setMyAppointments(updatedAppointments);
	};

	return (
		<Table colorScheme="blue" variant="striped">
			<Tbody>
				<Tr bg="blue.100">
					<Th>Appointment ID</Th>
					<Th>Date</Th>
					<Th>Time</Th>
					<Th>Patient</Th>
					<Th>Doctor</Th>
					<Th color="red">Delete</Th>
				</Tr>
				{myAppointments.length > 0 ? (
					myAppointments.map((appointment) => (
						<Tr key={appointment.appointment_id}>
							<Td>{appointment.appointment_id}</Td>
							<Td>{appointment.appt_date.slice(0, 10)}</Td>
							<Td>{appointment.appt_time.slice(0, 5)}</Td>
							<Td>{appointment.name}</Td>
							<Td>{appointment.doctor_name}</Td>
							<Td>
								<Button
									color="red"
									onClick={() => {
										onDeleteRow(appointment.appointment_id);
										cancelAppt(appointment.appointment_id);
									}}>
									Delete
								</Button>
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

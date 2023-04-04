import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Tbody, Tr, Td, Th, Button } from '@chakra-ui/react';

export default function DoctorCurrAppt() {
	const [myAppointments, setMyAppointments] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:3000/doctor/upcomingappt')
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
				'http://localhost:3000/cancelappt',
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
		<Table variant="striped" bg="blue.100">
			<Tbody>
				<Tr>
					<Th>Date</Th>
					<Th>Time</Th>
					<Th>Location</Th>
					<Th>Patient ID</Th>
				</Tr>
				{myAppointments.length > 0 ? (
					myAppointments.map((appointment, index) => (
						<Tr key={index}>
							<Td>{appointment.appt_date.slice(0, 10)}</Td>
							<Td>{appointment.appt_time}</Td>
							<Td>{appointment.office_city}</Td>
							<Td>{appointment.appt_Patient_id}</Td>
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

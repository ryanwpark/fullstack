import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';

export default function UpcomingAppt() {
	const [myAppointments, setMyAppointments] = useState([]);

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
		<Table variant="striped" colorScheme="blue">
			<Tbody>
				<Th>Date</Th>
				<Th>Time</Th>
				<Th>Location</Th>
				<Th>Doctor</Th>
				{myAppointments.length > 0 ? (
					myAppointments.map((appointment) => (
						<Tr key={appointment.appointment_id}>
							<Td>{appointment.appt_date}</Td>
							<Td>{appointment.appt_time}</Td>
							<Td>{appointment.office_city}</Td>
							{/* <Td>{appointment.appt_Patient_id}</Td> */}
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

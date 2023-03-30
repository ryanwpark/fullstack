import React, { useState, useEffect } from 'react';
import { Table, Tbody, Tr, Th, Td, Thead } from '@chakra-ui/react';
import axios from 'axios';

export default function ApptHistory() {
	const [myAppointments, setMyAppointments] = useState([]);
	const [firstObject, setFirstObject] = useState();
	const [secondObject, setSecondObject] = useState();
	const [thirdObject, setThirdObject] = useState();

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

	useEffect(() => {
		// access the updated state
		// console.log(myAppointments);
		// now you can access the objects in the array like this
		setFirstObject(myAppointments[0]);
		setSecondObject(myAppointments[1]);
		setThirdObject(myAppointments[2]);
		// console.log(firstObject);
		// console.log(secondObject);
		// console.log(thirdObject);
	}, [myAppointments]);

	//HOW TO USE IN HTML
	// {firstObject
	// 	? firstObject.street_address
	// 	: 'Loading...'}
	// ,{' '}
	// {firstObject
	// 	? firstObject.city
	// 	: 'Loading...'}
	// ,{' '}
	// {firstObject
	// 	? firstObject.state
	// 	: 'Loading...'}
	// ,{' '}
	// {firstObject
	// 	? firstObject.zipcode
	// 	: 'Loading...'}

	return (
		<Table variant="striped" colorScheme="blue">
			{/* <Thead>
				<Th>Date</Th>
				<Th>Location</Th>
				<Th>Reason</Th>
				<Th>Overseeing Doctor</Th>
			</Thead> */}
			{/* <Tbody>
				{myAppointments.map((heading) => {
					<th key={heading}>{heading}</th>;
				})}
			</Tbody>
			<Tbody>
				{myAppointments.map((row, index) => (
					<th key={firstObject.appointment_id}>
						{firstObject
							? firstObject.appt_Doctor_id
							: 'Loading...'}
					</th>
				))}
			</Tbody> */}
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

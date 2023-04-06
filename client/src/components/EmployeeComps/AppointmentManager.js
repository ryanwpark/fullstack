import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, VStack, Box, HStack, Card, CardHeader } from '@chakra-ui/react';
import EmployeeFooter from '../Footer/EmployeeFooter';
import axios from 'axios';
import FormikForm from './Formikform';
import banner from '../../pages/banner.jpg';

export default function AppointmentManager() {
	const [apptid, setapptid] = useState('');
	const [appt, setappt] = useState([]);
	const [good, setgood] = useState('');
	const [bad, setbad] = useState('');
	const handleSubmit = () => {
		// console.log('My entry:', apptid);
		axios
			.post(
				'https://medical-clinic-main.herokuapp.com/employee/getappt',
				{
					apptid,
				}
			)
			.then((response) => {
				setappt(response.data.results[0]);
				setbad('');
				setgood('feferfef');
			})
			.catch((error) => {
				console.log(error);
				setappt([]);
				setbad('Sorry, there was a problem');
				setgood('');
			});
	};

	return (
		<VStack
			spacing={8}
			alignItems="center"
			style={{
				backgroundImage: `url(${banner})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
			height="90vh">
			<Box width="100%">
				<EmployeeFooter />
			</Box>
			{bad && (
				<Box>
					<label>{bad}</label>
				</Box>
			)}
			<VStack spacing={5} align="center" justifyContent="center">
				<Card bg="blue.100" width={800}>
					<CardHeader textAlign="center" fontWeight="bold">
						Manage Appointments
					</CardHeader>
					<VStack spacing={10}>
						<Card bg="blue.100" width={800}>
							<HStack spacing={39}>
								<CardHeader>Enter Patient ID</CardHeader>
								<Input
									isRequired
									paddingLeft={50}
									bg="white"
									width={400}
									type="text"
									value={apptid}
									onChange={(e) => {
										setapptid(e.target.value);
									}}
									placeholder="Enter appointment ID"
								/>

								<Card alignSelf="center" bg="green.100">
									<Input
										width={150}
										// bg="blue.100"
										type="submit"
										onClick={handleSubmit}
									/>
								</Card>
							</HStack>
						</Card>
					</VStack>
				</Card>
				<br />
				{good && (
					<FormikForm appt={appt} setappt={setappt} apptid={apptid} />
				)}
			</VStack>
		</VStack>
	);
}

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
	const handleSubmit = () => {
		// console.log('My entry:', apptid);
		axios
			.post('http://localhost:3000/employee/getappt', {
				apptid,
			})
			.then((response) => {
				setappt(response.data.results[0]);
			})
			.catch((error) => {
				console.log(error);
				setappt([]);
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
			<VStack spacing={5} align="center" justifyContent="center">
				<Card bg="blue.100" width={800}>
					<CardHeader textAlign="center">
						Manage Appointments by AppointmentID
					</CardHeader>
				</Card>
				<VStack spacing={10}>
					<Card bg="blue.100" width={800}>
						<HStack spacing={39}>
							<CardHeader>Enter Patient ID</CardHeader>
							<Card>
								<Input
									paddingLeft={50}
									bg="whiteAlpha.100"
									width={400}
									type="text"
									value={apptid}
									onChange={(e) => {
										setapptid(e.target.value);
									}}
									placeholder="Enter appointment ID"
								/>
							</Card>
						</HStack>

						<Card alignSelf="center" bg="green.100">
							<Input
								width={400}
								// bg="blue.100"
								type="submit"
								onClick={handleSubmit}
							/>
						</Card>
					</Card>
				</VStack>
				<br />

				<FormikForm appt={appt} setappt={setappt} apptid={apptid} />
			</VStack>
		</VStack>
	);
}

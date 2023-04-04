import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Input,
	VStack,
	Box,
	HStack,
	Card,
	CardHeader,
	CardBody,
} from '@chakra-ui/react';
import DoctorFooter from '../Footer/DoctorFooter';
import axios from 'axios';
import FormikForm from './patientinfotable';
import banner from '../../pages/banner.jpg';

export default function EditPatientInfo() {
	const [patid, setpatid] = useState('');
	const [info, setmyinfo] = useState([]);
	const [good, setgood] = useState('');
	const [bad, setbad] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('My entry:', patid);
		axios
			.post('http://localhost:3000/doctor/getpatientinfo', {
				id: patid,
			})
			.then((response) => {
				// console.log(response.data);
				setmyinfo(response.data);
				setbad('');
				setgood('feferfef');
			})
			.catch((error) => {
				console.log(error);
				setmyinfo([]);
				setbad('Sorry, there was a problem');
				setgood('');
			});
	};

	// console.log('info:', info);

	return (
		<VStack
			spacing={4}
			alignItems="center"
			style={{
				backgroundImage: `url(${banner})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
			height="90vh">
			<Box width="100%">
				<DoctorFooter />
			</Box>
			{bad && (
				<Box>
					<label>{bad}</label>
				</Box>
			)}
			<VStack align="center" justifyContent="center">
				<VStack>
					<Card bg="blue.100" width={800}>
						<CardHeader>
							Manage Patient Medication and Health
						</CardHeader>
					</Card>
					<form onSubmit={handleSubmit}>
						<Card width={800}>
							<CardBody>
								<HStack>
									<Card bg="blue.100" size="lg" height="5vh">
										<CardHeader padding={2}>
											Enter Patient ID
										</CardHeader>
									</Card>
									<Input
										width={400}
										type="text"
										value={patid}
										onChange={(e) => {
											setpatid(e.target.value);
										}}
										placeholder="Enter Patient ID"
									/>
									<Input
										width={200}
										bg="blue.100"
										type="submit"
									/>
								</HStack>
							</CardBody>
						</Card>
					</form>
				</VStack>
				{good && (
					<FormikForm
						info={info}
						setmyinfo={setmyinfo}
						patid={patid}
						width={800}
					/>
				)}
			</VStack>
		</VStack>
	);
}

import {
	VStack,
	Box,
	Input,
	Card,
	CardBody,
	FormControl,
	FormLabel,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import banner from '../../pages/banner.jpg';
import 'react-datepicker/dist/react-datepicker.css';
import DoctorFooter from '../Footer/DoctorFooter';
import axios from 'axios';

export default function DoctorPatientUpdate() {
	const [patientid, setpatientid] = useState('');
	const [patientinfo, setpatientinfo] = useState([]);
	const handleSubmit = (submitid) => {
		console.log('id:', submitid);
		axios.post('http://localhost:3000/doctor/getPatientData', submitid, {
			headers: { 'Content-Type': 'application/json' },
		});
	};

	return (
		<VStack
			spacing={10}
			alignItems="flex-start"
			style={{
				backgroundImage: `url(${banner})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
			height="90vh">
			<Box width="100%">
				<DoctorFooter />
			</Box>
			<form onSubmit={handleSubmit(patientid)}>
				<VStack className="vstack1" spacing={500}>
					<card style={{ paddingLeft: '50px' }}>
						<FormControl className="formcontrol1">
							<VStack className="vstack2">
								<Card className="card1">
									<CardBody className="cardbody1">
										<FormLabel>Patient ID</FormLabel>
										<Input
											width={360}
											type="text"
											onChange={setpatientid}
											placeholder="Enter Patient's ID Number"
											className="patid"
											focusBorderColor="blue.300"
										/>
									</CardBody>
								</Card>
							</VStack>
							<br />
							<Input width={400} bg="blue.100" type="submit" />
						</FormControl>
					</card>
				</VStack>
			</form>
		</VStack>
	);
}

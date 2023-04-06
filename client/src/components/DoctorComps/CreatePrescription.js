import {
	VStack,
	Box,
	Input,
	CardBody,
	FormControl,
	FormLabel,
	Card,
	HStack,
	CardHeader,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import banner from '../../pages/banner.jpg';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import DoctorFooter from '../Footer/DoctorFooter';
import axios from 'axios';

export default function CreatePrescription() {
	const { register, handleSubmit } = useForm({});
	const [message, setmessage] = useState('');
	const onSubmit = (data) => {
		// console.log(data);
		axios
			.post(
				'https://medical-clinic-main.herokuapp.com/doctor/creatpresc',
				data,
				{
					headers: { 'Content-Type': 'application/json' },
				}
			)
			.then((response) => {
				// console.log('resp:', response);
				// console.log(response.data.message);
				setmessage(response.data.message);
				if (response.data.message === undefined) {
					setmessage('Sorry the PatientID is incorrect');
				}
			})
			.catch((error) => {
				// console.log('Err:', error);
				setmessage('Sorry there was an Error');
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

			<Card
				bg="blue.100"
				alignSelf="center"
				width="75%"
				textAlign="center">
				<CardHeader fontWeight="bold">Create Presription</CardHeader>
			</Card>
			<Card height="22vh" alignSelf="center">
				<CardBody>
					<form onSubmit={handleSubmit(onSubmit)}>
						<HStack>
							<FormControl>
								<VStack>
									<FormLabel>Patient ID</FormLabel>
									<Box>
										<Input
											type="text"
											name="patid"
											placeholder="Enter Patient ID"
											{...register('patid')}
										/>
									</Box>
								</VStack>
							</FormControl>

							<FormControl>
								<VStack>
									<FormLabel>Prescription Name</FormLabel>
									<Box>
										<Input
											type="text"
											name="presname"
											placeholder="Enter Prescription Name"
											{...register('presname')}
										/>
									</Box>
								</VStack>
							</FormControl>
							<FormControl>
								<VStack>
									<FormLabel>Refills</FormLabel>
									<Box>
										<Input
											type="number"
											name="refill"
											placeholder="Amount of Refills"
											{...register('refill')}
										/>
									</Box>
								</VStack>
							</FormControl>
							<FormControl>
								<VStack>
									<FormLabel>Strength(mg)</FormLabel>
									<Box>
										<Input
											type="text"
											name="str"
											placeholder="Prescription Strength"
											{...register('str')}
										/>
									</Box>
								</VStack>
							</FormControl>
							<FormControl>
								<VStack>
									<FormLabel>NDC</FormLabel>
									<Box>
										<Input
											type="text"
											name="ndc"
											placeholder="Medication NDC #"
											{...register('ndc')}
										/>
									</Box>
								</VStack>
							</FormControl>
						</HStack>
						<br />
						<FormControl align="center">
							<Input
								width={400}
								bg="blue.100"
								type="submit"
								onClick={handleSubmit}
							/>
						</FormControl>
					</form>
				</CardBody>
			</Card>
			<HStack className="myDataReport"></HStack>
			{message && (
				<Card
					bg="blue.100"
					borderColor="blue.100"
					alignSelf="center"
					width={300}
					textAlign="center">
					<CardBody margin={1}>{message}</CardBody>
				</Card>
			)}
		</VStack>
	);
}

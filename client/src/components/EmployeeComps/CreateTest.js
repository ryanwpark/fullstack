import {
	VStack,
	Box,
	Input,
	HStack,
	Card,
	CardBody,
	FormControl,
	FormLabel,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default function CreateTest() {
	const { register, handleSubmit } = useForm();
	const [message, setmessage] = useState('');
	const [errmessage, seterrmessage] = useState('');
	const onSubmit = (data) => {
		console.log(data);
		axios
			.post(
				'https://medical-clinic-main.herokuapp.com/employee/BloodTest',
				data,
				{
					headers: { 'Content-Type': 'application/json' },
				}
			)
			.then((response) => {
				console.log('Res:', response);
				setmessage(response.data.message);
				seterrmessage('');
			})
			.catch((error) => {
				console.log('Err:', error);
				seterrmessage('Sorry, something went wrong');
				setmessage('');
			});
	};

	return (
		<Box alignSelf="center">
			{message && (
				<Box align="center">
					<Card
						textAlign="center"
						width={300}
						alignSelf="center"
						bg="blue.100">
						{message}
					</Card>
				</Box>
			)}
			<br />
			<form onSubmit={handleSubmit(onSubmit)}>
				<Card height="30vh" align="center">
					<CardBody>
						<FormLabel textAlign="center" fontWeight="bold">
							Enter Blood Test Results
						</FormLabel>

						<HStack spacing={10}>
							<FormControl>
								<VStack alignContent="center" spacing={5}>
									<HStack>
										<FormLabel textAlign="center">
											Patient ID
										</FormLabel>
										<Input
											width={200}
											type="text"
											placeholder="Patient's ID"
											className="patname"
											focusBorderColor="blue.300"
											{...register('patid')}
										/>
										<FormLabel>Blood Type</FormLabel>
										<Input
											width={150}
											type="text"
											placeholder="Blood Type"
											className="type"
											focusBorderColor="blue.300"
											{...register('type')}
										/>
										<FormLabel>Hematocrit %</FormLabel>
										<Input
											width={150}
											type="number"
											placeholder="Enter %"
											className="hema"
											focusBorderColor="blue.300"
											{...register('hemato')}
										/>
									</HStack>
									<HStack>
										<FormLabel>WBC</FormLabel>
										<Input
											width={150}
											type="number"
											placeholder="in Thousands"
											className="wbc"
											focusBorderColor="blue.300"
											{...register('wbc')}
										/>
										<FormLabel>RBC</FormLabel>
										<Input
											width={150}
											type="number"
											placeholder="in Thousands"
											className="rbc"
											focusBorderColor="blue.300"
											{...register('rbc')}
										/>
										<FormLabel>Hemoglobin Count</FormLabel>
										<Input
											width={150}
											type="number"
											placeholder="in Thousands"
											className="hemo"
											focusBorderColor="blue.300"
											{...register('hemoglo')}
										/>

										<FormLabel>Platelets</FormLabel>
										<Input
											width={150}
											type="number"
											placeholder="in Thousands"
											className="patname"
											focusBorderColor="blue.300"
											{...register('plate')}
										/>
									</HStack>
								</VStack>
							</FormControl>
						</HStack>
						<br />
						<FormControl align="center">
							<Input width={300} bg="blue.100" type="submit" />
						</FormControl>
					</CardBody>
				</Card>
			</form>
			<br />
			{errmessage && (
				<Card
					textAlign="center"
					width={300}
					alignSelf="center"
					bg="red.100">
					{errmessage}
				</Card>
			)}
		</Box>
	);
}

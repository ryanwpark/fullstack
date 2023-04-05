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
import banner from '../../pages/banner.jpg';
import 'react-datepicker/dist/react-datepicker.css';
import EmployeeFooter from '../Footer/EmployeeFooter';
import axios from 'axios';

export default function CreateTest() {
	const { register, handleSubmit } = useForm();
	const [message, setmessage] = useState('');
	const [errmessage, seterrmessage] = useState('');
	const onSubmit = (data) => {
		console.log(data);
		axios
			.post('http://localhost:3000/employee/BloodTest', data, {
				headers: { 'Content-Type': 'application/json' },
			})
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
				<EmployeeFooter />
			</Box>
			{message && (
				<Card
					textAlign="center"
					width={300}
					alignSelf="center"
					bg="blue.100">
					{message}
				</Card>
			)}
			<Box alignSelf="center">
				<form onSubmit={handleSubmit(onSubmit)}>
					<Card height="50vh" align="center">
						<CardBody>
							<FormLabel textAlign="center">
								Enter Blood Test Results
							</FormLabel>

							<HStack spacing={10}>
								<VStack spacing={8}>
									<FormControl>
										<VStack>
											<Box alignSelf="center">
												<FormLabel>
													Patient ID
												</FormLabel>
												<Input
													width={400}
													type="text"
													placeholder="Enter Patient's ID"
													className="patname"
													focusBorderColor="blue.300"
													{...register('patid')}
												/>
											</Box>
											<Card>
												<CardBody>
													<HStack>
														<VStack>
															<FormLabel>
																Blood Type
															</FormLabel>
															<Input
																width={400}
																type="text"
																placeholder="Enter WBC"
																className="type"
																focusBorderColor="blue.300"
																{...register(
																	'type'
																)}
															/>
															<FormLabel>
																WBC (in
																thousands)
															</FormLabel>
															<Input
																width={400}
																type="number"
																placeholder="Enter WBC"
																className="wbc"
																focusBorderColor="blue.300"
																{...register(
																	'wbc'
																)}
															/>
															<FormLabel>
																RBC (in
																thousands)
															</FormLabel>
															<Input
																width={400}
																type="number"
																placeholder="Enter RBC"
																className="rbc"
																focusBorderColor="blue.300"
																{...register(
																	'rbc'
																)}
															/>
														</VStack>
														<VStack>
															<FormLabel>
																Hemoglobin Count
															</FormLabel>
															<Input
																width={400}
																type="number"
																placeholder="Enter Hemoglobin Count in Thousands"
																className="hemo"
																focusBorderColor="blue.300"
																{...register(
																	'hemoglo'
																)}
															/>
															<FormLabel>
																Hematocrit %
															</FormLabel>
															<Input
																width={400}
																type="number"
																placeholder="Enter Hematocrit Percent"
																className="hema"
																focusBorderColor="blue.300"
																{...register(
																	'hemato'
																)}
															/>
															<FormLabel>
																Platelets
															</FormLabel>
															<Input
																width={400}
																type="number"
																placeholder="Enter Platelets Count in Thousands"
																className="patname"
																focusBorderColor="blue.300"
																{...register(
																	'plate'
																)}
															/>
														</VStack>
													</HStack>
												</CardBody>
											</Card>
										</VStack>
									</FormControl>
								</VStack>
							</HStack>
							<br />
							<FormControl align="center">
								<Input
									width={400}
									bg="blue.100"
									type="submit"
								/>
							</FormControl>
						</CardBody>
					</Card>
				</form>
			</Box>
			{errmessage && (
				<Card
					textAlign="center"
					width={300}
					alignSelf="center"
					bg="red.100">
					{errmessage}
				</Card>
			)}
		</VStack>
	);
}

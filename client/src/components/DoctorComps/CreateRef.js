import {
	VStack,
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

export default function CreateRef() {
	const { register, handleSubmit } = useForm();
	const [message, setmessage] = useState('');
	const [errmessage, seterrmessage] = useState('');
	const onSubmit = (data) => {
		console.log(data);
		axios
			.post(
				'https://medical-clinc-backend.herokuapp.com/doctor/makeref',
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
		<Card>
			{message && <Card bg="green.100">{message}</Card>}
			<form onSubmit={handleSubmit(onSubmit)}>
				<Card height="70vh" alignSelf="center" bg="blue.100">
					<CardBody>
						<FormLabel textAlign="center" fontWeight="bold">
							Create Referral
						</FormLabel>
						<HStack spacing={10}>
							<VStack spacing={8}>
								<FormControl>
									<VStack>
										<Card>
											<CardBody>
												<VStack>
													<FormLabel>
														Patient First Name
													</FormLabel>
													<Input
														width={400}
														type="number"
														placeholder="Enter Patient's ID"
														className="patf"
														focusBorderColor="blue.300"
														{...register('patid')}
													/>
													<FormLabel>
														Patient First Name
													</FormLabel>
													<Input
														width={400}
														type="text"
														placeholder="Enter Patient's First Name"
														className="patf"
														focusBorderColor="blue.300"
														{...register('patf')}
													/>
													<FormLabel>
														Patient Last Name
													</FormLabel>
													<Input
														width={400}
														type="text"
														placeholder="Enter Patient's Last Name"
														className="patl"
														focusBorderColor="blue.300"
														{...register('patl')}
													/>
													<FormLabel>
														Specialist Referred
													</FormLabel>
													<Input
														width={400}
														type="number"
														placeholder="Enter Referring Doctor's ID"
														className="rbc"
														focusBorderColor="blue.300"
														{...register('ref')}
													/>
													<FormLabel>
														Specialization
													</FormLabel>
													<Input
														width={400}
														type="text"
														placeholder="Enter Referring Doctor's Specialization"
														className="wbc"
														focusBorderColor="blue.300"
														{...register('spec')}
													/>
												</VStack>
											</CardBody>
										</Card>
									</VStack>
								</FormControl>
							</VStack>
						</HStack>
						<br />
						<FormControl align="center">
							<Input width={400} bg="blue.200" type="submit" />
						</FormControl>
					</CardBody>
				</Card>
			</form>
			{errmessage && <Card bg="red">{errmessage}</Card>}
		</Card>
	);
}

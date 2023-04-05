import {
	VStack,
	Box,
	Input,
	Card,
	CardBody,
	FormControl,
	FormLabel,
	Checkbox,
	CheckboxGroup,
	HStack,
	CardFooter,
	Table,
	Tbody,
	Tr,
	Th,
	Td,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import banner from '../../pages/banner.jpg';
import 'react-datepicker/dist/react-datepicker.css';
import DoctorFooter from '../Footer/DoctorFooter';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function DoctorPatientReport() {
	const { register, handleSubmit } = useForm({});
	const [data, setdata] = useState([]);
	const [message, setMessage] = useState('');
	const [errMessage, setErrMessage] = useState('');
	const onSubmit = (data) => {
		axios
			.post('http://localhost:8000/doctor/patientreport', data, {
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				console.log('resp:', response.data);
				setdata(response.data);
				setMessage('It worked');
				setErrMessage('');
			})
			.catch((error) => {
				console.log('Err:', error);
				setErrMessage('Sorry, something went wrong');
				setMessage('');
				// console.log(error.data);
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
			{errMessage && (
				<Card textColor="red" alignSelf="center">
					<CardFooter>{errMessage}</CardFooter>
				</Card>
			)}
			<Box alignSelf="center">
				<HStack spacing={55}>
					<Box>
						<form onSubmit={handleSubmit(onSubmit)}>
							<VStack className="vstack1" spacing={50}>
								<FormControl
									className="formcontrol1"
									marginLeft={50}
									width={400}>
									<Card padding={10} bg="blue.100">
										<FormLabel
											fontSize="md"
											textAlign="center">
											Reports for specific health groups
										</FormLabel>
									</Card>
									<Card>
										<CardBody>
											<HStack spacing={50}>
												<VStack className="vstack2">
													<CheckboxGroup>
														<Checkbox
															className="smoker"
															{...register(
																'smoker'
															)}>
															Smoker
														</Checkbox>
														<Checkbox
															className="diabetes"
															{...register(
																'diabetes'
															)}>
															Diabetes
														</Checkbox>
														<Checkbox
															className="pregnant"
															{...register(
																'pregnant'
															)}>
															Pregnant
														</Checkbox>
													</CheckboxGroup>
												</VStack>
												<VStack className="vstack3">
													<CheckboxGroup>
														<Checkbox
															className="heart"
															{...register(
																'heart'
															)}>
															Heart Disease
														</Checkbox>
														<Checkbox
															className="cancer"
															{...register(
																'cancer'
															)}>
															Cancer
														</Checkbox>
														<Checkbox
															className="active"
															{...register(
																'active'
															)}>
															Sexually Active
														</Checkbox>
													</CheckboxGroup>
												</VStack>
											</HStack>
											<br />
											<Box paddingLeft={10}>
												<Input
													width={200}
													bg="blue.100"
													type="submit"
												/>
											</Box>
										</CardBody>
									</Card>
								</FormControl>
							</VStack>
						</form>
					</Box>
					<Box>
						{message && (
							<Card width={800} alignSelf="center">
								<Table
									// variant="striped"
									colorScheme="blue"
									width={800}>
									<Tbody>
										<Tr bgColor="blue.100">
											<Th>Heights</Th>
											<Th>Weights</Th>
										</Tr>
										{data?.map((datareport, index) => (
											<Tr key={index}>
												<Td>{datareport.gc_Height}</Td>
												<Td>{datareport.gc_weight}</Td>
											</Tr>
										))}
										<Tr bgColor="blue.100">
											<Th>Average Heights</Th>
											<Th>Average Weights</Th>
										</Tr>
										<Tr>
											<Td>
												{(
													data.reduce(
														(sum, datareport) =>
															sum +
															datareport.gc_Height,
														0
													) / data.length
												).toFixed(1)}{' '}
												feet
											</Td>
											<Td>
												{(
													data.reduce(
														(sum, datareport) =>
															sum +
															datareport.gc_weight,
														0
													) / data.length
												).toFixed(2)}{' '}
												lbs
											</Td>
										</Tr>
									</Tbody>
								</Table>
							</Card>
						)}
					</Box>
				</HStack>
			</Box>
		</VStack>
	);
}

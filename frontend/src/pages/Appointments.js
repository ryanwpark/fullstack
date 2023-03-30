import {
	Stack,
	VStack,
	Box,
	Input,
	Radio,
	RadioGroup,
	HStack,
	Select,
	Card,
	CardBody,
	FormControl,
	FormLabel,
	CardFooter,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm, Controller } from 'react-hook-form';
import PatientsFooter from '../components/Footer/PatientsFooter';
import banner from '../pages/banner.jpg';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default function Appointments() {
	const [doctorArray, setDoctorArray] = useState([]);
	const [selectedDoctor, setSelectedDoctor] = useState('');
	const { register, control, handleSubmit } = useForm();
	const [location, setLocation] = useState('');
	const [reason, setReason] = useState('');
	const [message, setMessage] = useState('');

	// GET DOCTORS
	useEffect(() => {
		// console.log(location, reason);
		if (location && reason) {
			axios
				.post('http://localhost:3000/patient/bookappt/doctors', {
					location,
					reason,
				})
				.then((response) => {
					// console.log(response.data);
					setDoctorArray(response.data);
					// console.log(doctorArray);
				})
				.catch((error) => {
					console.log('error2');
					// console.log('GET FILTERED DOCTORS');
					console.log(error);
				});
		} else {
			setDoctorArray([]);
		}
	}, [location, reason]);

	const onSubmit = (data) => {
		if (location && reason && selectedDoctor && DatePicker) {
			if (location === 'Houston') {
				data.location = '1';
			} else if (location === 'Dallas') {
				data.location = '2';
			} else if (location === 'Austin') {
				data.location = '3';
			}
			console.log('DATA:');
			console.log(data);
			axios
				.post('http://localhost:3000/patient/bookappt/noRef', data, {
					headers: { 'Content-Type': 'application/json' },
				})
				.then((response) => {
					console.log('RESPONSE.DATA:');
					setMessage('Appointment successfully booked!');
					console.log(response.data);
				})
				.catch((error) => {
					console.log('ERROR.DATA:');
					setMessage('Sorry, that date is already booked');
					console.log(error.data);
				});
		}
	};

	// useEffect(() => {
	// 	// console.log('CALLING EFFECT');
	// 	// console.log(selectedDoctor);
	// 	if (selectedDoctor) {
	// 		axios
	// 			.post(
	// 				'http://localhost:3000/patient/bookappt/doctors/datetimes',
	// 				{
	// 					location,
	// 					reason,
	// 					first,
	// 					last,
	// 				}
	// 			)
	// 			.then((response) => {
	// 				console.log(response.data);
	// 				response.data.setHours(
	// 					parseInt(apptTime.split(':')[0], 10)
	// 				);
	// 				response.data.setMinutes(
	// 					parseInt(apptTime.split(':')[1], 10)
	// 				);
	// 				// setApptDateTimes(response.data);
	// 			})
	// 			.catch((error) => {
	// 				console.log('error2');
	// 				// console.log('GET FILTERED DOCTORS');
	// 				console.log(error);
	// 			});
	// 	} else {
	// 		setApptDate([]);
	// 		setApptTime([]);
	// 	}
	// }, [selectedDoctor]);

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
				<PatientsFooter />
			</Box>
			<Card height="50vh" alignSelf="center">
				<CardBody>
					<form onSubmit={handleSubmit(onSubmit)}>
						<HStack spacing={10}>
							<VStack spacing={8}>
								<FormControl>
									<HStack>
										<FormLabel>Location</FormLabel>
										<RadioGroup
											className="location"
											isRequired
											onChange={setLocation}
											value={location}>
											<Stack direction="row">
												<Radio
													size="sm"
													value="Houston"
													{...register('location')}>
													Houston
												</Radio>
												<Radio
													size="sm"
													value="Dallas"
													{...register('location')}>
													Dallas
												</Radio>
												<Radio
													size="sm"
													value="Austin"
													{...register('location')}>
													Austin
												</Radio>
											</Stack>
										</RadioGroup>
									</HStack>
								</FormControl>

								<FormControl>
									<HStack>
										<FormLabel>Reason</FormLabel>

										<RadioGroup
											className="reason"
											onChange={setReason}
											isRequired
											value={reason}>
											<Stack direction="row">
												<Radio
													width={145}
													size="sm"
													value="general"
													{...register('reason')}>
													General Check-Up
												</Radio>
												<Radio
													size="sm"
													value="cardio"
													{...register('reason')}>
													Cardiovascular
												</Radio>
												<Radio
													size="sm"
													value="gastro"
													{...register('reason')}>
													Gastroentology
												</Radio>
												<Radio
													size="sm"
													value="radio"
													{...register('reason')}>
													Radiology
												</Radio>
											</Stack>
										</RadioGroup>
									</HStack>
								</FormControl>

								<FormControl>
									<HStack>
										<FormLabel>Doctor</FormLabel>

										<Select
											value={selectedDoctor}
											isRequired
											placeholder="Select Doctor"
											onChange={(e) =>
												setSelectedDoctor(
													e.target.value
												)
											}
											disabled={!reason && !location}>
											{doctorArray.map((doctorArray) => (
												<option
													key={doctorArray.doctor_ID}
													value={
														doctorArray.doctor_ID
													}
													{...register('doctor')}>
													{doctorArray.full_name}
												</option>
											))}
										</Select>
									</HStack>
								</FormControl>

								<FormControl>
									<HStack>
										<FormLabel>
											Insurance Provider
										</FormLabel>
										<Input
											width={400}
											type="text"
											placeholder="Enter Insurance Provider"
											className="provider"
											focusBorderColor="blue.300"
											{...register('provider')}
										/>
									</HStack>
								</FormControl>
							</VStack>

							<FormControl>
								<VStack>
									<FormLabel>
										Appointment Date and Time
									</FormLabel>
									<Box>
										<Controller
											control={control}
											name="DatePicker"
											render={({
												field: { value, onChange },
											}) => (
												<DatePicker
													inline
													showTimeSelect
													selected={value}
													onChange={onChange}
													dateFormat="MMMM d, yyyy h:mm aa"
													placeholderText="Select a Date"
												/>
											)}
										/>
									</Box>
								</VStack>
							</FormControl>
						</HStack>
						<br /> <br />
						<FormControl align="center">
							<Input width={400} bg="blue.100" type="submit" />
						</FormControl>
					</form>
					<br />
					<br />
					<CardFooter bg="blue.400">{message}</CardFooter>
				</CardBody>
			</Card>
		</VStack>
	);
}

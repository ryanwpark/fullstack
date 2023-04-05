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
	const [date, setDate] = useState('');
	const [refID, setRefID] = useState('');
	// const [apptTime, setApptTime] = useState('');
	// const [apptDate, setApptDate] = useState('');

	// GET DOCTORS
	useEffect(() => {
		// console.log('MyLocation&Reason', location, reason);
		if (location && reason) {
			axios
				.post('http://localhost:8000/patient/bookappt/getdoctors', {
					location,
					reason,
				})
				.then((response) => {
					// console.log(response.data);
					setDoctorArray(response.data);
					setMessage(response.message);
					// console.log(doctorArray);
				})
				.catch((error) => {
					// console.log('error2');
					// setMessage('Appointment is already booked');
					// console.log(error);
				});
		} else {
			setDoctorArray([]);
		}
	}, [location, reason]);

	const onSubmit = (data) => {
		if (location && reason && selectedDoctor && date) {
			if (location === 'Houston') {
				data.location = '1';
			} else if (location === 'Dallas') {
				data.location = '3';
			} else if (location === 'Austin') {
				data.location = '2';
			}
			// console.log('convert this:', data.DatePicker);
			const datePicker = data.DatePicker;
			const timezoneOffset = 5; // in hours

			datePicker.setHours(datePicker.getHours() - timezoneOffset);
			const temptemp = data.DatePicker.toISOString();
			// console.log('converted:', temptemp);
			data.DatePicker = temptemp;
			console.log('Sending:', data);
			axios
				.post('http://localhost:8000/patient/bookappt/noRef', {
					data,
				})
				.then((response) => {
					// console.log(response);
					// console.log(response.data);
					if (response.status === 200) {
						// console.log('Response status:', response.status);
						setMessage(response.data);
					} else {
						// console.log('Response status:', response.status);
						setMessage(response.data);
					}

					// console.log(response.data);
				})
				.catch((error) => {
					// console.log('error:', error);
					setMessage('Sorry, there was an error');
					// console.log(error.data);
				});
		}
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
				<PatientsFooter />
			</Box>
			{message && (
				<Card alignSelf="center" width={400}>
					<CardFooter bg="blue.100">{message}</CardFooter>
				</Card>
			)}
			<Card height="50vh" alignSelf="center">
				<CardBody>
					<br />
					<form onSubmit={handleSubmit(onSubmit)}>
						<HStack spacing={10}>
							<VStack spacing={8}>
								<FormControl>
									<HStack>
										<FormLabel>Location</FormLabel>
										<RadioGroup
											className="location"
											isrequired="true"
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
											isrequired="true"
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
													value="Cardiology"
													disabled={!refID}
													{...register('reason')}>
													Cardiovascular
												</Radio>
												<Radio
													size="sm"
													value="Gastroentology"
													disabled={!refID}
													{...register('reason')}>
													Gastroentology
												</Radio>
												<Radio
													size="sm"
													value="Radiology"
													disabled={!refID}
													{...register('reason')}>
													Radiology
												</Radio>
											</Stack>
										</RadioGroup>
									</HStack>
								</FormControl>

								<FormControl>
									<HStack>
										<FormLabel>Referral ID</FormLabel>

										<Input
											type="text"
											onChange={setRefID}
											className="refid"
											placeholder="Optional"
											{...register('refid')}
										/>
									</HStack>
								</FormControl>

								<FormControl>
									<HStack>
										<FormLabel>Doctor</FormLabel>
										<Select
											value={selectedDoctor}
											isrequired="true"
											placeholder="Select Doctor"
											onChange={(e) => {
												// console.log(e.target.value);
												setSelectedDoctor(
													e.target.value
												);
											}}
											// {...register('doctor_id')}
											disabled={!reason && !location}>
											{doctorArray.map((doctor) => (
												<option
													key={doctor.doctor_id}
													{...register('doctor_id')}
													value={doctor.doctor_id}>
													{doctor.doctor_name}
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
													// excludeDates={apptDate}
													// excludeTimes={apptTime}
													// {...register('date')}
													onChange={(date) => {
														// console.log(date);
														setDate(date);
														onChange(date);
													}}
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
						<br />
						<FormControl align="center">
							<Input width={400} bg="blue.100" type="submit" />
						</FormControl>
					</form>
					<br />
					<br />
				</CardBody>
			</Card>
		</VStack>
	);
}

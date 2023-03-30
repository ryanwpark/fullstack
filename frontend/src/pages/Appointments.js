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
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm, Controller } from 'react-hook-form';
import PatientsFooter from '../components/Footer/PatientsFooter';
import banner from '../pages/banner.jpg';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const mockDoctors = [
	{
		id: 1,
		fullname: 'Dr. John Smith',
		location: 'Houston',
		reason: 'general',
		schedule: ['Mon 9-11am', 'Wed 1-3pm', 'Fri 10am-12pm'],
	},
	{
		id: 2,
		fullname: 'Dr. Jane Doe',
		location: 'Houston',
		reason: 'radio',
		schedule: ['Tues 9-11am', 'Thurs 1-3pm', 'Sat 10am-12pm'],
	},
	{
		id: 3,
		fullname: 'Dr. Mark Johnson',
		location: 'Austin',
		reason: 'cardio',
		schedule: ['Mon 1-3pm', 'Wed 9-11am', 'Fri 1-3pm'],
	},
	{
		id: 4,
		fullname: 'Dr. Sarah Lee',
		location: 'Dallas',
		reason: 'gastro',
		schedule: ['Tues 1-3pm', 'Thurs 9-11am', 'Sat 1-3pm'],
	},
];

export default function Appointments() {
	const [doctors, setDoctors] = useState([]);
	const [selectedDoctor, setSelectedDoctor] = useState('');
	const { register, handleSubmit, control } = useForm();
	const [location, setLocation] = useState('Houston');
	const [reason, setReason] = useState('general');

	useEffect(() => {
		axios
			.get('http://localhost:3000/appt/doctors')
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log('error from location.js');
				console.log(error);
			});
	}, []);

	useEffect(() => {
		if (location && reason) {
			const filteredDoctors = mockDoctors.filter(
				(doctor) =>
					doctor.location === location && doctor.reason === reason
			);
			setDoctors(filteredDoctors);
		} else {
			setDoctors([]);
		}
	}, [location, reason]);

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
					<form>
						<HStack spacing={10}>
							<VStack spacing={8}>
								<FormControl>
									<HStack>
										<FormLabel>Location</FormLabel>
										<RadioGroup
											className="location"
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
										<FormLabel>Location</FormLabel>

										<RadioGroup
											className="reason"
											onChange={setReason}
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
											placeholder="Select Doctor"
											onChange={(e) =>
												setSelectedDoctor(
													e.target.value
												)
											}
											disabled={!reason && !location}>
											{doctors.map((doctors) => (
												<option
													key={doctors.id}
													value={doctors.fullname}
													{...register('doctor')}>
													{doctors.fullname}
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
				</CardBody>
			</Card>
		</VStack>
	);
}

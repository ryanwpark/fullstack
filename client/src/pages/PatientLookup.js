import {
	VStack,
	Box,
	Input,
	HStack,
	Center,
	Card,
	CardBody,
	Divider,
	FormControl,
	FormLabel,
	Th,
	Table,
	Tr,
	Td,
	Text,
	Tbody,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm, Controller } from 'react-hook-form';
import banner from '../pages/banner.jpg';
import 'react-datepicker/dist/react-datepicker.css';
import EmployeeFooter from '../components/Footer/EmployeeFooter';
import axios from 'axios';

export default function PatientLookup() {
	const { register, handleSubmit, control } = useForm();
	const [info, setInfo] = useState([]); // moved useState hook to top level of component
	const [msg, setmsg] = useState('');
	const [errmsg, seterrmsg] = useState('');
	const [count, setCount] = useState([]);
	const [start, setstart] = useState('');
	const [end, setend] = useState('');

	const onSubmit = (data) => {
		if (data.startdate && data.enddate) {
			const startdate = data.startdate.toISOString();
			const enddate = data.enddate.toISOString();
			setstart(startdate);
			setend(enddate);
			console.log('Sending:', { ...data, startdate, enddate });
			axios
				.post(
					'https://medical-clinc-backend.herokuapp.com/employee/patientlookup',
					{ data }
				)
				.then((response) => {
					console.log('response:', response);
					setInfo(response.data);
					setmsg('works');
					seterrmsg('');
					const cities = response.data.map((appt) => appt.city);
					const counts = cities.reduce((acc, city) => {
						if (acc[city]) {
							acc[city]++;
						} else {
							acc[city] = 1;
						}
						return acc;
					}, {});
					const countArray = Object.entries(counts).map(
						([city, count]) => ({ city, count })
					);
					setCount(countArray);
					setInfo(response.data);
				})
				.catch((error) => {
					console.log('Sorry, there was an error:', error);
					setmsg('');
					seterrmsg("Sorry that's the wrong ID");
				});
		} else if (data.startdate && !data.enddate) {
			const startdate = data.startdate.toISOString();
			setstart(startdate);
			console.log('Sending:', { ...data, startdate });
			axios
				.post(
					'https://medical-clinic-main.herokuapp.com/employee/patientlookup/noend',
					// 'http://localhost:8000/employee/patientlookup/noend',
					{ data }
				)
				.then((response) => {
					console.log('response:', response);
					setInfo(response.data);
					setmsg('works');
					seterrmsg('');
					const cities = response.data.map((appt) => appt.city);
					const counts = cities.reduce((acc, city) => {
						if (acc[city]) {
							acc[city]++;
						} else {
							acc[city] = 1;
						}
						return acc;
					}, {});
					const countArray = Object.entries(counts).map(
						([city, count]) => ({ city, count })
					);
					setCount(countArray);
					setInfo(response.data);
				})
				.catch((error) => {
					console.log('Sorry, there was an error:', error);
					setmsg('');
					seterrmsg("Sorry that's the wrong ID");
				});
		}
		if (!data.startdate && !data.enddate) {
			console.log('Sending:', { ...data });
			axios
				.post(
					'https://medical-clinic-main.herokuapp.com/employee/patientlookup/nothing',
					// 'http://localhost:8000/employee/patientlookup/nothing',
					{ data }
				)
				.then((response) => {
					console.log('response:', response);
					setInfo(response.data);
					setmsg('works');
					seterrmsg('');
					const cities = response.data.map((appt) => appt.city);
					const counts = cities.reduce((acc, city) => {
						if (acc[city]) {
							acc[city]++;
						} else {
							acc[city] = 1;
						}
						return acc;
					}, {});
					const countArray = Object.entries(counts).map(
						([city, count]) => ({ city, count })
					);
					setCount(countArray);
					setInfo(response.data);
				})
				.catch((error) => {
					console.log('Sorry, there was an error:', error);
					setmsg('');
					seterrmsg("Sorry that's the wrong ID");
				});
		}
		if (!data.startdate && data.enddate) {
			const enddate = data.enddate.toISOString();
			setend(enddate);
			console.log('Sending:', { ...data, enddate });
			axios
				.post(
					'https://medical-clinic-main.herokuapp.com/employee/patientlookup/nostart',
					// 'http://localhost:8000/employee/patientlookup/nostart',
					{ data }
				)
				.then((response) => {
					console.log('response:', response);
					setInfo(response.data);
					setmsg('works');
					seterrmsg('');
					const cities = response.data.map((appt) => appt.city);
					const counts = cities.reduce((acc, city) => {
						if (acc[city]) {
							acc[city]++;
						} else {
							acc[city] = 1;
						}
						return acc;
					}, {});
					const countArray = Object.entries(counts).map(
						([city, count]) => ({ city, count })
					);
					setCount(countArray);
					setInfo(response.data);
				})
				.catch((error) => {
					console.log('Sorry, there was an error:', error);
					setmsg('');
					seterrmsg("Sorry that's the wrong ID");
				});
		}
	};

	console.log('test:', info, ' :count:', count);

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
			{errmsg && (
				<Card alignSelf="center" textAlign="center">
					{errmsg}
				</Card>
			)}
			<Card height="50vh" alignSelf="center">
				<CardBody>
					<form onSubmit={handleSubmit(onSubmit)}>
						<HStack spacing={10}>
							<VStack spacing={2}>
								<FormControl>
									<FormLabel textAlign="center">
										Find the frequency of visits made by a
										patient
									</FormLabel>
									<VStack>
										<Card>
											<CardBody>
												<FormLabel>
													Patient ID
												</FormLabel>
												<Input
													isRequired
													width={400}
													type="text"
													placeholder="Enter Patient ID"
													className="patid"
													focusBorderColor="blue.300"
													{...register('patid')}
												/>
											</CardBody>
										</Card>
									</VStack>
								</FormControl>
							</VStack>

							<FormControl>
								<VStack>
									<FormLabel>Start Date</FormLabel>
									<Box>
										<Controller
											control={control}
											name="startdate"
											render={({
												field: { value, onChange },
											}) => (
												<DatePicker
													inline
													selected={value}
													onChange={onChange}
													dateFormat="yyyy-MM-dd"
													placeholderText="Select a start date"
												/>
											)}
										/>
									</Box>
								</VStack>
							</FormControl>

							<FormControl>
								<VStack>
									<FormLabel>End Date</FormLabel>
									<Box>
										<Controller
											control={control}
											name="enddate"
											render={({
												field: { value, onChange },
											}) => (
												<DatePicker
													inline
													selected={value}
													onChange={onChange}
													dateFormat="yyyy-MM-dd"
													placeholderText="Select a start date"
												/>
											)}
										/>
									</Box>
								</VStack>
							</FormControl>
						</HStack>
						<br />
						<FormControl align="center">
							<Input width={400} bg="blue.100" type="submit" />
						</FormControl>
					</form>
				</CardBody>
			</Card>
			{msg && (
				<Card alignSelf="center">
					<Box backgroundColor="blue.100">
						<Center>
							{end && start && (
								<Text fontWeight="bold">
									Patient Information between{' '}
									{start.slice(0, 10)} and {end.slice(0, 10)}
								</Text>
							)}
							{end && !start && (
								<Text fontWeight="bold">
									Patient Information until {end.slice(0, 10)}
								</Text>
							)}
							{start && !end && (
								<Text fontWeight="bold">
									Patient Information from{' '}
									{start.slice(0, 10)}
								</Text>
							)}
							{!start && !end && (
								<Text fontWeight="bold">
									All Patient Information
								</Text>
							)}
						</Center>
						<Center>
							<Text>
								<b>Name:</b> {info?.[0]?.patient_first_name}{' '}
								{info?.[0]?.patient_last_name}&nbsp;&nbsp;
								<b>Gender:</b> {info?.[0]?.patient_sex}
								&nbsp;&nbsp;
								<b>Email:</b>&nbsp;{info?.[0]?.patient_email}
								&nbsp;&nbsp;
								<b>Phone Number:</b>{' '}
								{info?.[0]?.patient_phone_num}
							</Text>
						</Center>
					</Box>

					<Divider borderWidth="2px" />
					<Table colorScheme="blue">
						<Tbody>
							<Tr bgColor="blue.100">
								<Th>Appointment ID</Th>
								<Th>Appointment Date</Th>
								<Th>Appointment Time</Th>
								<Th>Doctor Name</Th>
								<Th>Doctor Specialization</Th>
								<Th>Appointment Location</Th>
								<Th>Refferal ID</Th>
							</Tr>
							{info?.map((appointment) => (
								<Tr key={appointment.appointment_id}>
									<Td>{appointment.appointment_id}</Td>
									<Td>
										{appointment.appt_date.slice(0, 10)}
									</Td>
									<Td>{appointment.appt_time}</Td>
									<Td>{appointment.doctor_name}</Td>
									<Td>{appointment.doctor_specialization}</Td>
									<Td>{appointment.city}</Td>
									<Td>{appointment.ref_id}</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
					<Divider borderWidth="2px" />
					<Table colorScheme="blue">
						<Tbody>
							<FormLabel textAlign="center" bg="blue.100">
								Total Count
							</FormLabel>
							<Tr bgColor="blue.100">
								<Th>Houston</Th>
								<Th>Austin</Th>
								<Th>Dallas</Th>
								<Th>Total</Th>
							</Tr>
							<Tr>
								<Td>
									{count?.find((c) => c.city === 'Houston')
										?.count || 0}
								</Td>
								<Td>
									{count?.find((c) => c.city === 'Austin')
										?.count || 0}
								</Td>
								<Td>
									{count?.find((c) => c.city === 'Dallas')
										?.count || 0}
								</Td>

								<Td>
									{count?.reduce(
										(acc, c) => acc + c.count,
										0
									)}
								</Td>
							</Tr>
						</Tbody>
					</Table>
				</Card>
			)}
		</VStack>
	);
}

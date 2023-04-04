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
import React from 'react';
import DatePicker from 'react-datepicker';
import { useForm, Controller } from 'react-hook-form';
import banner from '../pages/banner.jpg';
import 'react-datepicker/dist/react-datepicker.css';
import EmployeeFooter from '../components/Footer/EmployeeFooter';

export default function PatientLookup() {
	const { register, handleSubmit, control } = useForm();

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
			<Card height="50vh" alignSelf="center">
				<CardBody>
					<form
						onSubmit={handleSubmit((data, date) => {
							console.log(date);
							// handleEnteringDates(date);
							alert(JSON.stringify(data, null, 2));
						})}>
						<FormLabel>
							Find appointment frequency at an office
						</FormLabel>

						<HStack spacing={10}>
							<VStack spacing={8}>
								<FormControl>
									<VStack>
										<Card>
											<CardBody>
												<FormLabel>
													Patient Name
												</FormLabel>
												<Input
													width={400}
													type="text"
													placeholder="Enter Patient's Full Name"
													className="patname"
													focusBorderColor="blue.300"
													{...register('patname')}
												/>
											</CardBody>
										</Card>
									</VStack>
								</FormControl>

								<FormControl>
									<VStack>
										<Card>
											<CardBody>
												{' '}
												<FormLabel>
													Doctor Association
												</FormLabel>
												<Input
													width={400}
													type="text"
													placeholder="Enter Doctor's Full Name"
													className="patname"
													focusBorderColor="blue.300"
													{...register('docname')}
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
													dateFormat="MMMM d, yyyy"
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
													dateFormat="MMMM d, yyyy"
													placeholderText="Select a end date"
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
		</VStack>
	);
}

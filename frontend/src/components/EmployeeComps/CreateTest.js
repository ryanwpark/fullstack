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
import { useForm } from 'react-hook-form';
import banner from '../../pages/banner.jpg';
import 'react-datepicker/dist/react-datepicker.css';
import EmployeeFooter from '../Footer/EmployeeFooter';

export default function CreateTest() {
	const { register, handleSubmit } = useForm();

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
							Find the frequency between a patient and doctor
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
							</VStack>
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

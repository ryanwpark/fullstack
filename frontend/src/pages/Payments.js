import React from 'react';
import {
	Input,
	Stack,
	InputGroup,
	InputLeftElement,
	Radio,
	RadioGroup,
	HStack,
	VStack,
	Card,
	CardBody,
	FormControl,
	Box,
} from '@chakra-ui/react';
import { PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import { UilUser, UilHome, UilCreditCard } from '@iconscout/react-unicons';
import { useForm } from 'react-hook-form';
import PatientsFooter from '../components/Footer/PatientsFooter';
import banner from '../pages/banner.jpg';
import axios from 'axios';

function Payments() {
	const { register, handleSubmit } = useForm({});

	const [cctype, setCCtype] = React.useState('');
	const onSubmit = (data) => {
		console.log('DATA:');
		console.log(data);
		axios
			.post('http://localhost:3000/patient/pay', data, {
				headers: { 'Content-Type': 'application/json' },
			})
			.then((response) => {
				console.log('RESPONSE.DATA:');
				console.log(response.data);
			})
			.catch((error) => {
				console.log('ERROR.DATA:');
				console.log(error.data);
			});
	};

	return (
		<VStack
			spacing={4}
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
			<Card alignSelf="center">
				<CardBody>
					<form onSubmit={handleSubmit(onSubmit)}>
						<VStack>
							<HStack spacing={4} align="left">
								<Stack spacing={6} width={400}>
									<InputGroup>
										<InputLeftElement
											pointerEvents="none"
											color="blue.300"
											fontSize="1.2em"
											children="#"
										/>
										<Input
											isrequired="false"
											className="billingid"
											focusBorderColor="blue.300"
											type="number"
											placeholder="Billing ID"
											{...register('invoice_id')}
										/>
									</InputGroup>

									<InputGroup>
										<InputLeftElement
											pointerEvents="none"
											color="blue.300"
											fontSize="1.2em"
											children={<UilUser />}
										/>
										<Input
											type="text"
											className="firstname"
											isrequired="false"
											placeholder="First Name"
											// value={firstname}
											// {...register('firstname')}
										/>
									</InputGroup>

									<InputGroup>
										<InputLeftElement
											pointerEvents="none"
											color="blue.300"
											fontSize="1.2em"
											focusBorderColor="blue.300"
											children={<UilUser />}
										/>
										<Input
											type="text"
											className="lastname"
											isrequired="false"
											// value={lastname}
											placeholder="Last Name"
											// {...register('lastname')}
										/>
									</InputGroup>

									<InputGroup>
										<InputLeftElement
											pointerEvents="none"
											children={
												<EmailIcon color="blue.300" />
											}
										/>
										<Input
											type="email"
											isrequired="false"
											className="emailaddress"
											// value={email}
											focusBorderColor="blue.300"
											placeholder="Email Address"
											// {...register('email')}
										/>
									</InputGroup>

									<InputGroup>
										<InputLeftElement
											pointerEvents="none"
											children={
												<PhoneIcon color="blue.300" />
											}
										/>
										<Input
											type="tel"
											isrequired="false"
											pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
											focusBorderColor="blue.300"
											className="phonenumber"
											placeholder="Phone number [Ex; 123-456-7890]"
											// {...register('phonenumber')}
										/>
									</InputGroup>

									<InputGroup>
										<InputLeftElement
											pointerEvents="none"
											color="blue.300"
											fontSize="1.2em"
											children="$"
										/>
										<Input
											type="number"
											isrequired="false"
											focusBorderColor="blue.300"
											placeholder="Enter amount"
											className="paymenttotal"
											// {...register('paymenttotal')}
										/>
									</InputGroup>

									<InputGroup>
										<InputLeftElement
											pointerEvents="none"
											children={<UilHome />}
											color="blue.300"
										/>
										<Input
											type="text"
											placeholder="Street Address"
											className="streetaddress"
											// value={streetaddress}
											// {...register('streetaddress')}
											focusBorderColor="blue.300"
										/>
									</InputGroup>
								</Stack>

								<Stack spacing={6} width={400}>
									<InputGroup>
										<InputLeftElement
											pointerEvents="none"
											children={<UilHome />}
											color="blue.300"
										/>
										<Input
											type="text"
											placeholder="City"
											className="city"
											// value={city}
											focusBorderColor="blue.300"
											// {...register('city')}
										/>
									</InputGroup>

									<InputGroup>
										<InputLeftElement
											pointerEvents="none"
											children={<UilHome />}
											color="blue.300"
										/>
										<Input
											type="text"
											className="state"
											placeholder="State"
											// value={statelocation}
											focusBorderColor="blue.300"
											// {...register('state')}
										/>
									</InputGroup>

									<InputGroup>
										<InputLeftElement
											pointerEvents="none"
											children={<UilHome />}
											color="blue.300"
										/>
										<Input
											type="number"
											placeholder="Zip code"
											className="zipcode"
											focusBorderColor="blue.300"
											// {...register('zipcode')}
										/>
									</InputGroup>

									<InputGroup>
										<InputLeftElement
											pointerEvents="none"
											children={<UilCreditCard />}
											color="blue.300"
										/>
										<RadioGroup
											paddingLeft={50}
											className="cctype"
											onChange={setCCtype}
											value={cctype}>
											<Stack direction="row">
												<Radio
													size="sm"
													value="visa"
													// {...register('cctype')}
												>
													Visa
												</Radio>
												<Radio
													size="sm"
													value="mastercard"
													// {...register('cctype')}
												>
													Mastercard
												</Radio>
												<Radio
													size="sm"
													value="amex"
													// {...register('cctype')}
												>
													American Express
												</Radio>
												<Radio
													size="sm"
													value="discovery"
													// {...register('cctype')}
												>
													Discovery
												</Radio>
											</Stack>
										</RadioGroup>
									</InputGroup>

									<InputGroup>
										<InputLeftElement
											pointerEvents="none"
											children={<UilCreditCard />}
											color="blue.300"
										/>
										<Input
											type="number"
											isrequired="false"
											className="ccnumber"
											placeholder="Credit Card Number"
											focusBorderColor="blue.300"
											// {...register('ccnumber')}
										/>
									</InputGroup>

									<InputGroup>
										<InputLeftElement
											pointerEvents="none"
											children={<UilCreditCard />}
											color="blue.300"
										/>
										<Input
											type="number"
											isrequired="false"
											className="ccv"
											focusBorderColor="blue.300"
											placeholder="CCV"
											// {...register('ccv')}
										/>
									</InputGroup>

									<InputGroup>
										<InputLeftElement
											pointerEvents="none"
											children={<UilCreditCard />}
											color="blue.300"
										/>
										<Input
											type="month"
											isrequired="false"
											className="expirationdate"
											placeholder="Expiration Date"
											focusBorderColor="blue.300"
											// {...register('expirationdate')}
										/>
									</InputGroup>
								</Stack>
							</HStack>
							<br />
							<br />
							<FormControl width={400} align="center">
								<Input bg="blue.100" type="submit" />
							</FormControl>
						</VStack>
					</form>
				</CardBody>
			</Card>
		</VStack>
	);
}

export default Payments;

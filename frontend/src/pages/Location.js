import React from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	Box,
	Heading,
	Stack,
	StackDivider,
	Text,
	HStack,
	VStack,
} from '@chakra-ui/react';
import banner from '../pages/banner.jpg';

function Location() {
	return (
		<VStack
			style={{
				backgroundImage: `url(${banner})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
			height="90vh"
			spacing={10}>
			<br></br>
			<VStack height="60vh">
				<Card>
					<CardBody bg="blue.100">
						<Box align="center">
							<Card width={270} align="center">
								<CardBody align="center">
									<Heading
										align="center"
										textAlign="center"
										textColor="blue.300"
										size="lg"
										fontSize="30px">
										Visit Us Today!
									</Heading>
								</CardBody>
							</Card>
						</Box>
						<br />

						<HStack spacing={10}>
							<Card width="100%">
								<CardBody>
									<CardHeader>
										<Heading textColor="blue.300" size="md">
											Houston Office
										</Heading>
									</CardHeader>

									<Stack
										divider={<StackDivider />}
										spacing="4">
										<Box>
											<Heading
												size="xs"
												textTransform="uppercase"
												textColor="blue.300">
												Hours of Operation
											</Heading>
											<Text pt="2" fontSize="sm">
												7AM - 6PM
											</Text>
										</Box>
										<Box>
											<Heading
												size="xs"
												textTransform="uppercase"
												textColor="blue.300">
												Office Address
											</Heading>
											<Text pt="2" fontSize="sm">
												301 Milam St, Houston, TX 77002
											</Text>
										</Box>
										<Box>
											<Heading
												size="xs"
												textTransform="uppercase"
												textColor="blue.300">
												Contact Information
											</Heading>
											<Text pt="2" fontSize="sm">
												houstonbloodclinic@bloodclinic.com{' '}
												<br></br>
												281 - 123 - 4567
											</Text>
										</Box>
									</Stack>
								</CardBody>
							</Card>

							<Card width="100%">
								<CardBody>
									<CardHeader>
										<Heading textColor="blue.300" size="md">
											Houston Office
										</Heading>
									</CardHeader>

									<Stack
										divider={<StackDivider />}
										spacing="4">
										<Box>
											<Heading
												size="xs"
												textTransform="uppercase"
												textColor="blue.300">
												Hours of Operation
											</Heading>
											<Text pt="2" fontSize="sm">
												7AM - 6PM
											</Text>
										</Box>
										<Box>
											<Heading
												size="xs"
												textTransform="uppercase"
												textColor="blue.300">
												Office Address
											</Heading>
											<Text pt="2" fontSize="sm">
												301 Milam St, Houston, TX 77002
											</Text>
										</Box>
										<Box>
											<Heading
												size="xs"
												textTransform="uppercase"
												textColor="blue.300">
												Contact Information
											</Heading>
											<Text pt="2" fontSize="sm">
												houstonbloodclinic@bloodclinic.com{' '}
												<br></br>
												281 - 123 - 4567
											</Text>
										</Box>
									</Stack>
								</CardBody>
							</Card>
							<Card width="100%">
								<CardBody>
									<CardHeader>
										<Heading textColor="blue.300" size="md">
											Houston Office
										</Heading>
									</CardHeader>

									<Stack
										divider={<StackDivider />}
										spacing="4">
										<Box>
											<Heading
												size="xs"
												textTransform="uppercase"
												textColor="blue.300">
												Hours of Operation
											</Heading>
											<Text pt="2" fontSize="sm">
												7AM - 6PM
											</Text>
										</Box>
										<Box>
											<Heading
												size="xs"
												textTransform="uppercase"
												textColor="blue.300">
												Office Address
											</Heading>
											<Text pt="2" fontSize="sm">
												301 Milam St, Houston, TX 77002
											</Text>
										</Box>
										<Box>
											<Heading
												size="xs"
												textTransform="uppercase"
												textColor="blue.300">
												Contact Information
											</Heading>
											<Text pt="2" fontSize="sm">
												houstonbloodclinic@bloodclinic.com{' '}
												<br></br>
												281 - 123 - 4567
											</Text>
										</Box>
									</Stack>
								</CardBody>
							</Card>
						</HStack>
					</CardBody>
				</Card>
			</VStack>
		</VStack>
	);
}

export default Location;

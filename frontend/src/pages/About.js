import React from 'react';

import {
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Card,
	CardHeader,
	CardBody,
	Box,
	Heading,
	Stack,
	StackDivider,
	Text,
} from '@chakra-ui/react';
// import DoctorDetails from '../components/DoctorDetails';

export default function About() {
	return (
		<>
			<Tabs
				isFitted
				// variant="enclosed"
				width="fitted"
				align="center"
				justified="center"
				size="center"
				bg="blue.100"
				h="95vh">
				<TabList mb="1em">
					<Tab>Houston</Tab>
					<Tab>Austin </Tab>
					<Tab>Dallas</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<Card width={500} align="center" justify="center">
							<CardHeader>
								<Heading size="md">Houston Office</Heading>
							</CardHeader>

							<CardBody>
								<Stack divider={<StackDivider />} spacing="6">
									<Box>
										<Heading
											size="xs"
											textTransform="uppercase">
											Hours of Operation
										</Heading>
										<Text pt="2" fontSize="sm">
											Monday - Friday 8AM - 6PM
										</Text>
									</Box>
									<Box>
										<Heading
											size="xs"
											textTransform="uppercase">
											Office Address
										</Heading>
										<Text pt="2" fontSize="sm">
											Blah blah Ct, Houston , Texas, 77001
										</Text>
									</Box>
									<Box>
										<Heading
											size="xs"
											textTransform="uppercase">
											Contact Information
										</Heading>
										<Text pt="2" fontSize="sm">
											Email us at
											houstonclinic@medical.com Call us at
											281-111-2020
										</Text>
									</Box>
								</Stack>
							</CardBody>
						</Card>
					</TabPanel>

					<TabPanel>
						<Card width={500} align="center" justify="center">
							<CardHeader>
								<Heading size="md">Austin Office</Heading>
							</CardHeader>

							<CardBody>
								<Stack divider={<StackDivider />} spacing="4">
									<Box>
										<Heading
											size="xs"
											textTransform="uppercase">
											Hours of Operations
										</Heading>
										<Text pt="2" fontSize="sm">
											Monday - Friday 8AM - 6PM
										</Text>
									</Box>
									<Box>
										<Heading
											size="xs"
											textTransform="uppercase">
											Office Address
										</Heading>
										<Text pt="2" fontSize="sm">
											Blah blah Ct, Austin , Texas, 77001
										</Text>
									</Box>
									<Box>
										<Heading
											size="xs"
											textTransform="uppercase">
											Contact Information
										</Heading>
										<Text pt="2" fontSize="sm">
											Email us at austinclinic@medical.com
											Call us at 281-111-2020
										</Text>
									</Box>
								</Stack>
							</CardBody>
						</Card>
					</TabPanel>
					<TabPanel>
						<Card width={500} align="center" justify="center">
							<CardHeader>
								<Heading size="md">Dallas Office</Heading>
							</CardHeader>

							<CardBody>
								<Stack divider={<StackDivider />} spacing="4">
									<Box>
										<Heading
											size="xs"
											textTransform="uppercase">
											Hours of Operation
										</Heading>
										<Text pt="2" fontSize="sm">
											Monday - Friday 8AM - 6PM
										</Text>
									</Box>
									<Box>
										<Heading
											size="xs"
											textTransform="uppercase">
											Office Address
										</Heading>
										<Text pt="2" fontSize="sm">
											Lala st, Dallas, Texas, 70053
										</Text>
									</Box>
									<Box>
										<Heading
											size="xs"
											textTransform="uppercase">
											Contact Information
										</Heading>
										<Text pt="2" fontSize="sm">
											Email us at dallasclinic@medical.com
											<br />
											&nbsp; Call us at 281-111-2020
										</Text>
									</Box>
								</Stack>
							</CardBody>
						</Card>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</>
	);
}

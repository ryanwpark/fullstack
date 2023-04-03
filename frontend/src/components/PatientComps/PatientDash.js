import React from 'react';
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
	TableContainer,
} from '@chakra-ui/react';
import ApptHistory from './ApptHistory';
import BillingTable from './BillingTable';
import BloodTest from './BloodTest';
import MedHistory from './MedHistory';

export default function PatientDash() {
	return (
		<Accordion spacing={6} allowMultiple size="lg">
			<AccordionItem item="patientaccordian">
				<h2>
					<AccordionButton
						_expanded={{ bg: 'blue.400', color: 'white' }}
						bg="blue.100">
						<Box as="span" flex="1" textAlign="left" p={3}>
							Billing History{' '}
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel>
					<TableContainer>
						<BillingTable />
					</TableContainer>
				</AccordionPanel>
			</AccordionItem>

			<AccordionItem item="patientaccordian">
				<h2>
					<AccordionButton
						_expanded={{ bg: 'blue.400', color: 'white' }}
						bg="blue.100">
						<Box as="span" flex="1" textAlign="left" p={3}>
							Blood Test Results{' '}
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel>
					<TableContainer>
						<BloodTest />
					</TableContainer>
				</AccordionPanel>
			</AccordionItem>

			<AccordionItem item="patientaccordian">
				<h2>
					<AccordionButton
						_expanded={{ bg: 'blue.400', color: 'white' }}
						bg="blue.100">
						<Box as="span" flex="1" textAlign="left" p={3}>
							Medical History{' '}
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel>
					<TableContainer>
						<MedHistory />
					</TableContainer>
				</AccordionPanel>
			</AccordionItem>

			<AccordionItem item="apptaccordian">
				<h2>
					<AccordionButton
						_expanded={{ bg: 'blue.400', color: 'white' }}
						bg="blue.100">
						<Box as="span" flex="1" textAlign="left" p={3}>
							Appointment History
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel>
					<TableContainer>
						<ApptHistory />
					</TableContainer>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
}

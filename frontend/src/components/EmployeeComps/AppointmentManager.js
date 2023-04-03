// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Input, VStack, Box, Card, HStack } from '@chakra-ui/react';
// import EmployeeFooter from '../Footer/EmployeeFooter';
// import axios from 'axios';
// import FormikForm from './Formikform';

// export default function AppointmentManager() {
// 	const [apptid, setapptid] = useState('');
// 	const [appt, setappt] = useState([]);
// 	const handleSubmit = () => {
// 		// console.log('My entry:', apptid);
// 		axios
// 			.post('http://localhost:3000/employee/getappt', {
// 				apptid,
// 			})
// 			.then((response) => {
// 				setappt(response.data.results[0]);
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 				setappt([]);
// 			});
// 	};

// 	return (
// 		<VStack spacing={5} align="left">
// 			<EmployeeFooter />
// 			<VStack spacing={10}>
// 				<HStack spacing={10}>
// 					<label>Enter Appointment ID</label>
// 					<Input
// 						width={400}
// 						type="text"
// 						value={apptid}
// 						onChange={(e) => {
// 							setapptid(e.target.value);
// 						}}
// 						placeholder="Enter appointment ID"
// 					/>
// 				</HStack>

// 				<Box paddingLeft={30}>
// 					<Input
// 						width={400}
// 						bg="blue.100"
// 						type="submit"
// 						onClick={handleSubmit}
// 					/>
// 				</Box>
// 			</VStack>
// 			<br />

// 			<FormikForm
// 				appt={appt}
// 				setappt={setappt}
// 				apptid={apptid}
// 				align="center"
// 			/>
// 		</VStack>
// 	);
// }

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, VStack, Box, Card, HStack } from '@chakra-ui/react';
import EmployeeFooter from '../Footer/EmployeeFooter';
import axios from 'axios';
import FormikForm from './Formikform';

export default function AppointmentManager() {
	const [apptid, setapptid] = useState('');
	const [appt, setappt] = useState([]);
	const handleSubmit = () => {
		// console.log('My entry:', apptid);
		axios
			.post('http://localhost:3000/employee/getappt', {
				apptid,
			})
			.then((response) => {
				setappt(response.data.results[0]);
			})
			.catch((error) => {
				console.log(error);
				setappt([]);
			});
	};

	return (
		<div>
			<EmployeeFooter />
			<br />
			<br />
			<VStack spacing={5} align="center" justifyContent="center">
				<VStack spacing={10}>
					<HStack spacing={10}>
						<label>Enter Appointment ID</label>
						<Input
							width={400}
							type="text"
							value={apptid}
							onChange={(e) => {
								setapptid(e.target.value);
							}}
							placeholder="Enter appointment ID"
						/>
					</HStack>

					<Box paddingLeft={30}>
						<Input
							width={400}
							bg="blue.100"
							type="submit"
							onClick={handleSubmit}
						/>
					</Box>
				</VStack>
				<br />

				<FormikForm appt={appt} setappt={setappt} apptid={apptid} />
			</VStack>
		</div>
	);
}

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { VStack, Box } from '@chakra-ui/react';
import PatientsFooter from '../Footer/PatientsFooter';
import PatientUpdateForm from './PatientUpdateForm';
import axios from 'axios';
import banner from '../../pages/banner.jpg';

export default function PatientUpdate() {
	const [myinfo, setmyinfo] = useState();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if (!isLoaded) {
			axios
				.get('http://localhost:3000/patient/getinfo')
				.then((response) => {
					setmyinfo(response.data[0]);
					setIsLoaded(true);
				})
				.catch((error) => {
					console.log(error);
					setmyinfo([]);
				});
		}
	}, [isLoaded]);

	console.log(myinfo);

	return (
		<VStack
			// align="left"
			spacing={6}
			alignItems="center"
			style={{
				backgroundImage: `url(${banner})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
			height="90vh">
			<Box width="100%">
				<PatientsFooter />
			</Box>
			<Box className="container" width={800}>
				<PatientUpdateForm myinfo={myinfo} />
			</Box>
		</VStack>
	);
}

import React, { useState } from 'react';
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			//DEBUGGING
			// const response = await axios.post(
			// 	'http://localhost:3000/login/portal',
			// 	{
			// 		log_username: username,
			// 		log_pass: password,
			// 	}
			// );
			// console.log(response);
			const { data } = await axios.post(
				'http://localhost:3000/login',
				{ username, password }, // Send the JSON body with the username and password properties
				{ headers: { 'Content-Type': 'application/json' } } // Set the 'Content-Type' header to 'application/json'
			);
			console.log('My response.data:');
			// console.log(data);
			if (data.success && data.token === 1) {
				navigate('/patients');
			} else if (data.success && data.token === 2) {
				navigate('/employees');
			} else if (data.success && data.token === 3) {
				navigate('/doctor');
			}

			// navigate('/patients');
		} catch (err) {
			console.log(err);
			setErrorMessage('Invalid username or password');
		}
	};

	return (
		<Flex bg="blue.100" align="center" justify="center" h="95vh">
			<Box bg="white" p={6} rounded="md" w={64}>
				{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
				<form onSubmit={handleLogin}>
					<VStack spacing={4} align="flex-start">
						<FormControl>
							<FormLabel htmlFor="email">Username</FormLabel>
							<Input
								type="text"
								value={username}
								onChange={(event) =>
									setUsername(event.target.value)
								}
							/>
						</FormControl>
						<FormControl>
							<FormLabel htmlFor="password">Password</FormLabel>
							<Input
								type="text"
								value={password}
								onChange={(event) =>
									setPassword(event.target.value)
								}
							/>
							<FormErrorMessage></FormErrorMessage>
						</FormControl>
						<Button type="submit" colorScheme="purple" width="full">
							Login
						</Button>
					</VStack>
				</form>
			</Box>
		</Flex>
	);
}

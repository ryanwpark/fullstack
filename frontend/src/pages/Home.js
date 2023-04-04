import React from 'react';
import {
	Box,
	Heading,
	Text,
	UnorderedList,
	ListItem,
	Button,
	Stack,
} from '@chakra-ui/react';
import bannerImage from './banner.jpg';

function Home() {
	return (
		<Box
			p={8}
			textAlign="center"
			backgroundImage={`url(${bannerImage})`}
			backgroundSize="cover"
			backgroundPosition="center"
			backgroundRepeat="no-repeat"
			color="white"
			height="90vh"
			overflow="hidden">
			<Box
				height={400}
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				backgroundColor="rgba(0,0,0,0.6)"
				padding={10}>
				<Heading as="h1" size="2xl" mb={4}>
					Welcome to Our Medical Clinic
				</Heading>
				<Text fontSize="xl" mb={8}>
					We provide comprehensive medical services to our patients.
				</Text>
				<UnorderedList textAlign="left" fontSize="lg" mb={8}>
					<ListItem>General consultations and check-ups</ListItem>
					<ListItem>Specialist referrals</ListItem>
					<ListItem>Medical tests and screenings</ListItem>
					<ListItem>Immunizations and vaccinations</ListItem>
				</UnorderedList>
				<Stack direction="row" spacing={4} justify="center">
					<Button colorScheme="blue" size="lg">
						<a href="/login">
							Have an account? Login to book an appointment!
						</a>
					</Button>
					<Button colorScheme="blue" size="lg">
						<a href="/location">
							Learn more about how to book an appointment!
						</a>
					</Button>
				</Stack>
			</Box>
		</Box>
	);
}

export default Home;

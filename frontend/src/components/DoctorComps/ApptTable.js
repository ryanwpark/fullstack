import React, { Component } from 'react';
import { Table, Tbody, Tr, Td, Th } from '@chakra-ui/react';

class ApptTable extends Component {
	state = {
		data: [],
	};

	componentDidMount() {
		this.fetchData()
			.then(({ data }) => this.setState({ data }))
			.catch((err) => console.log(err));
	}

	fetchData = () => {
		return fetch('/doctor')
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((data) => {
				console.log('API Response:', data);
				return { data };
			})
			.catch((error) => {
				console.error('API Error:', error);
				return { data: [] }; // return empty array if there's an error
			});
	};

	render() {
		return (
			<Table variant="striped" colorScheme="blue">
				<Th>Time</Th>
				<Th>Location</Th>
				<Th>Patient Name</Th>
				<Tbody>
					{this.state.data.map((person) => (
						<Tr key={person.id}>
							<Td>{person.patname}</Td>
							<Td>{person.age}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		);
	}
}

export default ApptTable;

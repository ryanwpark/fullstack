import React, { useState, useEffect } from 'react';
import { Table, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';

export default function BillingTable() {
	const [MyInvoices, setMyInvoices] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:3000/patient/billing/history')
			.then((response) => {
				console.log('MY RESPONSE');
				console.log(response);
				setMyInvoices(response.data);
			})
			.catch((error) => {
				// console.log('error from location.js');
				console.log(error);
			});
	}, []);

	return (
		<Table variant="striped" colorScheme="blue">
			<Tbody>
				<Th>Date</Th>
				<Th>Cost $</Th>

				<Th>Payment Method</Th>
				<Th>Payment status</Th>
				<Th>Insurance</Th>
				<Th>Insurance Discount</Th>
				{MyInvoices?.map((invoice) => (
					<Tr key={invoice.invoice_id}>
						<Td>{invoice.date_created}</Td>
						<Td>{invoice.cost}</Td>
						<Td>{invoice.payment_method}</Td>
						<Td>{invoice.isPaid ? 'Paid' : 'Not Paid'}</Td>
						<Td>{invoice.isInsured ? 'Covered' : 'Not Covered'}</Td>
						<Td>
							{invoice.insurance_discount
								? 'Covered'
								: 'Not Covered'}
						</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	);
}

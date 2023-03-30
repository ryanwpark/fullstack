import React from 'react';
import { Table, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const Row = (props) => {
	const { billingid, paymentamount, paymenttype, date } = props;
	return (
		<Tr>
			<Td>{billingid}</Td>
			<Td>{paymentamount}</Td>
			<Td>{paymenttype}</Td>
			<Td>{date}</Td>
		</Tr>
	);
};

const BillingTable = (props) => {
	const { data } = props;
	return (
		<Table variant="striped" colorScheme="blue">
			<Th>Billing ID</Th>
			<Th>Payment Amount in Dollars $</Th>
			<Th>Payment Type</Th>
			<Th>Date</Th>
			<Tbody>
				{data.map((row, index) => (
					<Row
						// eslint-disable-next-line
						key={'key -${index}'}
						billingid={row.billingid}
						paymentamount={row.paymentamount}
						paymenttype={row.paymenttype}
						date={row.date}
					/>
				))}
			</Tbody>
		</Table>
	);
};

export default BillingTable;

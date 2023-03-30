import React, { useState } from 'react';
import FormikForm from '../PatientComps/Formikform';
import 'bootstrap/dist/css/bootstrap.min.css';
import { VStack } from '@chakra-ui/react';
import EmployeeFooter from '../Footer/EmployeeFooter';

export default function AppointmentManager() {
	const [fields, updateFields] = useState({
		name: 'Admin',
		email: 'admin@example.com',
		mobile_no: '012345678',
	});

	return (
		<VStack align="left">
			<EmployeeFooter />
			<div className="container">
				<FormikForm fields={fields} updateFields={updateFields} />
			</div>
		</VStack>
	);
}

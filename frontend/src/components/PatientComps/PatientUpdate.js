import React, { useState } from 'react';
import FormikForm from '../PatientComps/Formikform';
import 'bootstrap/dist/css/bootstrap.min.css';
import { VStack } from '@chakra-ui/react';
import PatientsFooter from '../Footer/PatientsFooter';

export default function AppointmentManager() {
	const [fields, updateFields] = useState([]);
	return (
		<VStack align="left">
			<PatientsFooter />
			<div className="container">
				<FormikForm fields={fields} updateFields={updateFields} />
			</div>
		</VStack>
	);
}

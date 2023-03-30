import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Location from './pages/Location';
import About from './pages/About';
import Payments from './pages/Payments';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './pages/Login';
import Appointments from './pages/Appointments';
import Patients from './pages/Patients';
import Doctor from './Doctor';
import Employees from './pages/Employees';
import DoctorPrevAppt from './components/DoctorComps/DoctorPrevAppt';
import AppointmentManager from './components/EmployeeComps/AppointmentManager';
import PatientUpdate from './components/PatientComps/PatientUpdate';
import PatientLookup from './pages/PatientLookup';

function App() {
	let Component;
	switch (window.location.pathname) {
		default:
			Component = <Home />;
			break;
		case '/':
			Component = <Home />;
			break;
		case '/payments':
			Component = <Payments />;
			break;
		case '/patients':
			Component = <Patients />;
			break;
		case '/location':
			Component = <Location />;
			break;
		case '/about':
			Component = <About />;
			break;
		case '/login':
			Component = <Login />;
			break;
		case '/appointments':
			Component = <Appointments />;
			break;
		case '/doctor':
			Component = <Doctor />;
			break;
		case '/employees':
			Component = <Employees />;
			break;
		case '/doctorprevappt':
			Component = <DoctorPrevAppt />;
			break;
		case '/appointmentmanager':
			Component = <AppointmentManager />;
			break;
		case '/patientupdate':
			Component = <PatientUpdate />;
			break;
		case '/patientlookup':
			Component = <PatientLookup />;
			break;
	}

	return (
		<ChakraProvider>
			<Footer sticky="top" />
			{Component}
		</ChakraProvider>
	);
}

export default App;

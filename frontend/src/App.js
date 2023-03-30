import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import CreateTest from './components/EmployeeComps/CreateTest';

function App() {
	return (
		<div>
			<ChakraProvider>
				<Footer sticky="top" />
				<BrowserRouter>
					<Routes>
						<Route exact path="/" element={<Home />}></Route>
						<Route exact path="/payments" element={<Payments />} />
						<Route exact path="/patients" element={<Patients />} />
						<Route exact path="/location" element={<Location />} />
						<Route exact path="/about" element={<About />} />
						<Route
							exact
							path="/createtest"
							element={<CreateTest />}
						/>
						<Route exact path="/login" element={<Login />} />
						<Route
							exact
							path="/appointments"
							element={<Appointments />}
						/>
						<Route exact path="/doctor" element={<Doctor />} />
						<Route
							exact
							path="/employees"
							element={<Employees />}
						/>
						<Route
							exact
							path="/doctorprevappt"
							element={<DoctorPrevAppt />}
						/>
						<Route
							exact
							path="/appointmentmanager"
							element={<AppointmentManager />}
						/>
						<Route
							exact
							path="/patientupdate"
							element={<PatientUpdate />}
						/>
						<Route
							exact
							path="/patientlookup"
							element={<PatientLookup />}
						/>
					</Routes>
				</BrowserRouter>
			</ChakraProvider>
		</div>
	);
}

export default App;

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';

export default function DoctorPrevAppt() {
	return (
		<Navbar bg="primary" variant="dark" expand="sm">
			<Container>
				<Navbar.Brand href="/doctor" color="blue.300">
					Welcome Back, Dr.Smith
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/doctorprevappt">
							Appointment History
						</Nav.Link>
						<Nav.Link href="/doctor/patientreport">
							Patient Report
						</Nav.Link>
						<Nav.Link href="/doctor/editpatients">
							Manage Patients
						</Nav.Link>
						<Nav.Link href="/doctor/datareport">
							Blood Test Reports
						</Nav.Link>
						<Nav.Link href="/doctor/createpresc">
							Create Prescription
						</Nav.Link>
						<Nav.Link href="/">Logout</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

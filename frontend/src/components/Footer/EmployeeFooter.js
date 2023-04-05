import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React from 'react';

export default function EmployeeFooter() {
	return (
		<Navbar bg="primary" variant="dark" expand="sm">
			<Container>
				<Navbar.Brand href="/employees" color="blue.300">
					Welcome Back, Employee
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/appointmentmanager">
							Manage Appointments
						</Nav.Link>
						<Nav.Link href="/patientlookup">
							Patient Look-Up
						</Nav.Link>
						<Nav.Link href="/">Logout</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

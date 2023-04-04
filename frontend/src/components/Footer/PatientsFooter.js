import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';

export default function PatientsFooter() {
	// const [patname, setPatname] = useState('lalala');

	return (
		<Navbar bg="primary" variant="dark" expand="sm">
			<Container>
				<Navbar.Brand href="/patients" color="blue.300">
					Welcome Back to BlueCross!
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/payments">Pay Bill</Nav.Link>
						<Nav.Link href="/appointments">
							Book Appointment
						</Nav.Link>
						<Nav.Link href="/patientupdate">
							Update Information
						</Nav.Link>
						<Nav.Link href="/">Logout</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

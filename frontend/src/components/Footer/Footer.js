import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';

function Footer() {
	return (
		<Navbar style={{ backgroundColor: '##123456' }} expand="lg">
			<Container>
				<Navbar.Brand href="/">Medical Clinic</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/location">Locations</Nav.Link>
						<Nav.Link href="/patients">Patients</Nav.Link>
						<Nav.Link href="/doctor">Doctors</Nav.Link>
						<Nav.Link href="/employees">Employees</Nav.Link>
						{/* <Nav.Link href="/about">About Us</Nav.Link> */}
						<Nav.Link href="/login">Login</Nav.Link>
						{/* <Nav.Link href="/appointments">Appointments</Nav.Link> */}
						{/* <NavDropdown
							title="Current Patients"
							id="basic-nav-dropdown">
							<NavDropdown.Item href="/payments">
								Payments
							</NavDropdown.Item>
							<NavDropdown.Item href="/login">
								Login
							</NavDropdown.Item>
							<NavDropdown.Item href="/">
								Prescription Refill Information
							</NavDropdown.Item>
							<NavDropdown.Item href="/">
								more bs info
							</NavDropdown.Item>
						</NavDropdown> */}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Footer;

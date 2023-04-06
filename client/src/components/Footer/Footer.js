import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';

function Footer() {
	return (
		<Navbar style={{ backgroundColor: '##123456' }} expand="lg">
			<Container>
				<Navbar.Brand href="/">Blue Cross Medical</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/location">Locations</Nav.Link>
						{/* <Nav.Link href="/patients">Patients</Nav.Link>
						<Nav.Link href="/doctor">Doctors</Nav.Link>
						<Nav.Link href="/employees">Employees</Nav.Link> */}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Footer;

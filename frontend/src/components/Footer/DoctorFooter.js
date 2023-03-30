import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';

export default function DoctorPrevAppt() {
	const [docname, setDocname] = React.useState('smarty');
	return (
		<Navbar bg="primary" variant="dark" expand="sm">
			<Container>
				<Navbar.Brand href="/doctor" color="blue.300">
					Welcome Back, {docname}
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/doctorprevappt">
							Previous Appointments
						</Nav.Link>
						<Nav.Link href="/docpatientupdate">
							DATA REPORT FOR DOCTORS TO SEE PATIENTS, find
							patietns by name and see data
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

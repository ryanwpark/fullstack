import React, { Component } from 'react';
import { withFormik, Form, Field } from 'formik';
import { Card, Button, Stack, CardBody, Text, Heading } from '@chakra-ui/react';
import axios from 'axios';

const form_id = 'form_id';

class MaintenanceForm extends Component {
	editOnClick = (event) => {
		event.preventDefault();
		const data = !this?.props?.status?.edit;
		this.props.setStatus({
			edit: data,
		});
	};

	cancelOnClick = (event) => {
		event.preventDefault();
		this.props.resetForm();
		this.props.setStatus({
			edit: false,
		});
	};

	_renderAction() {
		return (
			<React.Fragment>
				<div className="form-statusbar">
					{this?.props?.status?.edit ? (
						<React.Fragment>
							<Button
								colorScheme="green"
								className="btn btn-primary btn-sm"
								type="submit"
								form={form_id}>
								Save
							</Button>
							<Button
								colorScheme="red"
								className="btn btn-danger btn-sm"
								onClick={this.cancelOnClick}
								style={{ marginLeft: '8px' }}>
								Cancel
							</Button>
						</React.Fragment>
					) : (
						<Button
							colorScheme="blue"
							className="btn btn-primary btn-sm"
							onClick={this.editOnClick}>
							Edit
						</Button>
					)}
				</div>
			</React.Fragment>
		);
	}

	_renderFormView = () => {
		return (
			<React.Fragment>
				<Card colorScheme="blue" width={800}>
					<Stack>
						<CardBody colorScheme="blue">
							<Heading size="md">
								VIEWING Appointment Information
							</Heading>
							<div>
								<div className="form-group row">
									<label className="col-sm-2 col-form-label">
										Date
									</label>
									<div className="col-sm-10">
										<Field
											type="text"
											name="date"
											className="form-control"
											readOnly
										/>
									</div>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Time
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="time"
										className="form-control"
										readOnly
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Location
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="location"
										className="form-control"
										readOnly
										style={{ color: 'black' }}
									/>
								</div>
							</div>
						</CardBody>
					</Stack>
				</Card>
			</React.Fragment>
		);
	};

	_renderFormInput = () => {
		return (
			<React.Fragment>
				<Card width={800}>
					<Stack>
						<CardBody>
							<Heading size="md">
								EDITING Appointment Information
							</Heading>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Date
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="date"
										className="form-control"
										placeholder="YYYY-MM-DD"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Time
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="time"
										className="form-control"
										placeholder="HH:MM:SS"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Location
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="location"
										className="form-control"
										placeholder="Houston(1) Dallas(2) Austin(3)"
									/>
								</div>
							</div>
						</CardBody>
					</Stack>
				</Card>
			</React.Fragment>
		);
	};

	render() {
		return (
			<React.Fragment>
				<Card colorScheme="blue">
					<Stack>
						<CardBody colorScheme="blue">
							<Form id={form_id}>
								<Text size="sm">
									{this?.props?.status?.edit
										? this._renderFormInput()
										: this._renderFormView()}
								</Text>
							</Form>
							<br></br>
							{this._renderAction()}
						</CardBody>
					</Stack>
				</Card>
			</React.Fragment>
		);
	}
}

const FormikForm = withFormik({
	mapPropsToStatus: (props) => {
		return {
			edit: props?.edit || false,
		};
	},
	mapPropsToValues: (props) => {
		const { appt, apptid } = props;
		// console.log('myProps:', appt);
		return {
			location: appt?.appt_office_id || '',
			date: appt?.appt_date?.slice(0, 10) || '',
			time: appt?.appt_time || '',
			apptid: apptid || '',
		};
	},
	enableReinitialize: true,
	handleSubmit: (values, { props, ...actions }) => {
		axios
			.post('http://localhost:8000/employee/editappt', { values })
			.then((response) => {
				console.log(response.data.message);
				alert(response.data.message);
			})
			.catch((error) => {
				console.log(error);
				// setmessage('Sorry, that appointmentID is incorrect');
			});
		console.log('submitting', values);
		props.setappt(values);
		actions.setStatus({
			edit: false,
		});
	},
})(MaintenanceForm);

export default FormikForm;

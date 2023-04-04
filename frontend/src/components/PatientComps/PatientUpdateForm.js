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
				<div className="form-statusbar" alignSelf="center">
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
				<Card colorScheme="blue" width={800} alignSelf="center">
					<CardBody colorScheme="blue">
						<Stack>
							<Heading size="md">
								VIEWING Personal Information
							</Heading>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									First Name
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="first"
										className="form-control"
										readOnly
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Last Name
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="last"
										className="form-control"
										readOnly
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									City
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="city"
										className="form-control"
										readOnly
									/>
								</div>
							</div>

							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									State
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="state"
										className="form-control"
										readOnly
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Street Address
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="address"
										className="form-control"
										readOnly
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Zip Code
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="zipcode"
										className="form-control"
										readOnly
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Email Address
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="email"
										className="form-control"
										readOnly
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Phone Number
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="phone"
										className="form-control"
										readOnly
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Insurance Policy Number
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="inspolicy"
										className="form-control"
										readOnly
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Insurance Policy Provider
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="insprovider"
										className="form-control"
										readOnly
									/>
								</div>
							</div>
						</Stack>
					</CardBody>
				</Card>
			</React.Fragment>
		);
	};

	_renderFormInput = () => {
		return (
			<React.Fragment>
				<Card width={800} alignSelf="center">
					<Stack>
						<CardBody>
							<Heading size="md">
								EDITING Personal Information
							</Heading>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									First Name
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="first"
										className="form-control"
										placeholder="Enter your new First Name"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Last Name
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="last"
										className="form-control"
										placeholder="Enter your new Last Name"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									City
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="city"
										className="form-control"
										placeholder="Enter your new City"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									State
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="state"
										className="form-control"
										placeholder="Enter State Initials"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Street Address
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="address"
										className="form-control"
										placeholder="Enter your new address"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Zip Code
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="zipcode"
										className="form-control"
										placeholder="Enter your new zipcode"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Email Address
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="email"
										className="form-control"
										placeholder="Enter your new email"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Phone Number
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="phone"
										className="form-control"
										// placeholder="Enter your new address"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Insurance Policy Number
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="inspolicy"
										className="form-control"
										// placeholder=""
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Insurance Policy Provider
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="insprovider"
										className="form-control"
										// placeholder="Enter your new address"
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
				<Stack colorScheme="blue" width={800} alignSelf="center">
					<Form id={form_id}>
						<Text size="sm">
							{this?.props?.status?.edit
								? this._renderFormInput()
								: this._renderFormView()}
						</Text>
					</Form>
					{this._renderAction()}
				</Stack>
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
		const { myinfo } = props;
		// console.log('myProps:', appt);
		return {
			first: myinfo?.patient_first_name || '',
			last: myinfo?.patient_last_name || '',
			city: myinfo?.city || '',
			state: myinfo?.state || '',
			zipcode: myinfo?.zip || '',
			address: myinfo?.patient_address || '',
			email: myinfo?.patient_email || '',
			inspolicy: myinfo?.insurance_policy_number || '',
			insprovider: myinfo?.insurance_provider || '',
			phone: myinfo?.patient_phone_num || '',
		};
	},
	enableReinitialize: true,
	handleSubmit: (values, { props, ...actions }) => {
		axios
			.post('http://localhost:3000/patient/editinfo', { values })
			.then((response) => {
				console.log('myresponse:', response.data.message);
				alert(response.data.message);
			})
			.catch((error) => {
				console.log(error);
				// setmessage('Sorry, that appointmentID is incorrect');
			});
		actions.setStatus({
			edit: false,
		});
	},
})(MaintenanceForm);

export default FormikForm;

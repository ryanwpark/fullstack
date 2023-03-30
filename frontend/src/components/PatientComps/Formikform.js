import React, { Component } from 'react';
import { withFormik, Form, Field } from 'formik';
import { Card, Button, Stack, CardBody, Text, Heading } from '@chakra-ui/react';

const form_id = 'form_id';

const mock = [
	{
		patname: 'Johnny Appleseed',
		email: 'admin@example.com',
		mobileno: '9012345678',
		streetaddress: '4604 Calhoun Road',
		city: 'Houston',
		state: 'Texas',
		zipcode: '77002',
		insuranceprovider: 'Red Cross',
		policynumber: '12345678910',
	},
];

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
				<Card colorScheme="blue">
					<Stack>
						<CardBody colorScheme="blue">
							<Heading size="md">Personal Information</Heading>
							<div>
								<div className="form-group row">
									<Text className="col-sm-2 col-form-label">
										Name
									</Text>
									<div className="col-sm-10">
										<Text
											type="text"
											name="name"
											className="form-control">
											{this?.props?.fields?.name}
										</Text>
									</div>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Email
								</label>
								<div className="col-sm-10">
									<label
										type="email"
										name="brand_name"
										className="form-control">
										{this?.props?.fields?.email}
									</label>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Mobile No
								</label>
								<div className="col-sm-10">
									<label
										type="number"
										name="device_type"
										className="form-control">
										{this?.props?.fields?.mobile_no}
									</label>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Street Address
								</label>
								<div className="col-sm-10">
									<label
										type="text"
										name="streetaddress"
										className="form-control">
										{this?.props?.fields?.streetaddress}
									</label>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									City
								</label>
								<div className="col-sm-10">
									<label
										type="text"
										name="city"
										className="form-control">
										{this?.props?.fields?.city}
									</label>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									State
								</label>
								<div className="col-sm-10">
									<label
										type="text"
										name="state"
										className="form-control">
										{this?.props?.fields?.state}
									</label>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Zip Code
								</label>
								<div className="col-sm-10">
									<label
										type="number"
										name="zipcode"
										className="form-control">
										{this?.props?.fields?.zipcode}
									</label>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Insurance Provider
								</label>
								<div className="col-sm-10">
									<label
										type="text"
										name="insuranceprovider"
										className="form-control">
										{this?.props?.fields?.insuranceprovider}
									</label>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Policy Number
								</label>
								<div className="col-sm-10">
									<label
										type="number"
										name="policynumber"
										className="form-control">
										{this?.props?.fields?.policynumber}
									</label>
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
				<Card>
					<Stack>
						<CardBody>
							<Heading size="md">Appointments</Heading>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Name
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="name"
										className="form-control"
										placeholder="Name"
										disabled={this.props.status.edit}
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Email
								</label>
								<div className="col-sm-10">
									<Field
										type="email"
										name="email"
										className="form-control"
										placeholder="Email"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Mobile No
								</label>
								<div className="col-sm-10">
									<Field
										type="number"
										name="mobile_no"
										className="form-control"
										placeholder="Mobile No"
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
										name="streetaddress"
										className="form-control"
										placeholder="
										Street Address"
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
										placeholder="City"
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
										placeholder="State"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Zip Code
								</label>
								<div className="col-sm-10">
									<Field
										type="number"
										name="zipcode"
										className="form-control"
										placeholder="Zip Code"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Insurance Provider
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="insuranceprovider"
										className="form-control"
										placeholder="Insurance Provider"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Policy Number
								</label>
								<div className="col-sm-10">
									<Field
										type="number"
										name="policynumber"
										className="form-control"
										placeholder="Insurance Policy Number"
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
		return {
			name: props.fields.name,
			email: props.fields.email,
			mobile_no: props.fields.mobile_no,
		};
	},
	enableReinitialize: true,
	handleSubmit: (values, { props, ...actions }) => {
		props.updateFields(values);
		actions.setStatus({
			edit: false,
		});
	},
})(MaintenanceForm);

export default FormikForm;

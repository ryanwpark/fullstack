import React, { Component } from 'react';
import { withFormik, Form, Field } from 'formik';
import {
	Card,
	Button,
	Stack,
	CardBody,
	Text,
	Heading,
	Radio,
	RadioGroup,
} from '@chakra-ui/react';
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
								colo="green"
								className="btn btn-primary btn-sm"
								type="submit"
								form={form_id}>
								Save
							</Button>
							<Button
								color="red"
								className="btn btn-danger btn-sm"
								onClick={this.cancelOnClick}
								style={{ marginLeft: '8px' }}>
								Cancel
							</Button>
						</React.Fragment>
					) : (
						<Button
							color="blue"
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
				{/* {this.props.values.smoker === '0' && <Text>TEST</Text>} */}
				<Card width={800}>
					<CardBody>
						<Stack>
							<Heading size="md">VIEWING Medical History</Heading>

							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Smoker
								</label>
								<div className="col-sm-10">
									<RadioGroup
										name="smoker"
										defaultValue={this.props.values.smoker}>
										<Stack direction="row">
											<Radio
												value="1"
												name="smoker"
												isDisabled={true}
												checked={
													this.props.values.smoker ===
													1
												}>
												True
											</Radio>
											<Radio
												value="0"
												name="smoker"
												isDisabled={true}
												checked={
													this.props.values.smoker ===
													'0'
												}>
												False
											</Radio>
										</Stack>
									</RadioGroup>
								</div>
							</div>

							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Heart Diseases
								</label>
								<div className="col-sm-10">
									<RadioGroup
										name="heart"
										defaultValue={this.props.values.heart}>
										<Stack direction="row">
											<Radio
												value="1"
												isDisabled={true}
												checked={
													this.props.values.heart ===
													1
												}>
												True
											</Radio>
											<Radio
												value="0"
												isDisabled={true}
												checked={
													this.props.values.heart ===
													'0'
												}>
												False
											</Radio>
										</Stack>
									</RadioGroup>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Diabetes
								</label>
								<div className="col-sm-10">
									<RadioGroup
										name="diabetes"
										defaultValue={
											this.props.values.diabetes
										}>
										<Stack direction="row">
											<Radio
												value="1"
												isDisabled={true}
												checked={
													this.props.values
														.diabetes === '1'
												}>
												Yes
											</Radio>
											<Radio
												value="0"
												isDisabled={true}
												checked={
													this.props.values
														.diabetes === '0'
												}>
												No
											</Radio>
										</Stack>
									</RadioGroup>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Cancer
								</label>
								<div className="col-sm-10">
									<RadioGroup
										name="cancer"
										defaultValue={this.props.values.cancer}>
										<Stack direction="row">
											<Radio
												value="1"
												isDisabled={true}
												checked={
													this.props.values.cancer ===
													'1'
												}>
												True
											</Radio>
											<Radio
												value="0"
												isDisabled={true}
												checked={
													this.props.values.cancer ===
													'0'
												}>
												False
											</Radio>
										</Stack>
									</RadioGroup>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Pregnant
								</label>
								<div className="col-sm-10">
									<RadioGroup
										name="cancer"
										defaultValue={
											this.props.values.pregnant
										}>
										<Stack direction="row">
											<Radio
												value="1"
												isDisabled={true}
												checked={
													this.props.values
														.pregnant === '1'
												}>
												True
											</Radio>
											<Radio
												value="0"
												isDisabled={true}
												checked={
													this.props.values
														.pregnant === '0'
												}>
												False
											</Radio>
										</Stack>
									</RadioGroup>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Current Medications
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="meds"
										className="form-control"
										readOnly
										style={{ color: 'black' }}
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
				<Card width={800}>
					<CardBody>
						<Stack>
							<Heading size="md">EDITING Medical History</Heading>

							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Smoker
								</label>
								<div className="col-sm-10">
									<RadioGroup
										name="smoker"
										onChange={(e) =>
											(this.props.values.smoker = e)
										}>
										<Stack direction="row">
											<Radio value="1">Yes</Radio>
											<Radio value="0">No</Radio>
										</Stack>
									</RadioGroup>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Heart Disease
								</label>
								<div className="col-sm-10">
									<RadioGroup
										name="heart"
										onChange={(e) =>
											(this.props.values.heart = e)
										}>
										<Stack direction="row">
											<Radio value="1">Yes</Radio>
											<Radio value="0">No</Radio>
										</Stack>
									</RadioGroup>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Diabetes
								</label>
								<div className="col-sm-10">
									<RadioGroup
										name="diabetes"
										onChange={(e) =>
											(this.props.values.diabetes = e)
										}>
										<Stack direction="row">
											<Radio value="1">Yes</Radio>
											<Radio value="0">No</Radio>
										</Stack>
									</RadioGroup>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Cancer
								</label>
								<div className="col-sm-10">
									<RadioGroup
										name="cancer"
										onChange={(e) =>
											(this.props.values.cancer = e)
										}>
										<Stack direction="row">
											<Radio value="1">Yes</Radio>
											<Radio value="0">No</Radio>
										</Stack>
									</RadioGroup>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Pregnant Status
								</label>
								<div className="col-sm-10">
									<RadioGroup
										name="pregnant"
										onChange={(e) =>
											(this.props.values.pregnant = e)
										}>
										<Stack direction="row">
											<Radio value="1">Yes</Radio>
											<Radio value="0">No</Radio>
										</Stack>
									</RadioGroup>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Current Medications
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="meds"
										className="form-control"
										placeholder="Patient Medications"
									/>
								</div>
							</div>
						</Stack>
					</CardBody>
				</Card>
			</React.Fragment>
		);
	};

	render() {
		return (
			<React.Fragment>
				<Card color="blue">
					<Stack>
						<CardBody color="blue">
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
		// console.log('Props:', props);
		return {
			edit: props?.edit || false,
		};
	},
	mapPropsToValues: (props) => {
		const { info, patid } = props;
		// console.log('Passed Info:', info[0]);
		return {
			smoker: info[0]?.med_h_smoker + '' || '0',
			heart: info[0]?.med_h_heart_disease + '' || '0',
			diabetes: info[0]?.med_h_diabetes + '' || '0',
			cancer: info[0]?.med_h_cancer + '' || '0',
			pregnant: info[0]?.med_h_pregnant + '' || '0',
			meds: info[0]?.med_h_current_meds + '' || '0',
			patid: patid || '',
		};
	},
	enableReinitialize: true,
	handleSubmit: (values, { props, ...actions }) => {
		console.log('values:', values);
		// console.log('myVal:', smoke);
		axios
			.post(
				'https://medical-clinc-backend.herokuapp.com/doctor/setpatientinfo',
				{ values }
			)
			.then((response) => {
				// console.log(response);
				alert(response.data.message);
			})
			.catch((error) => {
				console.log(error);
				alert('Sorry, there was an error');
			});
		// console.log('submitting', values);
		props.setmyinfo(values);
		actions.setStatus({
			edit: false,
		});
	},
})(MaintenanceForm);

export default FormikForm;

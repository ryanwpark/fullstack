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
				<Card width={800}>
					<Stack>
						<CardBody>
							<Heading size="md">VIEWING Medical History</Heading>

							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Smoker
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="smoker"
										className="form-control"
										readOnly
									/>
								</div>
							</div>

							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Heart Diseases
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="heart"
										className="form-control"
										readOnly
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Diabetes
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="diabetes"
										className="form-control"
										readOnly
										style={{ color: 'black' }}
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Cancer
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="cancer"
										className="form-control"
										readOnly
										style={{ color: 'black' }}
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Preganant Status
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="pregnant"
										className="form-control"
										readOnly
										style={{ color: 'black' }}
									/>
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
							<Heading size="md">EDITING Medical History</Heading>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Smoker
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="smoker"
										className="form-control"
										placeholder="1-True : 0-False"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Heart Disease
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="heart"
										className="form-control"
										placeholder="1-True : 0-False"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Diabetes
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="diabetes"
										className="form-control"
										placeholder="1-True : 0-False"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Cancer
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="cancer"
										className="form-control"
										placeholder="1-True : 0-False"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label className="col-sm-2 col-form-label">
									Pregnant Status
								</label>
								<div className="col-sm-10">
									<Field
										type="text"
										name="pregnant"
										className="form-control"
										placeholder="1-True : 0-False"
									/>
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
										placeholder="1-True : 0-False"
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
		return {
			edit: props?.edit || false,
		};
	},
	mapPropsToValues: (props) => {
		const { info, patid } = props;
		console.log('passedinfo:', info[0]);
		// console.log('myProps:', appt);
		return {
			smoker: info[0]?.med_h_smoker || '0',
			heart: info[0]?.med_h_heart_disease || '0',
			diabetes: info[0]?.med_h_diabetes || '0',
			cancer: info[0]?.med_h_cancer || '0',
			pregnant: info[0]?.med_h_pregnant || '0',
			meds: info[0]?.med_h_current_meds || '0',
			patid: patid || '',
		};
	},
	enableReinitialize: true,
	handleSubmit: (values, { props, ...actions }) => {
		axios
			.post(
				'https://medical-clinic-main.herokuapp.com/doctor/setpatientinfo',
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
		console.log('submitting', values);
		props.setmyinfo(values);
		actions.setStatus({
			edit: false,
		});
	},
})(MaintenanceForm);

export default FormikForm;

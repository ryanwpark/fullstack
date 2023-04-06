const http = require('http');
const url = require('url');
const db = require('./db');
const login_data = require('./users');
const fs = require('fs');
const users = require('./users');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { start } = require('repl');
dotenv.config();
process.env.TOKEN_SECRET;

function generateAccessToken(username) {
	return jwt.sign({ username }, process.env.TOKEN_SECRET, {
		expiresIn: '10',
	});
}

const server = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url, true);
	const path = parsedUrl.pathname;
	const method = req.method;
	if (path === '/login/test' && method === 'POST') {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const data = JSON.parse(body);
			const username = data.username;
			const password = data.password;
			res.writeHead(200, {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Max-Age': 86400, // 24 hours
			});
			db.authenticateUser(username, password, (err, user) => {
				if (err) {
					res.statusCode = 500;
					res.end(
						JSON.stringify({ message: 'Internal Server Error' })
					);
				} else if (!user) {
					res.statusCode = 401;
					res.end(
						JSON.stringify({
							message: 'Invalid username or password',
						})
					);
				} else {
					// console.log('user?:', user);
					const token = generateAccessToken(user);
					res.statusCode = 200;
					// const roleAuth = user.RowDataPacket.role;
					res.end(
						JSON.stringify({ token, username, role: user.role })
					);
				}
			});
		});
	} else if (path === '/doctor/averageblood' && method === 'POST') {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const data = JSON.parse(body);
			// console.log('data:', data);
			const start = data.start;
			const end = data.end;
			// const location = data.location;
			res.writeHead(200, {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Max-Age': 86400, // 24 hours
			});
			// console.log('start:', start, '   end:', end);
			if (start != '' && end != '') {
				db.getBloodTestDReverything(start, end, (err, results) => {
					// console.log('Calling Everything');
					if (err) {
						res.statusCode = 500;
						res.end(
							JSON.stringify({ message: 'Internal Server Error' })
						);
					} else {
						res.statusCode = 200;
						res.end(JSON.stringify({ results }));
					}
				});
			} else if (end === '' && start != '') {
				db.getBloodTestDRnoEnd(start, (err, results) => {
					// console.log('Calling noEnd');
					if (err) {
						res.statusCode = 500;
						res.end(
							JSON.stringify({ message: 'Internal Server Error' })
						);
					} else {
						res.statusCode = 200;
						res.end(JSON.stringify({ results }));
					}
				});
			} else if (end === '' && start === '') {
				db.getBloodTestDRnothing((err, results) => {
					// console.log('Calling nothing');
					if (err) {
						res.statusCode = 500;
						res.end(
							JSON.stringify({ message: 'Internal Server Error' })
						);
					} else {
						res.statusCode = 200;
						res.end(JSON.stringify({ results }));
					}
				});
			} else if (end != '' && start === '') {
				db.getBloodTestDRnoStart(end, (err, results) => {
					// console.log('Calling noStart');
					if (err) {
						res.statusCode = 500;
						res.end(
							JSON.stringify({ message: 'Internal Server Error' })
						);
					} else {
						res.statusCode = 200;
						res.end(JSON.stringify({ results }));
					}
				});
			}
		});
	} else if (path === '/doctor/setpatientinfo' && method === 'POST') {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const data = JSON.parse(body);
			console.log('data:', data);
			const smoker = data.values.smoker;
			const heart = data.values.heart;
			const diabetes = data.values.diabetes;
			const cancer = data.values.cancer;
			const pregnant = data.values.pregnant;
			const meds = data.values.meds;
			const patid = data.values.patid;

			// assuming your JSON data has a 'billingid' field
			res.writeHead(200, {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Max-Age': 86400, // 24 hours
			});
			db.doctorsetpatientinfo(
				smoker,
				heart,
				diabetes,
				cancer,
				pregnant,
				meds,
				patid,
				(err, results) => {
					if (err) {
						res.statusCode = 500;
						res.end(
							JSON.stringify({ message: 'Internal Server Error' })
						);
					} else {
						res.statusCode = 200;
						res.end(
							JSON.stringify({
								message: 'Changes have been saved',
							})
						);
					}
				}
			);
		});
	} else if (path === '/doctor/creatpresc' && method === 'POST') {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const data = JSON.parse(body);
			// console.log('data:', data);
			const patid = data.patid;
			const name = data.presname;
			const ref = data.refill;
			const str = data.str;
			const ndc = data.ndc;

			// assuming your JSON data has a 'billingid' field
			res.writeHead(200, {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Max-Age': 86400, // 24 hours
			});
			db.createPresc(patid, name, ref, str, ndc, (err, results) => {
				if (err) {
					res.statusCode = 500;
					// console.log('err:', err.sqlMessage);
					res.write(err.sqlMessage);
					res.end(
						JSON.stringify({
							message: err.sqlMessage,
						})
					);
				} else {
					// console.log(results);
					res.statusCode = 200;
					// console.log('good:');
					res.end(
						JSON.stringify({
							message: 'Prescription has been created',
						})
					);
				}
			});
		});
	} else if (path === '/doctor/patientreport' && method === 'POST') {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const data = JSON.parse(body);
			// console.log(data);
			const smoker = data.smoker;
			const heart = data.heart;
			const active = data.active;
			const diabetes = data.diabetes;
			const cancer = data.cancer;
			const preg = data.pregnant;
			// console.log(
			// 	'going into sql:',
			// 	smoker,
			// 	heart,
			// 	cancer,
			// 	diabetes,
			// 	preg,
			// 	active
			// );
			res.writeHead(200, {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Max-Age': 86400, // 24 hours
			});
			db.doctorpatientreport(
				smoker,
				heart,
				cancer,
				diabetes,
				preg,
				active,
				(err, results) => {
					if (err) {
						res.statusCode = 500;
						res.end(
							JSON.stringify({ message: 'Internal Server Error' })
						);
					} else {
						res.statusCode = 200;
						res.end(JSON.stringify(results));
					}
				}
			);
		});
	} else if (path === '/doctor/getpatientinfo' && method === 'POST') {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const data = JSON.parse(body);
			// console.log(data);
			const patientid = data.id; // assuming your JSON data has a 'billingid' field
			res.writeHead(200, {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Max-Age': 86400, // 24 hours
			});
			db.getPatientData(patientid, (err, results) => {
				if (err) {
					res.statusCode = 500;
					res.end(
						JSON.stringify({ message: 'Internal Server Error' })
					);
				} else {
					res.statusCode = 200;
					res.end(JSON.stringify(results));
				}
			});
		});
	} else if (path === '/doctor/cancelref' && method === 'POST') {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const data = JSON.parse(body);

			console.log('data:', data);
			const refid = data.refid; // assuming your JSON data has a 'billingid' field
			res.writeHead(200, {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Max-Age': 86400, // 24 hours
			});
			db.cancelRef(refid, (err, results) => {
				if (err) {
					res.statusCode = 500;
					res.end(
						JSON.stringify({ message: 'Internal Server Error' })
					);
				} else {
					res.statusCode = 200;
					res.end(
						JSON.stringify({
							message: 'Referral has been canceled',
						})
					);
				}
			});
		});
	} else if (path === '/doctor/makeref' && method === 'POST') {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const data = JSON.parse(body);
			// console.log('data:', data);
			const patid = data.patid;
			const ref = data.ref;
			const spec = data.spec;
			res.writeHead(200, {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Max-Age': 86400, // 24 hours
			});
			db.doctormakeref(ref, spec, patid, (err, results) => {
				if (err) {
					res.statusCode = 500;
					res.end(
						JSON.stringify({ message: 'Internal Server Error' })
					);
				} else {
					res.statusCode = 200;
					res.end(
						JSON.stringify({ message: 'Referral has been made' })
					);
				}
			});
		});
	} else if (path === '/doctor/getrefs' && method === 'GET') {
		// Get all users
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': 86400, // 24 hours
		});
		db.getDoctorRefs((err, results) => {
			if (err) {
				res.statusCode = 500;
				res.end(JSON.stringify({ message: 'Internal Server Error' }));
			} else {
				res.statusCode = 200;
				res.end(JSON.stringify(results));
			}
		});
	} else if (path === '/doctor/appthistory' && method === 'GET') {
		// Get all users
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': 86400, // 24 hours
		});
		db.getDoctorApptHistory((err, results) => {
			if (err) {
				res.statusCode = 500;
				res.end(JSON.stringify({ message: 'Internal Server Error' }));
			} else {
				res.statusCode = 200;
				res.end(JSON.stringify(results));
			}
		});
	} else if (path === '/doctor/upcomingappt' && method === 'GET') {
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': 86400, // 24 hours
		});
		db.docGetUpcomingAppts((err, results) => {
			if (err) {
				res.statusCode = 500;
				res.end(JSON.stringify({ message: 'Internal Server Error' }));
			} else {
				res.statusCode = 200;
				res.end(JSON.stringify(results));
			}
		});
	} else if (path === '/employee/getappt' && method === 'POST') {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const data = JSON.parse(body);
			// console.log('data:', data);
			const apptid = data.apptid; // assuming your JSON data has a 'billingid' field
			// console.log(apptid);
			res.writeHead(200, {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Max-Age': 86400, // 24 hours
			});
			db.getApptInformation(apptid, (err, results) => {
				if (err) {
					res.statusCode = 500;
					res.end(
						JSON.stringify({ message: 'Internal Server Error' })
					);
				} else {
					res.statusCode = 200;
					res.end(JSON.stringify({ results }));
				}
			});
		});
	} else if (path === '/employee/patientlookup/noend' && method === 'POST') {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const data = JSON.parse(body);
			console.log('Grishma:', data);
			const pat_id = data.data.patid;
			const start_date = data.data.startdate.slice(0, 10);
			console.log(pat_id, start_date);
			res.writeHead(200, {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Max-Age': 86400, // 24 hours
			});
			db.getPatientInfoNoEnd(pat_id, start_date, (err, results) => {
				// console.log('results:', results);
				if (err) {
					res.statusCode = 500;
					res.end(
						JSON.stringify({
							message: 'Those details entered are invalid',
						})
					);
				} else {
					res.statusCode = 200;
					res.end(JSON.stringify(results));
				}
			});
		});
	} else if (
		path === '/employee/patientlookup/nostart' &&
		method === 'POST'
	) {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const data = JSON.parse(body);
			console.log('Grishma:', data);
			const pat_id = data.data.patid;
			const end_date = data.data.enddate.slice(0, 10);
			console.log(pat_id, end_date);
			res.writeHead(200, {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Max-Age': 86400, // 24 hours
			});
			db.getPatientInfoNoStart(pat_id, end_date, (err, results) => {
				// console.log('results:', results);
				if (err) {
					res.statusCode = 500;
					res.end(
						JSON.stringify({
							message: 'Those details entered are invalid',
						})
					);
				} else {
					res.statusCode = 200;
					res.end(JSON.stringify(results));
				}
			});
		});
	} else if (
		path === '/employee/patientlookup/nothing' &&
		method === 'POST'
	) {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const data = JSON.parse(body);
			console.log('Grishma:', data);
			const pat_id = data.data.patid;
			res.writeHead(200, {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Max-Age': 86400, // 24 hours
			});
			db.getPatientInfoNothing(pat_id, (err, results) => {
				// console.log('results:', results);
				if (err) {
					res.statusCode = 500;
					res.end(
						JSON.stringify({
							message: 'Those details entered are invalid',
						})
					);
				} else {
					res.statusCode = 200;
					res.end(JSON.stringify(results));
				}
			});
		});
	} else if (path === '/employee/patientlookup' && method === 'POST') {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const data = JSON.parse(body);
			console.log('Grishma:', data);
			const pat_id = data.data.patid;
			const start_date = data.data.startdate.slice(0, 10);
			const end_date = data.data.enddate.slice(0, 10);
			// const tempdate = data.data.DatePicker;
			// console.log('typeof', typeof tempdate);

			//const date = tempdate.slice(0, 10);
			console.log(pat_id, start_date, end_date);
			res.writeHead(200, {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Max-Age': 86400, // 24 hours
			});
			db.getPatientInfo(pat_id, start_date, end_date, (err, results) => {
				// console.log('results:', results);
				if (err) {
					res.statusCode = 500;
					res.end(
						JSON.stringify({
							message: 'Those details entered are invalid',
						})
					);
				} else {
					res.statusCode = 200;
					res.end(JSON.stringify(results));
				}
			});
		});
	} else if (path === '/employee/upcomingappt' && method === 'GET') {
		// Get all users
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': 86400, // 24 hours
		});

		db.getUpcomingOfficeAppts((err, results) => {
			if (err) {
				res.statusCode = 500;
				res.end(JSON.stringify({ message: 'Internal Server Error' }));
			} else {
				res.statusCode = 200;
				res.end(JSON.stringify(results));
			}
		});
	} else if (path === '/employee/editappt' && method === 'POST') {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const data = JSON.parse(body);
			const appt_id = data.values.apptid;
			const offid = data.values.location;
			const date = data.values.date;
			const time = data.values.time;
			// console.log(offid, date, time, appt_id);
			res.writeHead(200, {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Max-Age': 86400, // 24 hours
			});
			db.editappt(offid, date, time, appt_id, (err, results) => {
				// console.log('results:', results);
				if (err) {
					res.statusCode = 500;
					res.end(
						JSON.stringify({
							message: 'Those appointment details are invalid',
						})
					);
				} else {
					res.statusCode = 200;
					res.end(
						JSON.stringify({
							message: 'Appointment has been updated',
						})
					);
				}
			});
		});
	} else if (path === '/employee/BloodTest' && method === 'POST') {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const data = JSON.parse(body);
			console.log('data:', data);
			const patid = data.patid;
			const type = data.type;
			const wbc = data.wbc;
			const rbc = data.rbc;
			const hemog = data.hemoglo;
			const hemato = data.hemato;
			const plate = data.plate;

			res.writeHead(200, {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Max-Age': 86400, // 24 hours
			});
			db.makeBloodTest(
				type,
				rbc,
				wbc,
				hemog,
				hemato,
				plate,
				patid,
				(err, results) => {
					if (err) {
						res.statusCode = 500;
						console.log(err);
						res.end(JSON.stringify({ message: err.sqlMessage }));
					} else {
						res.statusCode = 200;
						res.end(
							JSON.stringify({
								message: 'Blood Test has been created',
							})
						);
					}
				}
			);
		});
	} else if (path === '/patient/appthistory' && method === 'GET') {
		// Get all users
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': 86400, // 24 hours
		});
		db.getPatientApptHistory((err, results) => {
			if (err) {
				res.statusCode = 500;
				res.end(JSON.stringify({ message: 'Internal Server Error' }));
			} else {
				res.statusCode = 200;
				res.end(JSON.stringify(results));
			}
		});
	} else if (path === '/patient/editinfo' && method === 'POST') {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const data = JSON.parse(body);
			// console.log(data);
			const city = data.values.city;
			const state = data.values.state;
			const zip = data.values.zipcode;
			const address = data.values.address;
			const email = data.values.email;
			const inspolicy = data.values.inspolicy;
			const insprovider = data.values.insprovider;
			const phone = data.values.phone;
			const first = data.values.first;
			const last = data.values.last;
			// console.log(
			// 	city,
			// 	state,
			// 	zip,
			// 	address,
			// 	email,
			// 	inspolicy,
			// 	insprovider,
			// 	phone,
			// 	first,
			// 	last
			// );
			res.writeHead(200, {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Max-Age': 86400, // 24 hours
			});
			db.UpdatePatientPersonal(
				address,
				city,
				state,
				zip,
				first,
				last,
				email,
				phone,
				insprovider,
				(err, results) => {
					if (err) {
						res.statusCode = 500;
						res.end(
							JSON.stringify({ message: 'Internal Server Error' })
						);
					} else {
						res.statusCode = 200;
						console.log(results);
						res.end(
							JSON.stringify({
								message: 'Your information has been saved',
							})
						);
					}
				}
			);
		});
	} else if (path === '/patient/pay' && method === 'POST') {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const data = JSON.parse(body);
			const billingid = data.Invoice_id; // assuming your JSON data has a 'billingid' field
			res.writeHead(200, {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Max-Age': 86400, // 24 hours
			});
			db.payInvoice(billingid, (err, results) => {
				if (err) {
					res.statusCode = 500;
					res.end(
						JSON.stringify({ message: 'Internal Server Error' })
					);
				} else {
					res.statusCode = 200;
					res.end(
						JSON.stringify({ message: 'Invoice has been paid' })
					);
				}
			});
		});
	} else if (path === '/cancelappt' && method === 'POST') {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const data = JSON.parse(body);
			const appt_id = data.appt_id; // assuming your JSON data has a 'billingid' field
			res.writeHead(200, {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Max-Age': 86400, // 24 hours
			});
			db.cancelAppt(appt_id, (err, results) => {
				if (err) {
					res.statusCode = 500;
					res.end(
						JSON.stringify({ message: 'Internal Server Error' })
					);
				} else {
					res.statusCode = 200;
					res.end(
						JSON.stringify({
							message: 'Appointment has been canceled',
						})
					);
				}
			});
		});
	} else if (path === '/patient/diagnosis' && method === 'GET') {
		// Get all users
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': 86400, // 24 hours
		});

		db.patientdiagnosis((err, results) => {
			if (err) {
				res.statusCode = 500;
				res.end(JSON.stringify({ message: 'Internal Server Error' }));
			} else {
				res.statusCode = 200;
				res.end(JSON.stringify(results));
			}
		});
	} else if (path === '/patient/upcomingappt' && method === 'GET') {
		// Get all users
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': 86400, // 24 hours
		});

		db.getUpcomingPatientAppts((err, results) => {
			if (err) {
				res.statusCode = 500;
				res.end(JSON.stringify({ message: 'Internal Server Error' }));
			} else {
				res.statusCode = 200;
				res.end(JSON.stringify(results));
			}
		});
	} else if (path === '/patient/billing/history' && method === 'GET') {
		// Get all users
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': 86400, // 24 hours
		});

		db.getPatientBillingHistory((err, results) => {
			if (err) {
				res.statusCode = 500;
				res.end(JSON.stringify({ message: 'Internal Server Error' }));
			} else {
				res.statusCode = 200;
				res.end(JSON.stringify(results));
			}
		});
	} else if (path === '/patient/blood/history' && method === 'GET') {
		// Get all users
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': 86400, // 24 hours
		});

		db.getPatientBloodHistory((err, results) => {
			if (err) {
				res.statusCode = 500;
				res.end(JSON.stringify({ message: 'Internal Server Error' }));
			} else {
				res.statusCode = 200;
				res.end(JSON.stringify(results));
			}
		});
	} else if (path === '/patient/medicalhistory' && method === 'GET') {
		// Get all users
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': 86400, // 24 hours
		});

		db.getPatientMedicalHistory((err, results) => {
			if (err) {
				res.statusCode = 500;
				res.end(JSON.stringify({ message: 'Internal Server Error' }));
			} else {
				res.statusCode = 200;
				res.end(JSON.stringify(results));
			}
		});
	} else if (path === '/patient/pay' && method === 'POST') {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const data = JSON.parse(body);
			const billingid = data.Invoice_id; // assuming your JSON data has a 'billingid' field
			res.writeHead(200, {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Max-Age': 86400, // 24 hours
			});
			db.payInvoice(billingid, (err, results) => {
				if (err) {
					res.statusCode = 500;
					res.end(
						JSON.stringify({ message: 'Internal Server Error' })
					);
				} else {
					res.statusCode = 200;
					res.end(
						JSON.stringify({ message: 'Invoice has been paid' })
					);
				}
			});
		});
	} else if (path === '/patient/getinfo' && method === 'GET') {
		// Get all users
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': 86400, // 24 hours
		});
		db.getPatientPersonal((err, results) => {
			if (err) {
				res.statusCode = 500;
				res.end(JSON.stringify({ message: 'Internal Server Error' }));
			} else {
				res.statusCode = 200;
				res.end(JSON.stringify(results));
			}
		});
	} else if (path === '/patient/blood' && method === 'GET') {
		// Get all users
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': 86400, // 24 hours
		});
		db.getBlood((err, results) => {
			if (err) {
				res.statusCode = 500;
				res.end(JSON.stringify({ message: 'Internal Server Error' }));
			} else {
				res.statusCode = 200;
				res.end(JSON.stringify(results));
			}
		});
	} else if (path === '/patient/bookappt/getdoctors' && method === 'POST') {
		// Get all users
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': 86400, // 24 hours
		});
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const data = JSON.parse(body);
			// console.log('My Data:', data);
			const location = data.location;
			const chosenreason = data.reason; //reason on the right must be in json, ex: {"reason":"general"}
			db.getApptDoctors(location, chosenreason, (err, results) => {
				if (err) {
					res.statusCode = 500;
					res.end(
						JSON.stringify({ message: 'Internal Server Error' })
					);
				} else {
					res.statusCode = 200;
					res.end(JSON.stringify(results));
				}
			});
		});
	} else if (path === '/patient/bookappt/noRef' && method === 'POST') {
		// Get all users
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': 86400, // 24 hours
		});

		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const data = JSON.parse(body);

			// console.log('My req:', data);
			const docid = data.data.doctor_id;
			// console.log('My doc', docid);
			const offid = data.data.location;
			const tempdate = data.data.DatePicker;
			// console.log('typeof', typeof tempdate);

			const date = tempdate.slice(0, 10);
			const time = tempdate.slice(11, 19);
			const reason = data.data.reason;
			var refid = data.data.refid;
			if (refid === '') {
				refid = null;
			}
			// console.log('Inserting', docid, offid, date, time, refid);
			if (reason === 'general') {
				db.selfBookingApptNoRef(
					docid,
					offid,
					date,
					time,
					refid,
					(err, results) => {
						// console.log(err);
						if (err) {
							res.statusCode = 500;
							res.write(err.sqlMessage);
							res.end();
						} else {
							res.statusCode = 200;
							res.write('Your appointment has been made');
							res.end();
						}
					}
				);
			} else {
				db.selfBookingApptRef(
					docid,
					offid,
					date,
					time,
					refid,
					(err, results) => {
						// console.log('booking referral');
						// console.log(err);
						if (err) {
							res.statusCode = 500;
							res.write(err.sqlMessage);
							res.end();
						} else {
							res.statusCode = 200;
							res.write('Appointment is booked');
							res.end();
						}
					}
				);
			}
		});
	} else if (path === '/patient/appt/delete' && method === 'POST') {
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': 86400, // 24 hours
		});
		db.deleteAppt(id, (err, results) => {
			if (err) {
				res.statusCode = 500;
				res.end(JSON.stringify({ message: 'Internal Server Error' }));
			} else {
				res.statusCode = 200;
				res.end(
					JSON.stringify({ message: 'Appointment has been deleted' })
				);
			}
		});
	} else {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
		res.write('Error');
		res.end();
	}
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`);
});

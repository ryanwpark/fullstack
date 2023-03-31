const http = require('http');
const url = require('url');
// const bcrypt = require('bcrypt');
const db = require('./db');
const login_data = require('./users');
const fs = require('fs');
const users = require('./users');
// const cors = require('cors');
//edit location, date, time

const server = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url, true);
	const path = parsedUrl.pathname;
	const method = req.method;
	const query = parsedUrl.query;
	if (path === '/login' && method === 'POST') {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
		let body = '';
		req.on('data', (chunk) => {
			body += chunk;
		});
		req.on('end', () => {
			if (body.length === 0) {
				res.writeHead(400, { 'Content-Type': 'application/json' });
				res.end(
					JSON.stringify({
						success: false,
						message: 'Empty request body',
					})
				);
			} else {
				const { username, password } = JSON.parse(body);

				const user = users.find(
					(u) => u.username === username && u.password === password
				);
				if (user) {
					res.writeHead(200, { 'Content-Type': 'application/json' });
					if (user.username == 'patient') {
						res.end(JSON.stringify({ success: true, token: 1 }));
					} else if (user.username == 'employee') {
						res.end(JSON.stringify({ success: true, token: 2 }));
					} else if (user.username == 'doctor') {
						res.end(JSON.stringify({ success: true, token: 3 }));
					}
				} else {
					res.writeHead(401, { 'Content-Type': 'application/json' });
					res.end(
						JSON.stringify({
							success: false,
							message: 'Invalid credentials',
						})
					);
				}
			}
		});
	} else if (path === '/employee/BloodTest' && method === 'POST') {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const data = JSON.parse(body);
			// const billingid = data.Invoice_id; // assuming your JSON data has a 'billingid' field
			res.writeHead(200, {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Max-Age': 86400, // 24 hours
			});
			db.makeBloodTest(
				data.blood_id,
				data.blo_type,
				data.blo_RBC,
				data.blo_WBC,
				data.blo_hemoglobin,
				data.blo_Hematocrit_percent,
				data.blo_platelets,
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
		db.getPatientAppts((err, results) => {
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
	} else if (path === '/patient/upcomingappt' && method === 'GET') {
		// Get all users
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': 86400, // 24 hours
		});
		const now = new Date();
		const time = now.toTimeString().split(' ')[0];
		const date = now.toISOString().split('T')[0];

		// console.log('time and date', time, ' ', date);

		db.getUpcomingPatientAppts(time, date, (err, results) => {
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
	} else if (path === '/patient/bookappt/doctors' && method === 'POST') {
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
	} else if (
		path === '/patient/bookappt/doctors/datetimes' &&
		method === 'POST'
	) {
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
			const location = data.location;
			const chosenreason = data.reason; //reason on the right must be in json, ex: {"reason":"general"}
			const first = data.first;
			const last = data.last;
			db.getApptDoctorsTimes(
				location,
				chosenreason,
				first,
				last,
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
			const docid = data.data.doctor;
			// console.log('My doc', docid);
			const offid = data.data.location;
			const tempdate = data.data.DatePicker;
			// console.log('typeof', typeof tempdate);

			const date = tempdate.slice(0, 10);
			const time = tempdate.slice(11, 19);
			console.log('Inserting', docid, offid, date, time);
			db.selfBookingApptNoRef(
				docid,
				offid,
				date,
				time,
				(err, results) => {
					if (err) {
						res.statusCode = 500;
						res.write(
							'Sorry you may need a referral and/or that appointment is booked'
						);
						res.end(
							JSON.stringify({
								message: 'Internal Server Error',
							})
						);
					} else {
						res.statusCode = 200;
						res.write('Successfully Booked Appointment');
						res.end();
					}
				}
			);
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
	// else {
	// 	// serve the login form HTML page
	// 	fs.readFile('login.html', (err, data) => {
	// 		if (err) {
	// 			res.writeHead(500, { 'Content-Type': 'text/plain' });
	// 			res.end('Internal server error');
	// 		} else {
	// 			res.writeHead(200, { 'Content-Type': 'text/html' });
	// 			res.end(data);
	// 		}
	// 	});
	// }
});
// });

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`);
});

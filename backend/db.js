const mysql = require('mysql');
const config = require('./config');

const connection = mysql.createConnection(config);

connection.connect((err) => {
	if (err) {
		{
			console.error('Error connecting to MySQL server:', err);
			return;
		}
	}
	console.log('Database connected');
});

function getBlood(callback) {
	connection.query('SELECT * FROM blood_cbc_test', callback);
}

// function getApptDoctors(location, reason, callback) {
// 	connection.query(
// 		"SELECT DISTINCT CONCAT(doctor_first_name, ' ', doctor_last_name) AS full_name FROM doctor INNER JOIN office ON doctor.office_id = office.office_id WHERE office.city = ? AND doctor.doctor_specialization = ?",
// 		[location, reason],
// 		callback
// 	);
// }
function getApptDoctors(location, reason, callback) {
	connection.query(
		"SELECT DISTINCT doctor.doctor_ID, CONCAT(doctor.doctor_first_name, ' ', doctor.doctor_last_name) AS full_name FROM doctor INNER JOIN office ON doctor.office_id = office.office_id WHERE office.city = ? AND doctor.doctor_specialization = ?",
		[location, reason],
		callback
	);
}

function getApptDoctorsTimes(location, reason, first, last, callback) {
	connection.query(
		'SELECT appt_date, appt_time FROM appoinment INNER JOIN doctor ON appoinment.appt_doctor_id = doctor.doctor_id INNER JOIN office ON appoinment.appt_office_id = office.office_id WHERE office.city = ? AND doctor.doctor_specialization = ? AND doctor.doctor_first_name = ? AND doctor.doctor_last_name = ?',
		[location, reason, first, last],
		callback
	);
}

function payInvoice(id, callback) {
	connection.query(
		'UPDATE invoice SET isPaid = 1 WHERE Invoice_id = ?',
		[id],
		callback
	);
}

function getPatientAppts(callback) {
	connection.query(
		'SELECT * from appoinment WHERE appt_Patient_id=21',
		callback
	);
}

function makeBloodTest(id, type, rb, wb, hg, ht, pt, callback) {
	connection.query(
		'INSERT INTO blood_cbc_test(blood_ID,blo_type,blo_RBC,blo_WBC,blo_hemoglobin,blo_Hematocrit_percent,blo_platelets) VALUES(?,?,?,?,?,?,?)',
		[id, type, rb, wb, hg, ht, pt],
		callback
	);
}

function selfBookingApptNoRef(
	docid,
	offid,
	formattedDate,
	timeValue,
	callback
) {
	connection.query(
		'INSERT INTO appoinment (appt_Patient_id, appt_Doctor_id, appt_office_id, appt_date, appt_time, ref_id) VALUES (21, ?, ?, ?, ?, NULL)',
		[docid, offid, formattedDate, timeValue],
		callback,
		callback
	);
}

function deleteAppt(id, callback) {
	connection.query(
		'DELETE FROM appoinment WHERE appointment_id = ?',
		[id],
		callback
	);
}

module.exports = {
	// getUsers,
	// getUserByUsername,
	// createUser,
	// updateUser,
	// deleteUser,
	payInvoice,
	makeBloodTest,
	deleteAppt,
	getBlood,
	getPatientAppts,
	getApptDoctors,
	getApptDoctorsTimes,
	selfBookingApptNoRef,
};

const mysql = require('mysql');
const { user } = require('./config');
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

// function authenticateUser(username, password, callback) {
// 	connection.query(
// 		'SELECT * FROM login WHERE log_username = ? AND log_pass = ?',
// 		[username, password],
// 		callback
// 	);
// }

function authenticateUser(username, password, callback) {
	const connection = mysql.createConnection(config);

	connection.connect((err) => {
		if (err) {
			console.error('error connecting: ' + err.stack);
			callback(err);
			return;
		}
		// console.log('connected as id ' + connection.threadId);

		connection.query(
			'SELECT * FROM login WHERE log_username = ? AND log_pass = ?',
			[username, password],
			(error, results, fields) => {
				// Release the connection
				connection.end();

				if (error) {
					console.error('error querying: ' + error.stack);
					callback(error);
					return;
				}

				if (results.length === 0) {
					callback(null, null);
				} else {
					callback(null, results[0]);
				}
			}
		);
	});
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
		'SELECT DISTINCT doctor.doctor_id,doctor.doctor_name FROM doctor INNER JOIN office ON doctor.office_id = office.office_id WHERE office.city = ? AND doctor.doctor_specialization = ?',
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

//IDK THE SQL QUERY FOR THIS
function getPatientData(id, callback) {
	connection.query(
		'select med_h_smoker, med_h_heart_disease , med_h_diabetes , med_h_current_meds    , med_h_cancer , med_h_pregnant , med_h_sexual_active from medical_history where patient_id=?',
		[id],
		callback
	);
}

function UpdatePatientPersonal(
	address,
	city,
	state,
	zip,
	first,
	last,
	email,
	phone,
	insprovider,
	callback
) {
	connection.query(
		'UPDATE patient SET patient_address = ?,city = ?,state = ?, zip = ?,patient_first_name = ?,patient_last_name = ?,patient_email = ?, patient_phone_num = ?, insurance_provider = ? WHERE patient_ID = 21',
		[address, city, state, zip, first, last, email, phone, insprovider],
		callback
	);
}

function getPatientPersonal(callback) {
	connection.query('select * from patient where patient_id=21', callback);
}

function getPatientApptHistory(callback) {
	connection.query(
		"SELECT a.appointment_id, a.appt_Patient_id, d.doctor_name, o.city as office_city, a.ref_id, a.appt_date, a.appt_time FROM appoinment a INNER JOIN doctor d ON a.appt_Doctor_id = d.doctor_ID INNER JOIN office o ON a.appt_office_id = o.office_ID WHERE a.appt_Patient_id = 21 AND CONCAT(a.appt_date, ' ', a.appt_time) < NOW();",
		callback
	);
}

function getPatientApptHistory(callback) {
	connection.query(
		"SELECT a.appointment_id, a.appt_Patient_id, d.doctor_name, o.city as office_city, a.ref_id, a.appt_date, a.appt_time FROM appoinment a INNER JOIN doctor d ON a.appt_Doctor_id = d.doctor_ID INNER JOIN office o ON a.appt_office_id = o.office_ID WHERE a.appt_Patient_id = 21 AND CONCAT(a.appt_date, ' ', a.appt_time) < NOW();",
		callback
	);
}

function getDoctorApptHistory(callback) {
	connection.query(
		"SELECT appt_date, appt_time, appt_Patient_id, office.city FROM appoinment INNER JOIN office ON appoinment.appt_office_id = office.office_ID WHERE appt_Doctor_id = 32 AND CONCAT(appt_date, ' ', appt_time) < NOW()",
		callback
	);
}

function getPatientBloodHistory(callback) {
	connection.query(
		'SELECT * FROM blood_cbc_test WHERE blood_ID IN (SELECT gc_blood_test_ID FROM general_checkup WHERE patient_id = 21)',
		callback
	);
}

function getUpcomingPatientAppts(callback) {
	connection.query(
		"SELECT a.appointment_id, a.appt_Patient_id, d.doctor_name, o.city as office_city, a.ref_id, a.appt_date, a.appt_time FROM appoinment a INNER JOIN doctor d ON a.appt_Doctor_id = d.doctor_ID INNER JOIN office o ON a.appt_office_id = o.office_ID WHERE a.appt_Patient_id = 21 AND CONCAT(a.appt_date, ' ', a.appt_time) > NOW();",
		callback
	);
}

function getUpcomingOfficeAppts(callback) {
	connection.query(
		"SELECT a.appointment_id, CONCAT(p.patient_first_name, ' ', p.patient_last_name) AS name, d.doctor_name, o.city as office_city, a.ref_id, a.appt_date, a.appt_time FROM appoinment a INNER JOIN doctor d ON a.appt_Doctor_id = d.doctor_ID INNER JOIN office o ON a.appt_office_id = o.office_ID INNER JOIN patient p ON a.appt_Patient_id = p.patient_ID WHERE o.office_ID = 1 AND CONCAT(a.appt_date, ' ', a.appt_time) > NOW()",
		callback
	);
}

function getPatientMedicalHistory(callback) {
	connection.query(
		'select med_h_smoker,med_h_heart_disease,med_h_diabetes,med_h_current_meds,med_h_pregnant,med_h_sexual_active,med_h_cancer from medical_history where patient_id=21',
		callback
	);
}

function docGetUpcomingAppts(callback) {
	connection.query(
		"SELECT a.*, o.city as office_city FROM appoinment a JOIN office o ON a.appt_office_id = o.office_ID WHERE a.appt_doctor_id = 32 AND CONCAT(a.appt_date, ' ', a.appt_time) > NOW()",
		callback
	);
}

function cancelAppt(apptID, callback) {
	connection.query(
		'DELETE FROM appoinment WHERE appointment_id=?',
		[apptID],
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

function selfBookingApptNoRef(docid, offid, date, time, refid, callback) {
	connection.query(
		'INSERT INTO appoinment (appt_Patient_id, appt_Doctor_id, appt_office_id, appt_date, appt_time, ref_id) VALUES (21, ?, ?, ?, ?, NULL)',
		[docid, offid, date, time],
		callback
	);
}

function getPatientBillingHistory(callback) {
	connection.query('SELECT * from invoice where patient_id=21', callback);
}

function getApptInformation(apptid, callback) {
	connection.query(
		'SELECT * from appoinment where appointment_id=?',
		[apptid],
		callback
	);
}

function editappt(offid, date, time, apptid, callback) {
	connection.query(
		'UPDATE appoinment SET appt_office_id = ?, appt_date = ?, appt_time = ? WHERE appointment_id = ?',
		[offid, date, time, apptid],
		callback
	);
}

function selfBookingApptRef(docid, offid, date, time, refID, callback) {
	connection.query(
		'INSERT INTO appoinment (appt_Patient_id, appt_Doctor_id, appt_office_id, appt_date, appt_time, ref_id) VALUES (21, ?, ?, ?, ?, ?)',
		[docid, offid, date, time, refID],
		callback
	);
}
// INSERT INTO appoinment (appt_Patient_id, appt_Doctor_id, appt_office_id, appt_date, appt_time, ref_id) VALUES ("21", "32", "1", 2023-03-16, "00:30:00", NULL)

function deleteAppt(id, callback) {
	connection.query(
		'DELETE FROM appoinment WHERE appointment_id = ?',
		[id],
		callback
	);
}

function createPresc(patid, presname, refill, str, ndc, callback) {
	connection.query(
		'INSERT INTO prescription (patient_ID, doctor_ID, pres_name, pres_refills, med_strength, med_NDC) VALUES (?, 32, ?, ?, ?, ?)',
		[patid, presname, refill, str, ndc],
		callback
	);
	// console.log('callback:', callback);
}

function getBloodTestDReverything(start, end, callback) {
	connection.query(
		'SELECT blood_cbc_test.* FROM blood_cbc_test INNER JOIN general_checkup ON blood_cbc_test.blood_ID = general_checkup.gc_blood_test_ID WHERE general_checkup.checkup_date BETWEEN ? AND ?',
		[start, end],
		callback
	);
}

function getBloodTestDRnoEnd(start, callback) {
	connection.query(
		'SELECT blood_cbc_test.* FROM blood_cbc_test INNER JOIN general_checkup ON blood_cbc_test.blood_ID = general_checkup.gc_blood_test_ID WHERE general_checkup.checkup_date > ?',
		[start],
		callback
	);
}

function getBloodTestDRnothing(callback) {
	connection.query(
		'SELECT blood_cbc_test.* FROM blood_cbc_test INNER JOIN general_checkup ON blood_cbc_test.blood_ID = general_checkup.gc_blood_test_ID',
		callback
	);
}

function getBloodTestDRnoStart(end, callback) {
	connection.query(
		'SELECT blood_cbc_test.* FROM blood_cbc_test INNER JOIN general_checkup ON blood_cbc_test.blood_ID = general_checkup.gc_blood_test_ID WHERE general_checkup.checkup_date < ?',
		[end],
		callback
	);
}

function doctorsetpatientinfo(
	smoker,
	heart,
	diabetes,
	cancer,
	pregnant,
	meds,
	patid,
	callback
) {
	connection.query(
		'UPDATE medical_history SET med_h_smoker = ?, med_h_heart_disease = ?, med_h_diabetes = ?, med_h_cancer = ?, med_h_pregnant = ?, med_h_current_meds = ? WHERE patient_ID = ?',
		[smoker, heart, diabetes, cancer, pregnant, meds, patid],
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
	getPatientApptHistory,
	getApptDoctors,
	getApptDoctorsTimes,
	selfBookingApptNoRef,
	getUpcomingPatientAppts,
	docGetUpcomingAppts,
	cancelAppt,
	getDoctorApptHistory,
	authenticateUser,
	selfBookingApptRef,
	getPatientBillingHistory,
	getPatientBloodHistory,
	getPatientMedicalHistory,
	getUpcomingOfficeAppts,
	getApptInformation,
	editappt,
	getPatientPersonal,
	UpdatePatientPersonal,
	getPatientData,
	createPresc,
	getBloodTestDReverything,
	getBloodTestDRnoEnd,
	getBloodTestDRnothing,
	getBloodTestDRnoStart,
	doctorsetpatientinfo,
};

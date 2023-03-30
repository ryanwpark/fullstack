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

function getAppts(callback) {
	connection.query('SELECT * FROM appoinment', callback);
}
function createUser(username, password, callback) {
	connection.query(
		'INSERT INTO login (username, password) VALUES (?, ?)',
		[username, password],
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

function getPatientAppts(id, callback) {
	connection.query(
		'SELECT * from appoinment WHERE appt_Patient_id=21',
		[id],
		callback
	);
}

function makeBloodTest(id, type, rb, wb, hg, ht, pt, callback) {
	connection.query(
		'INSERT INTO blood_cbc_test(blood_ID,blo_type,blo_RBC,blo_WBC,blo_hemoglobin,blo_Hematocrit_percent,blo_platelets) VALUE(?,?,?,?,?,?,?)',
		[id, type, rb, wb, hg, ht, pt],
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
	getAppts,
	getBlood,
	getPatientAppts,
};

# fullstack

Frontend Folder is client.
Backend Folder is Server

To retrieve a clone.
  in terminal, direct to a new folder[with cd] and type "git clone https://github.com/ryanwpark/fullstack"

Steps to run locally

    1) in terminal, "cd client"
    2) in terminal, "npm install"
    3) in terminal, "npm start"



    How to Login as a Patient
  Once the website is up locally, you can login in clicking the blue button "Have an account? Login to book an appointment!".
  Our Locations and can be seen by clicking the blue button "Schedule an appointment over the phone".
  To login in as our patient, you can use the username "wade123" and the password "password".

Functions for Patients
    We can see our upcoming appointments and cancel them by clicking the red "cancel" button.
    Our upcoming appointments table will be appointments after today's date. 
    We will see our diagnosis, billing, blood test, medical history, and appointment history tables below which can be expanded for view by clicking the gray dropdown arrows on the right hand side. 
  
  Paying Bills
      In our billing history table, you can see the ID of 9($275) and 12($240) have not been payed by checking the payment status column.
      To pay a bill, you can click the tab "Pay Bill".
      We can use billingid of 9 or 12 and fill in the rest of the fields like First name-"George", Last name-"Green", Email - "test@test.com", phone - "281-281-0000", $ - "[the amount of the bill]", address-"123 street", city-"Houston", State-"Texas", Zip-"77001", any credit card option, CCV-"123", and Expiration Date will be anydate. On submit, we will get a message prompt telling us "invoice has been paid" or "the billing id is incorrect". 
      We can go back and see the billingid has be paid in the billing history table. 
    
  Book an Appointment
      To book an appointment, you can click the tab "Book Appointments".
      We will test out our general checkup by choosing location as "Houston", Reason as "General Check-Up", Doctor as "John Smith".
      We will demonstrate the trigger messages for our appointment constraints.
      If we try to book an appointment with our time as 2:00PM and our date is on the weekend, we will trigger a sql message telling us "The office is closed on the weekends".
      If we try to book an appointment with our time as 2:00Pm and our date before today, we will trigger a sql message telling us "You cannot create an appointment before today's date".
      If we try to book an appointment with date as July 4th 2023 and our time as 10:00PM, we will trigger a sql message telling us "The office is closed during the hours".
      We can book our appointment for a general check-up in Houston with Dr. John Smith on July 4th, 2023 at 2:00PM and we will get a message telling us "Appointment has been made".
      If we try to hit submit again, we willt trigger a sql message saying "An appoitnment has already been book for this time".
      We can go back to our patient's front page by clicking the white text "Welcome back to Kinetic Health!", and see in our upcoming appointments our new appointment on July 4th.
      To book an appointment with a specialist, we can choose Location as "Houston", Reason as "Radiology", Referral ID as "304", and Doctor as "Jane Doe". We will choose any date after today and not on the weekend and our time must be between the hours of 8AM and 5:30PM.
      When hit submit, we can see "Appointment is booked" and go back to our appointment's table to see our appointment with Dr. Jane Doe.
      If we try to book an appointment with the wrong specialist we will trigger a sql message telling us "We are not referred to this sepcialist".
      We can trigger this by choose location as "Dallas", Reason as "Gastroentology", Referral ID as "304" and Doctor as "Jimin Lee",our date must be after today and not on the weekend and our time must be between the hours of 8AM and 5:30PM. On Submit, we can see the appointment is rejected and has not been added to our upcoming appointments table.

  Update Information
    To update our personal information, we can hit the tab "Update Information".
    We can hit the blue "Edit" button and start making our changes. We can change City from "Houston" to "Dallas", Street address from "1234 street" to "123 sesame st", and Zip from "77002" to "12345". We don't want to change our name because it is being referencing in other functions in our demonstration.
    We can hit save and we get a prompt telling us our changes have been saved. We can refresh the page so see our changes are saved as well. 
  
  
  
   We can logout of patients by clicking the tab "Logout".
   
   
   
    How to Login as a Employee
  You can login in clicking the blue button "Have an account? Login to book an appointment!".
  Our Locations and can be seen by clicking the blue button "Schedule an appointment over the phone".
  To login in as our Employee, you can use the username "h.wang" and the password "password456".

Functions for Employees
      We can see our upcoming appointments for our employee's location and cancel them by clicking the red "cancel" button.
      Our upcoming appointments table will be appointments after today's date. 
  
  Create Blood Test
      We can use PatientID as 21, First name as “Ryan”, Last name as “Coog”, Blood type is a string like “O+”, hematocrit % would be “30”, WBC/RBC can be number between 4 to 7, Hemoglobin Count can be any number between 9 to 14 and Platelets Count can be numbers like “120”.
      On Submit we will get a message telling us our "Blood test has been created".
    
  Manage Appointments
      We can navigate to this page by clicking "Manage Appointments".
      We can enter any appointmentID from the upcoming appointments table from the employee's main page.
      We will use appointmentID 330 for our example.
      We can click the blue "Edit" button and change our date from "2023-09-22" to "2023-09-25" and our time to "02:00:00:" and hit save.
      A prompt will tell you your changes have been saved and we can see the being reflected on the employee's upcoming appointments table.
    
   Patient Look-Up
      We can navigate to this page by clicking "Manage Appointments".
      Use the Patient ID - "21", First name - "Ryan", Last name - "Coog".
      Selecting only a start date will show all data from that date on.
      Selecting only a end date will show all data until that date.
      Selecting both a start and end date will show all data inbetween those dates.
      Selecting no dates will show all data for this patient.
      We can choose the starting date "2023-04-23" and end date "2023-12-21" to see our report for 3 entries.
      We can choose no dates to see all our data for our data report.
      This data will be displaying data from the patient table and appointment table.
      
      
   We can logout of Employees by clicking the tab "Logout".
       
    How to Login as a Doctor
  You can login in clicking the blue button "Have an account? Login to book an appointment!".
  To login in as our doctor, you can use the 
  Username "jsmith" 
  password "12345678".

Doctor Welcome Page
  We can see our upcoming appointments and cancel them by clicking the red "cancel" button.
  Our upcoming appointments table will be appointments after today's date. 
  Below the upcoming appointments is where you can create referrals and view/cancel referrals you have created.
  To create a referral, enter patientID "21", First name "Ryan", Last name "Coog", Referring DoctorID "34", doctor specialization "Gastroentology", then click submit. The referral you created should be on the left side in the Referral History table.
  
Appointment History
  This page shows previous appointments the doctor has had in the past.
  
Patient Report
  The doctor will be prompted to filter what report he would like to view, choose "pregnant" and/or "sexually active", then click submit. This will generate a report that shows the heights, weights, and averages for all patients who fall under the chosen filter(s).
    
Manage Patients
  Enter the following: 
  PatientID "21", 
  First Name "Ryan", 
  Last Name "Coog", 
  Then click submit. A table with the patient's medical history will be presented. If the medical history needs to be edited, click edit at the bottom and you will be able to edit any of the patient's medical history. On this page the doctor is also able to add/view the patients current medication.
  
Blood Test Report
  This page generates a report that shows the average blood teset results over a period of time. Clicking submit without entering a start and end date will show all blood reports and averages. Entering only a start date will show all blood test after the start date and/or enter an end date to view all the data until that date.
  
Create Prescription
  Enter the following: 
  PatientID "21", 
  First Name "Ryan", 
  Last Name "Coog",
  Prescription name "Tylenol",
  Refills "1",
  Strenght "120mg",
  NDC "1234-1234"
  Then click submit. This will add a prescripton for the patient.
  
     
   
   
    

# 🏥 MediSphere - Healthcare Management System (Backend)

MediSphere is a secure Healthcare Management System developed using **Spring Boot**. It provides role-based access for **Admin**, **Doctor**, and **Patient** with JWT Authentication, appointment management, prescription management, email notifications, and secure REST APIs.

---

# 🚀 Features

## 🔐 Authentication

- JWT Authentication
- BCrypt Password Encryption
- Spring Security
- Role-Based Authorization
- Secure REST APIs

### Roles

- Admin
- Doctor
- Patient

---

# 👨‍💼 Admin Module

Admin can:

- Login
- Add Doctor
- View All Doctors
- Update Doctor
- Delete Doctor
- Search Doctor
- Add Patient
- View All Patients
- Update Patient
- Delete Patient
- Search Patient
- View All Appointments
- Approve Appointments
- Reject Appointments
- Cancel Appointments
- View Dashboard Statistics
- View All Prescriptions

---

# 👨‍⚕️ Doctor Module

Doctor can:

- Login
- View Assigned Appointments
- Approve Appointment
- Reject Appointment
- Complete Appointment
- Add Prescription
- Update Prescription
- View Prescription
- View Dashboard

When a prescription is added:

- Prescription is stored in the database
- Patient automatically receives the prescription by email

---

# 🧑 Patient Module

Patient can:

- Register
- Login
- View Profile
- Update Profile
- Change Password
- Forgot Password using OTP
- Reset Password
- Book Appointment
- View My Appointments
- View My Prescriptions
- View Dashboard

---

# 📅 Appointment Management

Features include:

- Book Appointment
- Approve Appointment
- Reject Appointment
- Complete Appointment
- Cancel Appointment
- Delete Appointment
- Search by Doctor
- Search by Patient
- Search by Date
- Pagination
- Sorting

Appointment Status

- Pending
- Approved
- Rejected
- Completed
- Cancelled

---

# 💊 Prescription Management

Doctor can:

- Add Prescription
- Update Prescription
- View Prescription

Patient can:

- View My Prescriptions

Prescription contains:

- Medicine
- Dosage
- Duration
- Notes

---

# 📧 Email Notifications

Automatic emails are sent for:

- Forgot Password OTP
- Appointment Booked
- Appointment Approved
- Appointment Rejected
- Prescription Details

---

# 🔑 Forgot Password

Workflow

Patient

↓

Enter Email

↓

OTP Generated

↓

OTP Sent via Email

↓

Verify OTP

↓

Reset Password

↓

Login with New Password

---

# 📊 Dashboard

### Admin Dashboard

- Total Doctors
- Total Patients
- Total Appointments
- Pending Appointments
- Approved Appointments
- Rejected Appointments

### Doctor Dashboard

- Total Appointments
- Pending
- Approved
- Completed
- Rejected

### Patient Dashboard

- Total Appointments
- Pending
- Approved
- Completed
- Cancelled

---

# 🛡️ Security

- Spring Security
- JWT Authentication
- BCrypt Password Encryption
- Role-Based Authorization
- Protected APIs

---

# 🗄️ Database

- PostgreSQL
- Spring Data JPA
- Hibernate ORM

---

# 📚 API Documentation

Swagger UI

```
/swagger-ui/index.html
```

---

# 🛠️ Tech Stack

### Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- Maven
- Lombok

### Database

- PostgreSQL (Neon)

### Authentication

- JWT
- BCrypt

### Documentation

- Swagger / OpenAPI

### Email

- JavaMailSender
- Gmail SMTP

---

# 📁 Project Structure

```
backend
│
├── controller
├── service
├── repository
├── entity
├── dto
├── security
├── exception
├── config
└── resources
```

---

# 🔄 System Workflow

```
Admin Login
      │
      ▼
Create Doctor
      │
      ▼
Patient Registration
      │
      ▼
Patient Login
      │
      ▼
Book Appointment
      │
      ▼
Appointment Status
(PENDING)
      │
      ▼
Doctor Login
      │
      ▼
Approve / Reject Appointment
      │
      ▼
Patient Receives Email
      │
      ▼
Doctor Adds Prescription
      │
      ▼
Prescription Saved
      │
      ▼
Prescription Email Sent
      │
      ▼
Patient Views Prescription
```

---

# ✨ Highlights

- Secure JWT Authentication
- Role-Based Access Control
- Complete Appointment Workflow
- Automated Email Notifications
- OTP-Based Password Reset
- Prescription Management
- Dashboard Analytics
- RESTful APIs
- Swagger Documentation
- Clean Layered Architecture

---

# 👨‍💻 Developed By

**Chandru R**

Computer Science and Business Systems (CSBS)

PSNA College of Engineering and Technology

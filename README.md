Project Title: Hospital Management System in Java

Description:
The Hospital Management System is a simple Java console application designed to manage essential operations in a hospital setting. This system enables the user to add and manage patients, doctors, and appointments through a user-friendly text-based menu interface.

Key Features:
Add Patients

Input: Name, Age, Gender

Each patient is automatically assigned a unique ID.

Add Doctors

Input: Name, Specialty

Each doctor is automatically assigned a unique ID.

Schedule Appointments

Requires valid Patient ID and Doctor ID, and the appointment date.

Links a patient and doctor with the appointment information.

View Records

List all Patients, Doctors, and Appointments with detailed information.

Search Functionality

Internally locates patients and doctors by their unique IDs during appointment scheduling.

Technologies Used:
Language: Java

Tools: Java Standard Library (Scanner, ArrayList)

OOP Principles: Encapsulation, Object Composition

Classes:
Patient: Stores patient information and auto-generates a unique ID.

Doctor: Stores doctor information and auto-generates a unique ID.

Appointment: Represents an appointment linking a patient and a doctor on a given date.

HospitalManagement: Main class handling user input and system logic.

package com.medisphere.repository;

import com.medisphere.entity.Appointment;
import com.medisphere.entity.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    long countByStatus(AppointmentStatus status);

    List<Appointment> findByAppointmentDate(LocalDate appointmentDate);

    List<Appointment> findByDoctor_DoctorNameContainingIgnoreCase(String doctorName);

    List<Appointment> findByPatient_PatientNameContainingIgnoreCase(String patientName);

}
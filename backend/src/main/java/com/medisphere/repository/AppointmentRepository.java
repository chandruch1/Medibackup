package com.medisphere.repository;

import com.medisphere.entity.Appointment;
import com.medisphere.entity.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    long countByStatus(AppointmentStatus status);

    List<Appointment> findByAppointmentDate(LocalDate appointmentDate);

    List<Appointment> findByDoctor_DoctorNameContainingIgnoreCase(String doctorName);

    List<Appointment> findByPatient_PatientNameContainingIgnoreCase(String patientName);

    List<Appointment> findByDoctor_Email(String email);

    List<Appointment> findByDoctor_EmailAndStatus(String email,
                                                  AppointmentStatus status);
    List<Appointment> findByPatient_Email(String email);

    boolean existsByDoctor_IdAndAppointmentDateAndAppointmentTime(
            Long doctorId,
            LocalDate appointmentDate,
            LocalTime appointmentTime);
    long countByDoctor_Email(String email);

    long countByDoctor_EmailAndStatus(String email, AppointmentStatus status);

    long countByPatient_Email(String email);

    long countByPatient_EmailAndStatus(String email, AppointmentStatus status);

}
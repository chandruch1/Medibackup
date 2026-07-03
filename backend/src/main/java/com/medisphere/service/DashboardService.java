package com.medisphere.service;

import com.medisphere.dto.DashboardResponse;
import com.medisphere.entity.AppointmentStatus;
import com.medisphere.repository.AppointmentRepository;
import com.medisphere.repository.DoctorRepository;
import com.medisphere.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;

    public DashboardResponse getDashboardData() {

        return DashboardResponse.builder()
                .totalDoctors(doctorRepository.count())
                .totalPatients(patientRepository.count())
                .totalAppointments(appointmentRepository.count())
                .bookedAppointments(
                        appointmentRepository.countByStatus(AppointmentStatus.BOOKED)
                )
                .completedAppointments(
                        appointmentRepository.countByStatus(AppointmentStatus.COMPLETED)
                )
                .cancelledAppointments(
                        appointmentRepository.countByStatus(AppointmentStatus.CANCELLED)
                )
                .build();
    }
}
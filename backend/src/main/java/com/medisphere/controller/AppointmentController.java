package com.medisphere.controller;

import com.medisphere.dto.AppointmentRequest;
import com.medisphere.dto.AppointmentResponse;
import com.medisphere.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    // Book Appointment
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public AppointmentResponse bookAppointment(
            @Valid @RequestBody AppointmentRequest request) {

        return appointmentService.bookAppointment(request);
    }

    // Get All Appointments
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<AppointmentResponse> getAllAppointments() {

        return appointmentService.getAllAppointments();
    }

    // Get Appointment By Id
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public AppointmentResponse getAppointmentById(
            @PathVariable Long id) {

        return appointmentService.getAppointmentById(id);
    }

    // Update Appointment
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public AppointmentResponse updateAppointment(
            @PathVariable Long id,
            @Valid @RequestBody AppointmentRequest request) {

        return appointmentService.updateAppointment(id, request);
    }

    // Delete Appointment
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteAppointment(
            @PathVariable Long id) {

        appointmentService.deleteAppointment(id);

        return "Appointment deleted successfully.";
    }

    @GetMapping("/search/date")
    @PreAuthorize("hasRole('ADMIN')")
    public List<AppointmentResponse> searchByDate(
            @RequestParam LocalDate date) {

        return appointmentService.searchByDate(date);
    }

    @GetMapping("/search/doctor")
    @PreAuthorize("hasRole('ADMIN')")
    public List<AppointmentResponse> searchByDoctor(
            @RequestParam String doctorName) {

        return appointmentService.searchByDoctor(doctorName);
    }

    @GetMapping("/search/patient")
    @PreAuthorize("hasRole('ADMIN')")
    public List<AppointmentResponse> searchByPatient(
            @RequestParam String patientName) {

        return appointmentService.searchByPatient(patientName);
    }
    @GetMapping("/page")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<AppointmentResponse> getAppointmentsWithPagination(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "5") int size,

            @RequestParam(defaultValue = "appointmentDate") String sortBy,

            @RequestParam(defaultValue = "asc") String direction) {

        return appointmentService.getAppointmentsWithPagination(
                page,
                size,
                sortBy,
                direction
        );
    }
    @PutMapping("/{id}/complete")
    @PreAuthorize("hasRole('ADMIN')")
    public AppointmentResponse completeAppointment(
            @PathVariable Long id) {

        return appointmentService.completeAppointment(id);
    }

    @PutMapping("/{id}/cancel")
    @PreAuthorize("hasRole('ADMIN')")
    public AppointmentResponse cancelAppointment(
            @PathVariable Long id) {

        return appointmentService.cancelAppointment(id);
    }
}
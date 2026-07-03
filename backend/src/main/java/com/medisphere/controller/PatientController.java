package com.medisphere.controller;

import com.medisphere.dto.PatientRequest;
import com.medisphere.dto.PatientResponse;
import com.medisphere.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import java.util.List;

@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    // Add Patient
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public PatientResponse addPatient(
            @Valid @RequestBody PatientRequest request) {

        return patientService.addPatient(request);
    }

    // Get All Patients
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<PatientResponse> getAllPatients() {

        return patientService.getAllPatients();
    }

    // Get Patient By Id
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public PatientResponse getPatientById(
            @PathVariable Long id) {

        return patientService.getPatientById(id);
    }

    // Update Patient
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public PatientResponse updatePatient(
            @PathVariable Long id,
            @Valid @RequestBody PatientRequest request) {

        return patientService.updatePatient(id, request);
    }

    // Delete Patient
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deletePatient(
            @PathVariable Long id) {

        patientService.deletePatient(id);

        return "Patient deleted successfully.";
    }

    @GetMapping("/search/name")
    @PreAuthorize("hasRole('ADMIN')")
    public List<PatientResponse> searchPatientByName(
            @RequestParam String name) {

        return patientService.searchPatientByName(name);
    }

    @GetMapping("/search/disease")
    @PreAuthorize("hasRole('ADMIN')")
    public List<PatientResponse> searchPatientByDisease(
            @RequestParam String disease) {

        return patientService.searchPatientByDisease(disease);
    }
    @GetMapping("/page")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<PatientResponse> getPatientsWithPagination(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "5") int size,

            @RequestParam(defaultValue = "patientName") String sortBy,

            @RequestParam(defaultValue = "asc") String direction) {

        return patientService.getPatientsWithPagination(
                page,
                size,
                sortBy,
                direction
        );
    }
}
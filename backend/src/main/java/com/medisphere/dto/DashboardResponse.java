package com.medisphere.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {

    private long totalDoctors;

    private long totalPatients;

    private long totalAppointments;

    private long bookedAppointments;

    private long completedAppointments;

    private long cancelledAppointments;
}
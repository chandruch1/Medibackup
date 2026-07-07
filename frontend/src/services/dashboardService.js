import { getDoctors } from "./doctorService";
import { getPatients } from "./patientService";
import { getAppointments } from "./appointmentService";

export const getDashboardData = async () => {

    const doctors = await getDoctors();

    const patients = await getPatients();

    const appointments = await getAppointments();

    return {

        totalDoctors: doctors.length,

        totalPatients: patients.length,

        totalAppointments: appointments.length,

        completedAppointments: appointments.filter(
            appointment => appointment.status === "COMPLETED"
        ).length,

        cancelledAppointments: appointments.filter(
            appointment => appointment.status === "CANCELLED"
        ).length,

        bookedAppointments: appointments.filter(
            appointment => appointment.status === "BOOKED"
        ).length

    };

};
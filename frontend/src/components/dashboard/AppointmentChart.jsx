import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function AppointmentChart({ dashboard }) {

    const data = {

        labels: [

            "Booked",
            "Completed",
            "Cancelled"

        ],

        datasets: [

            {

                data: [

                    dashboard.bookedAppointments,
                    dashboard.completedAppointments,
                    dashboard.cancelledAppointments

                ],

                backgroundColor: [

                    "#0d6efd",
                    "#198754",
                    "#dc3545"

                ]

            }

        ]

    };

    return (

        <div
            className="card shadow mt-4 p-3"
        >

            <h5>

                Appointment Status

            </h5>

            <div
                style={{
                    width: "250px",
                    height: "250px",
                    margin: "0 auto"
                }}
            >
                <Pie
                    data={data}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: "bottom"
                            }
                        }
                    }}
                />
            </div>

        </div>

    );

}

export default AppointmentChart;
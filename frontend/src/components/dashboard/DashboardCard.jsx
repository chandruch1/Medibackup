function DashboardCard({

                           title,
                           value,
                           icon,
                           color

                       }) {

    return (

        <div className="col-lg-4 col-md-6 mb-4">

            <div
                className="card shadow-sm border-0 h-100"
                style={{
                    borderLeft: `6px solid ${color}`,
                    transition: "0.3s"
                }}
            >

                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center">

                        <div>

                            <h6 className="text-muted">

                                {title}

                            </h6>

                            <h2
                                className="fw-bold mt-2"
                                style={{ color }}
                            >

                                {value}

                            </h2>

                        </div>

                        <div
                            style={{
                                fontSize: "45px"
                            }}
                        >

                            {icon}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardCard;
function Navbar() {

    return (

        <nav className="navbar navbar-light bg-white shadow-sm px-4">

            <div>

                <h4 className="mb-0">

                    Admin Dashboard

                </h4>

            </div>

            <div>

                <span className="fw-bold">

                    Welcome,

                </span>

                <span className="ms-2 text-primary">

                    {localStorage.getItem("username")}

                </span>

            </div>

        </nav>

    );

}

export default Navbar;
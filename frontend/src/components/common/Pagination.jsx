function Pagination({

                        currentPage,

                        totalPages,

                        onPrevious,

                        onNext

                    }) {

    return (

        <div className="d-flex justify-content-end mt-4">

            <button
                className="btn btn-outline-primary me-2"
                disabled={currentPage === 0}
                onClick={onPrevious}
            >

                Previous

            </button>

            <span className="align-self-center">

                Page {currentPage + 1} of {totalPages}

            </span>

            <button
                className="btn btn-outline-primary ms-2"
                disabled={currentPage + 1 === totalPages}
                onClick={onNext}
            >

                Next

            </button>

        </div>

    );

}

export default Pagination;
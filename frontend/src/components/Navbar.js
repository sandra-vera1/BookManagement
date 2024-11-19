import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [user, setUser] = useState(null); // Store user info from localStorage
    const [statusSession, setStatusSession] = useState(false); // Session status
    const history = useHistory();

    useEffect(() => {
        // Check if the session exists in localStorage
        const savedSession = localStorage.getItem('statusSession');
        const savedUser = localStorage.getItem('user'); // Retrieve user data from localStorage

        if (savedSession === 'True' && savedUser) {
            setStatusSession(true); // User is logged in
            setUser(JSON.parse(savedUser)); // Set the user data from localStorage
        } else {
            setStatusSession(false); // User is not logged in
        }
    }, [history]);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('statusSession'); // Remove session data from localStorage
        localStorage.removeItem('user'); // Optionally clear user data
        setStatusSession(false); // Update state to reflect logged-out status
        setUser(null); // Clear user data from state
        history.push('/'); // Redirect to collection page
        window.location.href = window.location.href;
    };

    // If not logged in, show login message
    if (!statusSession) {
        return (
        <header className="p-3 text-bg-dark">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        {/* Your brand/logo can go here */}
                    </a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        {/* Optional Nav Items */}
                    </ul>

                    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                        {/* Optional Search Bar */}
                    </form>

                    <div className="text-end">
                        {/* Conditional rendering for Login/Logout */}
                        {statusSession ? (
                            <button
                                type="button"
                                className="btn btn-outline-warning me-2"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        ) : (
                            <Link to="/Login">
                                <button type="button" className="btn btn-warning me-2">Login</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            </header>
        )
    }

    return (
        <header className="p-3 text-bg-dark">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        {/* Your brand/logo can go here */}
                    </a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        {/* Optional Nav Items */}
                    </ul>

                    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                        {/* Optional Search Bar */}
                    </form>

                    <div className="text-end">
                        {/* Show 'Add New Book' button only if logged in */}
                        {statusSession && (
                            <Link to="/Create">
                                <button type="button" className="btn btn-warning me-2">Add New book</button>
                            </Link>
                        )}

                        {/* Conditional rendering for Login/Logout */}
                        {statusSession ? (
                            <button
                                type="button"
                                className="btn btn-outline-warning me-2"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        ) : (
                            <Link to="/Login">
                                <button type="button" className="btn btn-warning me-2">Login</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

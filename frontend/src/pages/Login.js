import { Link } from "react-router-dom"; // Import Link for navigation

const Login = () => {

    return (
        <div>
            {/* Use Link to navigate to /collection on button click */}
            <Link to="/Collection">
                <button className="btn btn-primary d-inline-flex align-items-center">Login</button>
            </Link>

            {/* Use Link to navigate to /collection on button click */}
            <Link to="/Collectionuser">
                <button className="btn btn-primary d-inline-flex align-items-center">any user</button>
            </Link>

        </div>
    );
}

export default Login;
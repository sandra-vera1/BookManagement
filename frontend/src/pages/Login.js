import { Link } from "react-router-dom"; // Import Link for navigation

const Login = () => {

    return (
        <div>
            {/* Use Link to go to / on button click */}
            <Link to="/">
                <button className="btn btn-primary d-inline-flex align-items-center">Login</button>
            </Link>

    

        </div>
    );
}

export default Login;
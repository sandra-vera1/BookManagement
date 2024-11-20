import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"; // For redirecting the user
import ErrorMessage from './ErrorMessage'; // Import the ErrorMessage component



const Login = () => {
    // State variables to manage form input values:
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [statusSession, setStatusSession] = useState(false); // Default to false
    const [errorMessage, setErrorMessage] = useState(null); // To store error messages
    const history = useHistory(); // To redirect the user after successful login

    // Effect hook to check if the user is already logged in on page load
    useEffect(() => {
        const savedSession = localStorage.getItem('statusSession'); // Retrieve session status from localStorage
        if (savedSession === 'True') {
            history.push('/'); // Redirect to home if already logged in
        }
    }, [history]);

    // Function to handle the form submission:
    const submitForm = async (e) => {
        e.preventDefault();

        const user = { username, password }; // Creates a new user object with input values

        try {
            // Sends a POST request to the API (http://localhost:7000/login/) to validate administrator credentials:
            const response = await fetch('/login', {
                method: 'POST',
                body: JSON.stringify(user), // Converts the user object to JSON format
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Handle successful login response from the server:
            const json = await response.json();

            if (response.ok) {
                // Save session data in localStorage upon successful login
                localStorage.setItem('statusSession', 'True'); // Set session status to 'True'
                localStorage.setItem('user', JSON.stringify(json));

                // Clear the form fields after successful login
                setUsername('');
                setPassword('');
                setStatusSession(true);

                // Redirect to home page
                history.push('/');
            } else {
                // Handle failed login
                setErrorMessage(`Login failed: ${json.message || 'Unknown error'}`);
            }
        } catch (error) {
            // Catch any errors during the fetch or unexpected errors
            setErrorMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <form className="login" onSubmit={submitForm}>
                    <label>Username</label>
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}   // Updates the 'Username' state
                        value={username}
                        required
                    />
                    <div style={{ marginTop: "16px" }}> </div>
                    <label>Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}  // Updates the 'Password' state
                        value={password}
                        required
                    />
                    <div style={{ marginTop: "16px" }}> </div>
                    <button className="btn btn-primary d-inline-flex align-items-center" >Login</button>
                </form>
            </div>
                {/* Display error message if an error exists */}
            {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)} />}
            </div>
    );
};

export default Login;

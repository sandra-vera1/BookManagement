import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import sunbook from '../images/sunbook.png';
import library from '../images/Library.jpg';

const Login = () => {

    //state variables to manage form input values:
    const [username, setUsername] = useState(''); //store the username
    const [password, setPassword] = useState(''); //store the password

    //function to handle the submition form:
    const submitForm = async (e) => {
        e.preventDefault();

        const user = { username, password};// Creates a new user object with input values

        // Sends a POST request to the API(http://localhost:7000/login/) to validate administrator credentials:
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify(user),// Converts the user object to JSON format
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Handle successful creation from the server:
        const json = await response.json(); // the response body
        if (response.ok) {
            //Save in localstorage and redirect to home page
            
            // Clear fields after successful addition
            setUsername('');
            setPassword('');
            console.log(json, 'Status Code:', response.status);
        } else {
            console.error(json, 'Status Code:', response.status);
        }
    };

    return (
        <div class="login-container">
            
            <div class="login-box">
            <form className="login" onSubmit={submitForm}>

                <label>Username</label>
                <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}   // Updates the 'Username' state //admin
                    value={username}
                    required
                />
                <div style={{ marginTop: "16px" }}> </div>
                <label>Password</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}  // Updates the 'password' state //password123
                    value={password}
                    required
                />
                <div style={{ marginTop: "16px" }}> </div>
                <button className="btn btn-primary d-inline-flex align-items-center">Login</button>
            </form>
            </div>
            {/* Use Link to go to / on button click 
            <Link to="/">
                <button className="btn btn-primary d-inline-flex align-items-center">Login</button>
            </Link>*/}
        </div>
    );
}

export default Login;
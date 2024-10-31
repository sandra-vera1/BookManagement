import sunbook from '../images/sunbook.png';
import { Link } from "react-router-dom"; // Import Link and useHistory for navigation

const Logo = () => {
    return ( 
        <nav className="navbar bg-body-tertiary p-0">
        <div className="container d-flex justify-content-center">
            <Link to="/">
                    <img src={sunbook} class="img-fluid" className="d-block" />
            </Link>
        </div>
    </nav>
       );
}
 
export default Logo;
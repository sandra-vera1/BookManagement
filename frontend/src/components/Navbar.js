import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>Book Management</h1>
            <div className="options">
            {/*PENDING: Validate if iser=Admin show Add New Book, else don't show it*/}
            <Link to="/Create"> <button className="Add">Add New Book</button></Link>
            <button >Logout</button>
            </div>
        </nav>
     );
}
 
export default Navbar;
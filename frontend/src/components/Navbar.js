import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
    <header className="p-3 text-bg-dark">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          {/* <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"/></svg> */}
        </a>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          {/* <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
          <li><a href="#" class="nav-link px-2 text-white">Book</a></li>
          <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
          <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
          <li><a href="#" class="nav-link px-2 text-white">About</a></li> */}
        </ul> 

        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          {/* <input type="search" class="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search"> */}
        </form>

        <div className="text-end">
        <Link to="/Create"><button type="button" className="btn btn-outline-light me-2">Add New book</button></Link>
        <Link to="/Login"><button type="button" className="btn btn-outline-light me-2">Login</button></Link>
        <button type="button" className="btn btn-warning">Logout</button>
        </div>
      </div>
    </div>
  </header>
        
     );
}
 
export default Navbar;


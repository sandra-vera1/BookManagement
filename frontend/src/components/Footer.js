const Footer = () => {
    return ( 
        <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
              {/* <svg class="bi" width="30" height="24"><use xlink:href="#bootstrap"/></svg> */}
            </a>
            <span className="mb-3 mb-md-0 text-body-secondary">&copy; Sandra Vera, Paula Gomez 2024. © All Rights Reserved.</span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            {/* <li class="ms-3"><a class="text-body-secondary" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#twitter"/></svg></a></li>
            <li class="ms-3"><a class="text-body-secondary" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#instagram"/></svg></a></li>
            <li class="ms-3"><a class="text-body-secondary" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#facebook"/></svg></a></li> */}
          </ul>
        </footer>
      </div>
          );
}
 
export default Footer;




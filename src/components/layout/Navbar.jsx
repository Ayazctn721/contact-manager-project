function Navbar({children}) {
  return (
    <nav className="navbar navbar-expand-lg header navbar-dark sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Contact Manager
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
           {children}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

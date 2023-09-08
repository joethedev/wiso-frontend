import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../../assets/Logo-Wiso.webp";
import { Link } from "react-router-dom";
import "../../App.css";

const NavigationBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt="logo" style={{ width: 170 }} />
        </Navbar.Brand>
        <Nav
          className="me-auto"
          style={{ display: "flex", justifyContent: "flex-end", gap: 30 }}
        >
          <Link className="links" to="/">Home</Link>
          <Link className="links" to="/about">About</Link>
          <Link className="links" to="/contact">Contact</Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

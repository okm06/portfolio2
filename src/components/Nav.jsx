import "../assets/css/nav.css";

function Nav() {
  return (
    <nav className="nav">
      <span className="nav-logo">OK</span>
      <ul className="nav-links">
        <li>
          <a href="#skills">Skills</a>
        </li>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;

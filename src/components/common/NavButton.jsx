import { Link } from 'react-router';
import { NavLink } from 'react-router';
import './NavButton.css'

function NavButton({ to, text, callback }) {
  return (
    <>
      <NavLink
        to={to}
        className={
          `${({ isActive }) => (isActive ? 'active' : 'not-active')} text-decoration-none ms-2`
        }
      >
        <span onClick={callback}>{text}</span>
      </NavLink>
    </>
  );
}

export default NavButton;

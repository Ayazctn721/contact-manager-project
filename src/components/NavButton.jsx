import { Link } from 'react-router';

function NavButton({ to, text }) {
  return (
    <>
      <Link
        className="text-decoration-none btn btn-outline-dark btn-sm m-2"
        to={to}
      >
        {text}
      </Link>
    </>
  );
}

export default NavButton;

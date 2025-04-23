import { Outlet, useLocation } from 'react-router';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import NavButton from '../components/common/NavButton';
import Circle from '../components/circle/Circle';
import { isAuthPath } from '../utils/helpers';
import { useGlobalStore } from '../hooks/useGlobalStore'

function RootLayout() {
  // function that identifies if the path is auth group
  const location = useLocation();
  const {store, dispatch} = useGlobalStore();

  const handleLogOut = () => {
    console.log('Logging out...')
    dispatch({
      type: 'SET_USER_ID',
      payload: { user_id: null },
    });
    dispatch({ type: 'SET_AUTH', payload: { isAuthenticated: false } });
  }

  return (
    <>
      <div className="circle-container">
        <Circle width="20rem" positionY="6%" positionX="20%" />
        <Circle width="25rem" positionY="35%" positionX="90%" />
        <Circle width="8rem" positionY="90%" positionX="-3%" />
      </div>

      <div className="main-bg-color min-vh-100 d-flex flex-column">
        <Navbar>
          {isAuthPath(location.pathname) ? (
            <></>
          ) : (
            <>
              <NavButton to="/home" text="Contacts" />
              <NavButton to="/favorites" text="Favorites" />
              <NavButton to="/addcontact" text="Add Contact" />
              <NavButton
                callback={handleLogOut}
                to="/"
                text="Log Out"
              />
            </>
          )}
        </Navbar>

        <main className="flex-grow-1">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default RootLayout;

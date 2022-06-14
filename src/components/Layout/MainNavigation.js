import {useContext} from "react";
import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import AuthContext from "../../store/auth-context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const handleLogout = () => {
      authCtx.logout();
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {/*  want to show login page if user is not logged in*/}
          {!isLoggedIn && (
              <li>
                <Link to='/auth'>Login</Link>
              </li>
          )}

          {/*  want to show the Profile page only if user is logged in*/}
          {isLoggedIn && (
              <li>
                  <Link to='/profile'>Profile</Link>
              </li>
          )}
          {/*  here also logout button only sense if we are logged in*/}
          {isLoggedIn && (
              <li>
                  <button onClick={handleLogout}>Logout</button>
              </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

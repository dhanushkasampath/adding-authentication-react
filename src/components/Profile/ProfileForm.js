import {useRef, useContext} from "react";
import {useHistory} from 'react-router-dom';

import classes from './ProfileForm.module.css';
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const history = useHistory();

  const newPasswordRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
      event.preventDefault();
      const enteredNewPassword = newPasswordRef.current.value;

      //add validations
      let url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAJJS6NoP5zR1TFmJoS4IPz589ObIybWBo';
      fetch(
          url,
          {
              method: 'POST',
              body: JSON.stringify({
                  idToken: authCtx.token,
                  password: enteredNewPassword,
                  returnSecureToken: true
              }),
              headers: {
                  'Content-Type': 'application/json'
              }
          }
      ).then(res => {
          if (res.ok) {
              history.replace('/');//redirect to home page
              return res.json();
          } else {
              res.json().then(data => {
                  let errorMessage = 'Password Change Failed!';
                  throw new Error(errorMessage);
              });
          }
      })
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;

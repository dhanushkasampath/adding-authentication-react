import React, {useState} from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    return adjExpirationTime - currentTime;
}


//below are called named export
export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');//check the local storage when the app starts.
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token; //this returns true if token is there.

    const loginHandler = (token, expirationTime) => {//set the token
        setToken(token);
        localStorage.setItem('token', token);//store the token in local storage

        const remainingTime = calculateRemainingTime(expirationTime);
        setTimeout(logoutHandler, remainingTime);//you can test this by adding a hardcoded value as 3000 milliseconds
    };

    const logoutHandler = () => {//remove the token
        setToken(null);
        localStorage.removeItem('token');//remove the token from local storage when user log-out
    };

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>;
}

export default AuthContext;
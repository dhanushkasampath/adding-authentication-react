import React, {useState, useEffect, useCallback} from "react";
//now we'll refine this timer approach if the user manually logged out.
let logoutTimer;

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

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(storedExpirationDate);

    //if below if block does not execute we know we have more time.
    if(remainingTime <= 60000){//1 minute
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }

    //this is how we return a token
    return {
        token: storedToken,
        duration: remainingTime
    }
}


//below are called named export
export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    let initialToken;
    if(tokenData){//here we check token data is truthy.
        initialToken = tokenData.token;
    }
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token; //this returns true if token is there.

    const loginHandler = (token, expirationTime) => {//set the token
        setToken(token);
        localStorage.setItem('token', token);//store the token in local storage
        localStorage.setItem('expirationTime', expirationTime);//store the expirationTime in local storage

        const remainingTime = calculateRemainingTime(expirationTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);//you can test this by adding a hardcoded value as 3000
        // milliseconds

    };

    //We should ensure that this function is not re-created unnecessarily to prevent
    // infininte loops. For that we can use "CallBacks"
    const logoutHandler = useCallback(() => {//remove the token
        setToken(null);
        localStorage.removeItem('token');//remove the token from local storage when user log-out
        localStorage.removeItem('expirationTime');//remove the expirationTime from local storage when user log-out
        if(logoutTimer){
            clearTimeout(logoutTimer);
        }
    }, []);

    //if tokenData changes this function execute
    useEffect(()=>{
        if(tokenData){
            console.log(tokenData.duration);
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    },[tokenData, logoutHandler]);

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
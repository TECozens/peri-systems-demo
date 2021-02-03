import React from "react";

const Login = () => {
    const [userName, setUserName] = React.useState("");
    const [passWord, setPassWord] = React.useState("");

    return (
        <div>
            <h1>Login:</h1>
            <input type="text" id="username" name="username"/>
            <input type="text" id="password" name="password"/>
        </div>
    );
};

export default Login;
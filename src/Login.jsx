import React from "react";
import LoginFunctions from "./loginScript"

function Login(){
    const { switchToSignUp, switchToLogin } = LoginFunctions();

   

    return(
        <>
        <main>
        <div className="loginContainer">
                {/* Image Container */}
                <div id="blue-background" className="loginBox">
                    <img src="/images/logo_bank.svg" alt="" />
                </div>
            

            {/* Login Form (Login Form) */}
            <div id="login-field" className="loginBox">
                <div className="content">
                    <header><h1>Welcome</h1></header>
                    <p>Login to your account</p>

                    {/* Username and Password Fields */}
                    <input className="input-login" type="text" placeholder="Enter Username" id="username" />
                    <input className="input-login" type="password" placeholder="Enter Password" id="password" />

                    {/* Submit Button */}
                    <input type="submit" value="Login" className="sub" id="login-submit" />

                    <p id="login-message"></p>
                    {/* <p id="no-account-message" onClick={switchField}>Don't have an account? Sign up here!</p> */}
                    <p id="no-account-message">
                        Don't have an account yet? <a href="#" onClick={(e) => switchToSignUp(e)}>Sign up</a>
                    </p>
                </div>
            </div>


            {/* Create Account Form Field*/}
            <div id="create-account-field" className="loginBox">
                <div className="content">
                    <header><h1>Welcome</h1></header>
                    <p>Create an account</p>

                    {/* Username and Password Fields */}
                    <input className="input-login" type="text" placeholder="Create Username" id="create-account-username" />
                    <input className="input-login" type="password" placeholder="Create Password" id="create-account-password" />

                    {/* Submit Button */}
                    <input type="submit" value="Create Account" className="sub" id="submit" />

                    <p id="create-message"></p>
                    {/* <p id="already-login-message" >Already signed up? Click here!</p> */}
                    <p id="already-login-message">
                        Already signed up? <a href="#" onClick={(e) => switchToLogin(e)}>Sign in</a>
                    </p>
                </div>
            </div>
        </div>
        </main>
        </>
    );
}

export default Login
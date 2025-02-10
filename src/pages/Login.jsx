import React from "react";
import LoginFunctions from "../loginScript"
import { setDocumentTitle } from "../script";


function Login(){
    setDocumentTitle("Login");
    
    const {
        Username,
        setUsername,
        Password,
        setPassword,
        signUpButton,
        signInButton,
        switchToSignUp, 
        switchToLogin,
     } = LoginFunctions();



    return(
        <>
        <main>
        <div className="loginContainer">
                {/* Image Container */}
                <div id="blue-background" className="loginBox">
                    <img src="/images/logo_bank.svg" alt="" />
                </div>
            

            {/* Login Form (Login Form) */}
            <form onSubmit={signInButton} id="login-field" className="loginBox">
                <div className="content">
                    <header><h1>Welcome</h1></header>
                    <p>Login to your account</p>

                    {/* Username and Password Fields */}
                    <input className="input-login" type="text" placeholder="Enter Username" id="username" 
                    value={Username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required />

                    <input className="input-login" type="password" placeholder="Enter Password" id="password" 
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required />

                    {/* Submit Button */}
                    <input type="submit" value="Login" className="sub" id="login-submit" />

                    <p id="login-message"></p>

                    <p id="no-account-message">
                        Don't have an account yet? <a href="#" onClick={(e) => switchToSignUp(e)}>Sign up</a>
                    </p>
                </div>
            </form>


            {/* Create Account Form Field*/}
            
            <form onSubmit={signUpButton} id="create-account-field" className="loginBox">
                <div className="content">
                    <header><h1>Welcome</h1></header>
                    <p>Create an account</p>

                    {/* Username and Password Fields */}
                    <input className="input-login" type="text" placeholder="Create Username" id="create-account-username" 
                    value={Username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required />

                    <input className="input-login" type="password" placeholder="Create Password" id="create-account-password" 
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required />

                    {/* Submit Button */}
                    <input type="submit" value="Create Account" className="sub" id="submit" />

                    <p id="create-message"></p>
                    <p id="already-login-message">
                        Already signed up? <a href="#" onClick={(e) => switchToLogin(e)}>Sign in</a>
                    </p>
                </div>
            </form>
        </div>
        </main>
        </>
    );
}

export default Login
import React, { useState } from "react";

/**
 * Function for login method when user enter's their username and 
 * password correctly
 */
const LoginFunctions = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // username = document.getElementById('username').value;
    // password = document.getElementById('password').value;

    // if(username.trim() === "" && password.trim() === ""){
    //     alert("Login Username and Password Fields are empty.")
    //     loginFailedMessage()
    // }
    // else if(username.trim() === ""){
    //     alert("Login Username field is empty.")
    //     loginFailedMessage();
    // }
    // else if(password.trim() === ""){
    //     alert("Login Password field is empty")
    //     loginFailedMessage();
    // }
    // else{
    //     loginSuccessMessage(username);
    // }



    //add a function when user logs in correctly


    function loginSuccessMessage(user){
        localStorage.setItem("username", user)

        document.getElementById('login-message').innerHTML = "Logging in! Loading...";
        document.getElementById('login-message').style.color = "green";


        //Add a little delay and then switch to the main menu
        setTimeout(function(){
            window.location.href = "dashboard.html";
        }, 2000);

    }


    function loginFailedMessage(){
        document.getElementById('login-message').innerHTML = "Try again!";
        document.getElementById('login-message').style.color = "#ff014f";
    }







    function createAccountSuccessMessage(user){
        localStorage.setItem("username", user)

        document.getElementById('create-message').innerHTML = "Account created! Loading...";
        document.getElementById('create-message').style.color = "green";


        //Add a little delay and then switch to the main menu
        setTimeout(function(){
            window.location.href = "dashboard.html";
        }, 2000);

    }


    function createAccountFailedMessage(){
        document.getElementById('create-message').innerHTML = "Try again!";
        document.getElementById('create-message').style.color = "#ff014f";
    }

    function createAccount(){
        let username = document.getElementById('create-account-username').value;
        let password = document.getElementById('create-account-password').value;
        if(username.trim() === "" && password.trim() === ""){
            alert("Create Username and Password Fields are empty.")
            createAccountFailedMessage()
        }
        else if(username.trim() === ""){
            alert("Create Username field is empty.")
            createAccountFailedMessage();
        }
        else if(password.trim() === ""){
            alert("Create Password field is empty")
            createAccountFailedMessage();
        }
        else{
            createAccountSuccessMessage(username);
        }
    }


    function switchToSignUp(e) {
        e.preventDefault();
        document.getElementById('create-account-field').style.display = "flex";
        document.getElementById('login-field').style.display = "none";
    }

    function switchToLogin(e) {
        e.preventDefault();
        document.getElementById('create-account-field').style.display = "none";
        document.getElementById('login-field').style.display = "flex";
    }

    return{
        switchToSignUp,
        switchToLogin
    };
}


export default LoginFunctions;




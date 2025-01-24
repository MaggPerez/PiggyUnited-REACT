import React, { useState } from "react";
import { ref, set, get } from 'firebase/database';
import { database } from "./firebase";
import { useNavigate } from "react-router-dom";

/**
 * Function for login method when user enter's their username and 
 * password correctly
 */
const LoginFunctions = () => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [UserID] = useState(new Date().getTime()); //Unique ID for the user

    const[userData, setUserData] = useState(null);
    const [error, setError] = useState("");

    const navigate = useNavigate();



    /**
     * Function that signs up the user.
     * Takes in username and password and adds it to the database.
     * Unique ID is generated for the user.
     * @param e
     */
    function signUpButton(e){

        //Prevent the form from submitting
        e.preventDefault();
        
        
        //Adding user's data to the database
            set(ref(database, `users/${Username}`), {
            Username: Username,
            Password: Password,
            UserID: UserID,
            })
            .then(() => {
                //Displays message that the account was created successfully
                createAccountSuccessMessage(Username);
                setUsername('');
                setPassword('');
            })
            .catch((error) => {
                console.error('Error writing data: ', error);
            });
    }



    /**
     * Function that logs in the user.
     * Takes in username and password and checks if it matches the database.
     * If it matches, it logs in the user.
     * @param {*} e 
     */
    const signInButton = async (e) => {
        //Prevent the form from submitting
        e.preventDefault();

        try {
            //Getting user's data from the database by their username
            const userRef = ref(database, `users/${Username}`);
            const snapshot = await get(userRef);

            //Checking to see if the user exists
            if(snapshot.exists()){
                const user = snapshot.val();

                //Checking to see if the user's password is correct
                if(user.Password === Password){
                    loginSuccessMessage(user)
                    setUserData(user);
                    setError("");
                    console.log("User logged in successfully!");

                    
                }
                else{
                    //If the user's password is incorrect, display an error message
                    setError("Incorrect password");
                    loginFailedMessage();
                }
            }
            else{
                //If the user does not exist, display an error message
                setError("User does not exist");
                document.getElementById('login-message').innerHTML = "User does not exist!";
                document.getElementById('login-message').style.color = "#ff014f";
            }


        } catch (error) {
            console.error("Error during sign in", error)
            setError("Error during sign in");
        }
        
    
    }


    /**
     * Function that shows user that their login was successful
     * @param {*} user 
     */
    function loginSuccessMessage(user){
        localStorage.setItem("username", user)

        document.getElementById('login-message').innerHTML = "Logging in! Loading...";
        document.getElementById('login-message').style.color = "green";


        //Add a little delay and then switch to the main menu
        setTimeout(function(){
            navigate('/dashboard');
        }, 2000);

    }


    /**
     * Function that tells the user their login failed if they put an incorrect password
     */
    function loginFailedMessage(){
        document.getElementById('login-message').innerHTML = "Incorrect Password, Try again!";
        document.getElementById('login-message').style.color = "#ff014f";
    }



    /**
     * Function that tells user that their account creation was a success
     * @param {*} user 
     */
    function createAccountSuccessMessage(user){
        localStorage.setItem("username", user)

        document.getElementById('create-message').innerHTML = "Account created! Loading...";
        document.getElementById('create-message').style.color = "green";


        //Add a little delay and then switch to the main menu
        setTimeout(function(){
            navigate('/dashboard');
        }, 2000);

    }



    /**
     * Function to switch to sign up field
     * @param {*} e 
     */
    function switchToSignUp(e) {
        e.preventDefault();
        document.getElementById('create-account-field').style.display = "flex";
        document.getElementById('login-field').style.display = "none";
    }


    /**
     * Function to switch to sign in field
     * @param {*} e 
     */
    function switchToLogin(e) {
        e.preventDefault();
        document.getElementById('create-account-field').style.display = "none";
        document.getElementById('login-field').style.display = "flex";
    }

    return{
        Username,
        setUsername,
        Password,
        setPassword,
        UserID,
        signUpButton,
        signInButton,
        switchToSignUp,
        switchToLogin
    };
}


export default LoginFunctions;




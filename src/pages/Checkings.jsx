import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import { addUser, getUsers, getBalance, setDeposit, setWithdraw } from '../Bank';
import PageComponent from "../PageComponent";
import Balance from "../Balance";

import { setDocumentTitle } from "../script";





function Checkings(){
    setDocumentTitle("Checkings")
    const [balance, setBalance] = useState(0)
    const [userAmount, setAmount] = useState("");
    const [withdraw, setWithdrawal] = useState(0);

    const [isActive, setActive] = useState(null);

    /**
     * Retrieves user's available balance for checkings
     */
    useEffect(() => {
        async function fetchBalance(){
            const data = await getBalance('checkings');
            setBalance(data.balance);
        }
        fetchBalance();
    }, []);


    /**
     * Function to deposit user's amount into firebase
     */
    const handleDeposit = async () => {
        const arrayList = ["5", "10", "20", "50", "100"];
        
        //If an amount choice was selected and the user puts in a value, both gets added into one
        if(isActive && userAmount !== ""){
            for(let i = 0; i < arrayList.length; i++){
                if(isActive === arrayList[i]){

                    //Adding both amount choice and user's value
                    handleAmountOptions(Number(arrayList[i]) + userAmount);
                }
            }
        }
        //Checking if one of the pre-selected choices was chosen
        else if(isActive){

            //If a pre-selected choice was picked and it equals "5 or 10 or 20, etc," it will get deposited
            for(let i = 0; i < arrayList.length; i++){
                if(isActive === arrayList[i]){
                    handleAmountOptions(Number(arrayList[i]));
                }
            }

        }
            //If none of the choices were selected and input field is empty, an alert will be sent
        else if(userAmount === ""){
            alert("Enter amount");
        }
        else{
            await setDeposit(userAmount, setBalance);

            //Clears the input field
            setAmount('');
        }
    }

    /**
     * 
     * @param {The pre} amountChoice 
     */
    const handleAmountOptions = async (amountChoice) => {
        await setDeposit(amountChoice, setBalance);

        //Clearing input field and deselecting amount choice
        setActive('');
        setAmount('');
    }

    /**
     * Function to withdraw user's amount into firebase
     */
    const handleWithdrawal = async () => {
        if(userAmount === ""){
            alert("Enter amount");
        }
        else{
            await setWithdraw(userAmount, setBalance);

            //Clears the input field
            setAmount('');
        }
    }

    /**
     * Continue working here
     * @param {*} button 
     */
    const handleClick = async (selectedButton) => {
        setActive(selectedButton);
    }


    //              Continue adding functions to the withdraw

    return (
        <>
            <Sidebar />
            <main className="main">
                {/* Add link to go back */}
                <Link to="/dashboard"><button className="back-button">Exit Checkings</button></Link>
                    
                    {/* Displaying title name and setting page name */}
                <h1><PageComponent /></h1>
                {/* <h1>Checkings</h1> */}
                <h3>What would you like to do?</h3>

                {/* Banner showcasing the user's available balance */}
                <div className="banner">
                    <div className="banner-text">
                        <h1>{`$${balance.toFixed(2)}`}</h1>
                        <p>Available Balance</p>
                    </div>
                </div>


                {/* Container that contains all transaction behaviors */}
                <div className="transaction-container">
                    {/* Field for user to select pre-selected choices */}
                    <div className="amount-box">
                        <h2>Pre-selected Choices</h2>

                        {/* Button Choices */}
                        <button className="amount-button" onClick={() => handleClick("5")} 
                            style={{backgroundColor: isActive === "5" ? "#4169e1" : ""}} >$5</button>
                        
                        <button className="amount-button" onClick={() => handleClick("10")} 
                            style={{backgroundColor: isActive === "10" ? "#4169e1" : ""}}>$10</button>
                        
                        <button className="amount-button" onClick={() => handleClick("20")}
                            style={{backgroundColor: isActive === "20" ? "#4169e1" : ""}}>$20</button>
                        
                        <button className="amount-button" onClick={() => handleClick("50")}
                            style={{backgroundColor: isActive === "50" ? "#4169e1" : ""}}>$50</button>
                        
                        <button id="amount-width" className="amount-button" onClick={() => handleClick("100")}
                            style={{backgroundColor: isActive === "100" ? "#4169e1" : ""}}>$100</button>
                    </div>

                    {/* Field for user to add amount */}
                    <div className="transaction-box">
                        <h2 id="transaction-status">Enter Amount</h2>
                        <input type="number" name="Amount" id="amount-field" className="input-box"
                        value={userAmount}
                        onChange={(e) => setAmount(Number(e.target.value))} />
                    </div>

                    {/* Field for user to deposit or withdraw */}
                    <div className="transaction-box">
                        <h2>Select your choice:</h2>
                        <div id="hover-mode-deposit" onClick={handleDeposit} className="box"><h1>Deposit</h1></div>
                        <div id="hover-mode-withdraw" onClick={handleWithdrawal} className="box"><h1>Withdraw</h1></div>
                    </div>

                </div>
            </main>
        </>
    );
}

export default Checkings;
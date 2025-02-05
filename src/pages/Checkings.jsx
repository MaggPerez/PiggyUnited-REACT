import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import { addUser, getUsers, getBalance, setDeposit, setWithdraw } from '../Bank';
import PageComponent from "../PageComponent";
import Balance from "../Balance";



function Checkings(){
    const [balance, setBalance] = useState(0)
    const [userAmount, setAmount] = useState("");
    const [withdraw, setWithdrawal] = useState(0);

    const [isActive, setActive] = useState(null);

    useEffect(() => {
        async function fetchBalance(){
            const data = await getBalance('checkings');
            setBalance(data.balance);
        }
        fetchBalance();
    }, []);


    /**
     * Function to deposit user's amount
     */
    const handleDeposit = async () => {
        if(userAmount === ""){
            alert("Enter amount");
        }
        else{
            await setDeposit(userAmount, setBalance);

        }
    }

    /**
     * Function to withdraw user's amount
     */
    const handleWithdrawal = async () => {
        if(userAmount === ""){
            alert("Enter amount");
        }
        else{
            await setWithdraw(userAmount, setBalance);
        }
    }

    /**
     * Continue working here        ****************************************************
     * @param {*} button 
     */
    const handleClick = async (button) => {
        setActive(button);
    }




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
                        <button className="amount-button" value="5" onClick={"5"}>$5</button>
                        <button className="amount-button" value="10">$10</button>
                        <button className="amount-button" value="20">$20</button>
                        <button className="amount-button" value="50">$50</button>
                        <button id="amount-width" className="amount-button" data-value="100" >$100</button>
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
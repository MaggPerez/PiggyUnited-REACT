import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar";
import { getBalance, setDeposit, setWithdraw } from '../Bank';
import PageTitle from "../components/PageTitle";

import { setDocumentTitle } from "../script";
import AmountButton from "../components/AmountButton";

function CD() {
    setDocumentTitle("CD")
    const [balance, setBalance] = useState(0)
    const [userAmount, setAmount] = useState("");

    const [isActive, setActive] = useState(null);


    const bankAccount = "cd";

    //List of numbers that will be used to compare choose which amount option the user picks
    const arrayList = ["5", "10", "20", "50", "100"];



    /**
     * Retrieves user's available balance for checkings
     */
    useEffect(() => {
        // Makes sure the screen goes to the top
        window.scrollTo(0, 0);

        async function fetchBalance() {
            const data = await getBalance(bankAccount, sessionStorage.getItem('username'));
            setBalance(data.balance);
        }
        fetchBalance();
    }, []);




    /**
     * Function for the default amount choices the user picks to make a transactions
     * @param {default choices the user can pick to make a transaction} amountChoice 
     * @param {will be used to check if the user clicks on deposit or withdraw} action 
     */
    const handleAmountOptions = async (amountChoice, action) => {
        if (action === 'deposit') {
            await setDeposit(bankAccount, sessionStorage.getItem('username'), amountChoice, setBalance);

        }
        else {
            await setWithdraw(bankAccount, sessionStorage.getItem('username'), amountChoice, setBalance);
        }

        //Clearing input field and deselecting amount choice
        setActive('');
        setAmount('');
    }




    /**
     * Function that handles user's transactions for deposit and withdraw.
     * @param {*} action 
     */
    const handleTransaction = async (action) => {

        //If an amount choice was selected and the user puts in a value, both gets added into one
        if (isActive && userAmount !== "") {

            for (let i = 0; i < arrayList.length; i++) {
                if (isActive === arrayList[i]) {

                    //Adding both amount choice and user's value
                    handleAmountOptions(Number(arrayList[i]) + userAmount, action);
                }
            }
        }

        //Checking if one of the pre-selected choices was chosen
        else if (isActive) {

            //If a pre-selected choice was picked and it equals "5 or 10 or 20, etc," it will get withdrawn
            for (let i = 0; i < arrayList.length; i++) {
                if (isActive === arrayList[i]) {
                    handleAmountOptions(Number(arrayList[i]), action);
                }
            }

        }

        //If none of the choices were selected and input field is empty, an alert will be sent
        else if (userAmount === "") {
            alert("Enter amount");
        }

        else {

            //Checking to see if the user clicked on deposit or withdraw to proceed with the transactions
            if (action === 'deposit') {
                await setDeposit(bankAccount, sessionStorage.getItem('username'), userAmount, setBalance);
            }
            else {

                await setWithdraw(bankAccount, sessionStorage.getItem('username'), userAmount, setBalance);
            }

            //Clears the input field
            setAmount('');
        }

    }



    /**
     * Functions that highlights the amount choices depending on which the user picks
     * @param {*} button 
     */
    const handleClick = async (selectedButton) => {
        setActive(selectedButton);
    }


    return (
        <>
            <Sidebar />
            <main className="main">
                <Link to="/dashboard"><button className="back-button">Exit CD</button></Link>

                {/* Displaying page name*/}
                <h1><PageTitle /></h1>

                <h3>What would you like to do?</h3>

                {/* Banner */}
                <div className="banner">
                    <div className="banner-text">
                        <h1>{`$${balance.toFixed(2)}`}</h1>
                        <p>Available Balance</p>
                    </div>
                </div>

                {/* Container that contains all transaction behaviors */}
                <div className="transaction-container">
                    {/* Field for user to select pre-selected choices */}
                    <AmountButton activateActive={isActive} activateHandleClick={handleClick}></AmountButton>

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
                        <button id="deposit-button" onClick={() => handleTransaction('deposit')} className="box"><h1>Deposit</h1></button>
                        <button id="withdraw-button" onClick={() => handleTransaction('withdraw')} className="box"><h1>Withdraw</h1></button>
                    </div>

                </div>
            </main>
        </>
    );
}

export default CD
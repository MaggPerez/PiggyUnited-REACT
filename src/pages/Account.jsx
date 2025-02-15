import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { setDocumentTitle } from "../script";
import { useState, useEffect } from "react";
import { getAllBalance } from "../Bank";

function Account(){
    setDocumentTitle("Account")
    const[checkingBalance, setCheckingBalance] = useState(0);
    const[savingsBalance, setSavingsBalance] = useState(0);
    const[cdBalance, setCDBalance] = useState(0);

    //List of all accounts
    const list_of_accounts = ["checkings", "savings", "cd"];

    useEffect(() => {
        window.scrollTo(0,0);

        //Fetching all balances from firebase
        async function fetchAllBalance() {
            const data = await getAllBalance(list_of_accounts, sessionStorage.getItem('username'));

            //Displaying all of user's balances
            setCheckingBalance(data[0].balance), setSavingsBalance(data[1].balance), 
            setCDBalance(data[2].balance);
        }
        fetchAllBalance();
    });


    return(
        <>
            <Sidebar />
            <main className="main">
                <h1>Account</h1>
                <h3>Click to View Your Accounts</h3>

                <div className="container">

                    {/* Checkings Account */}
                    <div id="hover-mode" className="box">
                        <Link to="/checkings" className="link">
                            <div className="box-content">
                                <img src="images/Checkings_Icon.svg" alt="Checkings Icon" />
                                <h1>Checkings</h1>
                                <p>{checkingBalance === undefined ? "$0.00" : `$${checkingBalance.toFixed(2)}`}</p>
                                <p>Click to view</p>
                            </div>
                        </Link>
                    </div>

                    {/* Savings Account */}
                    <div id="hover-mode" className="box">
                        <Link to="/savings" className="link">
                            <div className="box-content">
                                <img src="images/savings_icon.svg" alt="Savings Icon" />
                                <h1>Savings</h1>
                                <p>{savingsBalance === undefined ? "$0.00" : `$${savingsBalance.toFixed(2)}`}</p>
                                <p>Click to view</p>
                            </div>
                        </Link>
                    </div>

                    {/* CD Account */}
                    <div id="hover-mode" className="box">
                        <Link to="/cd" className="link">
                            <div className="box-content">
                                <img src="images/cd_icon.svg" alt="CD Icon" />
                                <h1>CD</h1>
                                <p>{cdBalance === undefined ? "$0.00" : `$${cdBalance.toFixed(2)}`}</p>
                                <p>Click to view</p>
                            </div>
                        </Link>
                    </div>
                    
                </div>
            </main>
        </>
    );
}

export default Account;
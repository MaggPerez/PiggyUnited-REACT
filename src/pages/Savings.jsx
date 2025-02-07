import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import { addUser, getUsers, getBalance, setWithdraw } from '../Bank';
import PageComponent from "../PageComponent";
import Balance from "../Balance";
import { setDocumentTitle } from "../script";

function Savings(){
    setDocumentTitle("Savings")
    return(
        <>
            <Sidebar />
            <main className="main">
                <Link to="/dashboard"><button className="back-button">Exit Savings</button></Link>
                <h1><PageComponent pageName="Savings" /></h1>
                <h3>What would you like to do?</h3>

                {/* Banner */}
                <div className="banner">
                    <div className="banner-text">
                        <Balance account="savings" id="savings-balance" />
                        <p>Available Balance</p>
                    </div>
                </div>

                {/* Container having transaction behaviors */}
                <div className="container">
                    <div className="box">
                        <h2 id="transactions-status">Select your choice</h2>
                        <input className="input-box" type="number" name="Amount" id="amount-field" />
                    </div>

                    {/* Buttons */}
                    <div id="hover-mode-deposit" className="box"><h1>Deposit</h1></div>
                    <div id="hover-mode-withdraw" onClick={setWithdraw} className="box"><h1>Withdraw</h1></div>
                </div>
            </main>
        </>
    );
}

export default Savings;
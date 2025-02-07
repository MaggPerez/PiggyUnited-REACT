import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import Balance from "../Balance";
import { setDocumentTitle } from "../script";

function CD(){
    setDocumentTitle("CD")
    return(
        <>
        <Sidebar />
        <main className="main">
            <Link to="/dashboard"><button className="back-button">Exit CD</button></Link>
            <h1>CD</h1>
            <h3>What would you like to do?</h3>

            {/* Banner */}
            <div className="banner">
                <div className="banner-text">
                    <Balance account="cd" id="cd-balance" />
                    <p>Available Balance</p>
                </div>
            </div>

            {/* Container having transaction behaviors */}
            <div className="container">
                <div className="box">
                    <h2 id="transaction-status">Select your choice</h2>
                    <input className="input-box" type="number" name="Amount" id="amount-field" />
                </div>
                <div id="hover-mode-deposit" className="box"><h1>Deposit</h1></div>
                <div id="hover-mode-deposit" className="box"><h1>Withdraw</h1></div>
            </div>
        </main>
        </>
    );
}

export default CD
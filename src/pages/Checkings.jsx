import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import { addUser, getUsers, getUser, updateUser } from '../Bank';





function Checkings(){

    return (
        <>
            <Sidebar />
            <main className="main">
                {/* Add link to go back */}
                <Link to="/dashboard"><button className="back-button">Exit Checkings</button></Link>
                <h1>Checkings</h1>
                <h3>What would you like to do?</h3>

                {/* Banner showcasing the user's available balance */}
                <div className="banner">
                    <div className="banner-text">
                        <h1 id="checkings-balance">$0.00</h1>
                        <p>Available Balance</p>
                    </div>
                </div>


                {/* Container that contains all transaction behaviors */}
                <div className="transaction-container">
                    {/* Field for user to select pre-selected choices */}
                    <div className="amount-box">
                        <h2>Pre-selected Choices</h2>
                        <button className="amount-button" data-value="5">$5</button>
                        <button className="amount-button" data-value="10">$10</button>
                        <button className="amount-button" data-value="20">$20</button>
                        <button className="amount-button" data-value="50">$50</button>
                        <button id="amount-width" className="amount-button" data-value="100" >$100</button>
                    </div>

                    {/* Field for user to add amount */}
                    <div className="transaction-box">
                        <h2 id="transaction-status">Enter Amount</h2>
                        <input type="number" name="Amount" id="amount-field" className="input-box" />
                    </div>

                    {/* Field for user to deposit or withdraw */}
                    <div className="transaction-box">
                        <h2>Select your choice:</h2>
                        <div id="hover-mode-deposit" onClick={updateUser} className="box"><h1>Deposit</h1></div>
                        <div id="hover-mode-withdraw" onClick={getUser} className="box"><h1>Withdraw</h1></div>
                    </div>

                </div>
            </main>
        </>
    );
}

export default Checkings;
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";

function Account(){
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
                                <p id="checkings-balance">$0.00</p>
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
                                <p id="savings-balance">$0.00</p>
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
                                <p id="cd-balance">$0.00</p>
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
import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";


function Dashboard() {
    const name = localStorage.getItem("username");
    return(
        <>
            <Sidebar />
            <main className="main">
                <h1>Dashboard</h1>
                <h3 id="welcome-user">Welcome {name}! Select your desired choice below.</h3>

                <div id="main-container" className="container">

                    {/* Checkings Option */}
                    <div id="hover-mode" className="box">
                        <Link className="link" to="/checkings">
                            <div className="box-content">
                                <img src="images/Checkings_Icon.svg" alt="Checkings Icon" />
                                <h1>Checkings</h1>
                            </div>
                        
                        </Link>
                    </div>

                    {/* Savings Option */}
                    <div id="hover-mode" className="box">
                        <Link className="link" to="/savings">
                            <div className="box-content">
                                <img src="images/savings_icon.svg" alt="Savings Icon" />
                                <h1>Savings</h1>
                            </div>
                        </Link>
                    </div>

                    {/* CD Window */}
                    <div id="hover-mode" className="box">
                        <Link className="link" to="/cd">
                            <div className="box-content">
                                <img src="images/cd_icon.svg" alt="CD Icon" />
                                <h1>CD</h1>
                            </div>
                        </Link>
                    </div>

                    {/* Credit Card Window */}
                    <div id="hover-mode" className="box">
                        <div className="box-content">
                            <img src="images/Credit_Card.svg" alt="Credit Card Icon" />
                            <h1>Credit Cards (Coming Soon)</h1>
                        </div>
                    </div>

                    {/* History Window */}
                    <div id="hover-mode" className="box">
                        <Link className="link" to="/history">
                            <div className="box-content">
                                <img src="images/history_icon.svg" alt="History Icon" />
                                <h1>History</h1>
                            </div>
                        
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Dashboard;
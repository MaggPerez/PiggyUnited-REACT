import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import { setDocumentTitle } from "../script";

function History(){
    setDocumentTitle("History")
    return(
        <>
            <Sidebar />
            <main className="main">
                <h1>History</h1>

                <table>
                    <tr>
                        <th title="Type of account, e.g, Savings, Checkings">Account</th>
                        <th title="User's Transaction Amount">Amount</th>
                        <th title="Type of transaction">Transaction</th>
                        <th title="Balance available after the transaction">Available Balance</th>
                        <th title="Date">Date</th>
                    </tr>
                </table>
            </main>
        </>
    );
}

export default History
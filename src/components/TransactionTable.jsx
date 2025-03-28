import { useState, useEffect } from "react";
import { getTransactionHistory } from "../Bank";

function TransactionTable() {
    const [transData, setTransData] = useState([]);

    useEffect(() => {
        async function fetchHistory() {
            try {
                //getting transaction data in array format
                const loadedData = await getTransactionHistory();

                //setting the TransData
                setTransData(loadedData || []);
            } catch (error) {
                console.error(error)
            }
        }

        fetchHistory();
    }, []);



    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th title="Type of account, e.g, Savings, Checkings">Account</th>
                        <th title="User's Transaction Amount">Amount</th>
                        <th title="Type of transaction">Transaction</th>
                        <th title="Balance available after the transaction">Available Balance</th>
                        <th title="Date">Date</th>
                    </tr>
                    {transData.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.Account}</td>
                                <td>${val.Amount.toFixed(2)}</td>
                                <td>{val.TransactionType}</td>
                                <td>${val.AvailableBalance.toFixed(2)}</td>
                                <td>{val.Date}</td>
                            </tr>
                        );
                    })}
                </thead>
            </table>
        </div>
    );
}
export default TransactionTable;
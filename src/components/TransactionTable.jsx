import { useState, useEffect } from "react";

function TransactionTable() {
    const [transData, setTransData] = useState([]);

    useEffect(() => {
        const loadedData = JSON.parse(localStorage.getItem('transactions')) || []
        setTransData(loadedData);
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
                                <td>{val.account}</td>
                                <td>${val.amount.toFixed(2)}</td>
                                <td>{val.transactionType}</td>
                                <td>${val.availableBalance.toFixed(2)}</td>
                                <td>{val.date}</td>
                            </tr>
                        )
                    })}
                </thead>
            </table>
        </div>
    );
}
export default TransactionTable;
import Sidebar from "../components/Sidebar";
import { setDocumentTitle } from "../script";
import TransactionTable from "../components/TransactionTable";
import PageTitle from "../components/PageTitle";
import { deleteTransactionHistory } from "../Bank";


function History() {
    setDocumentTitle("History")

    function handleHistoryOptions(button) {
        if(button === "delete-button"){
            deleteTransactionHistory();
        }
        else if(button === "download-button"){
            alert("Download option coming soon!")
        }
    }


    return (
        <>
            <Sidebar />
            <main className="main">

                {/* Displaying page name*/}
                <h1><PageTitle /></h1>

                {/* Buttons */}
                <div className="history-container">
                    {/* Delete History */}
                    <button onClick={() => handleHistoryOptions('delete-button')} id="delete-button" className="history-button">Delete History</button>

                    {/* Download History */}
                    <button onClick={() => handleHistoryOptions('download-button')} id="download-button" className="history-button">Download History</button>
                </div>

                <TransactionTable  />

            </main>
        </>
    );
}

export default History

import Sidebar from "../components/Sidebar";
import { setDocumentTitle } from "../script";
import TransactionTable from "../components/TransactionTable";
import PageTitle from "../components/PageTitle";

function History() {
    setDocumentTitle("History")

    return (
        <>
            <Sidebar />
            <main className="main">

                {/* Displaying page name*/}
                <h1><PageTitle /></h1>

                <TransactionTable />

            </main>
        </>
    );
}

export default History
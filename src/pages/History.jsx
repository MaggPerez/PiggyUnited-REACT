
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { setDocumentTitle } from "../script";
import TransactionTable from "../components/TransactionTable";

function History(){
    setDocumentTitle("History")

    return(
        <>
            <Sidebar />
            <main className="main">
                <h1>History</h1>
                <TransactionTable />
                
            </main>
        </>
    );
}

export default History
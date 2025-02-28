export const addTransaction = (count, amount, transactionType, availableBalance, date) => {
    
}


class Transactions{
    constructor(){
        let blank = 0;
    }

        // Function to add a transaction to local storage
        /**
         * 
         * Function that adds transaction data to local storage 
         * that will be displayed in the history page.
         * 
         * 
         * Takes in the following things
         * - The account type (Checkings or savings)
         * - The amount the user puts in
         * - Transaction type such as deposit or withdrawal
         * - Their current available balance
         * - Today's date
         * 
         * 
         * @param {*} account 
         * @param {*} amount 
         * @param {*} transactionType 
         * @param {*} availableBalance 
         * @param {*} date 
         */
    // addTransaction(account, amount, transactionType, availableBalance, date){
    //     console.log("This working")
    //     if(transactionType === "Deposit"){
    //         let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    //         transactions.push({ account, amount, transactionType, availableBalance, date });
    //         localStorage.setItem('transactions', JSON.stringify(transactions));

    //     }
    //     else{
    //         amount = amount * -1;
    //         let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    //         transactions.push({ account, amount, transactionType, availableBalance, date });
    //         localStorage.setItem('transactions', JSON.stringify(transactions));
    //     }

    // }



    /**
     * Method to display all transaction behaviors created. 
     */
    displayTransactions(){
        const table = document.querySelector('.main table');
        if (table) {
            console.log("This ran so table exists")
            const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
            transactions.forEach(transaction => {
                const newRow = table.insertRow(-1);
                const accountCell = newRow.insertCell(0);
                const amountCell = newRow.insertCell(1);
                const transactionCell = newRow.insertCell(2);
                const availableBalanceCell = newRow.insertCell(3);
                const date = newRow.insertCell(4);
                
                accountCell.textContent = transaction.account;
                amountCell.textContent = `$${transaction.amount.toFixed(2)}`;
                transactionCell.textContent = transaction.transactionType;
                availableBalanceCell.textContent = `$${transaction.availableBalance.toFixed(2)}`;
                date.textContent = transaction.date;
            });
        }
    }


    /**
     * Method to create current date object
     * @returns Current Date
     */
    createDate(){
        //Creating today's date object
        var currentDate = new Date();
        var month = currentDate.getMonth() + 1;
        var day = currentDate.getDate();
        var year = currentDate.getFullYear();

        //Returning date in its format
        return month + "/" + day + "/" + year;
    }

}

//Ensures that displayTransaction() method is called when the DOM has fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const transaction = new Transactions();
    transaction.displayTransactions();
});


export default Transactions;

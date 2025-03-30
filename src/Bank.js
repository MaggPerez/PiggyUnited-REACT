import { db } from "./firebase"
import { getDoc, setDoc, getDocs, doc, updateDoc, collection, writeBatch } from "firebase/firestore"
import { ref, get } from 'firebase/database';
import { database } from "./firebase";




// Function to add a user
export const addUser = async (bankAccount, name, depositAmount, setBalance) => {
  try {
    await setDoc(doc(db, bankAccount, name), {
      balance: Number(depositAmount)
    });
    setBalance(depositAmount);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};


/**
 * Function to automatically add Checking or Savings, or CD Account
 * @param {string} bankAccount 
 * @param {number} name 
 * @param {number} amount 
 * @returns 
 */
export const addAccount = async (bankAccount, name, amount) => {
  try {
    await setDoc(doc(db, bankAccount, name), {
      balance: Number(amount)
    });
    return { balance: amount }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};


/**
 * Function that gets user from firebase
 */
export const getUser = async () => {
  try {
    const userRef = ref(database, `users/${Username}`)
    const snapshot = await get(userRef);

    const user = snapshot.val();
    console.log(user)
  }
  catch (error) {

  }
}


/**
 * Gets user info based on what account they are on
 * @param {string} bankAccount 
 * @param {string} name 
 * @returns user's balance based on the account they're on
 */
export const getBalance = async (bankAccount, name) => {
  try {
    const userRef = doc(db, bankAccount, name);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      let balance = userSnap.data().balance;
      return { balance: balance }
    } else {
      console.log("No such user found!");
      return { balance: 0 }
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};


/**
 * Function to get all balances 
 * @param {string[]} arrayAccounts 
 * @param {string} name 
 * @returns all of the user's account
 */
export const getAllBalance = async (arrayAccounts, name) => {
  try {

    //Getting all references for checkings, savings, and cd
    const checkingsRef = doc(db, arrayAccounts[0], name);
    const savingsRef = doc(db, arrayAccounts[1], name);
    const cdRef = doc(db, arrayAccounts[2], name);


    //Getting all documents for each reference
    const checkingsSnap = await getDoc(checkingsRef);
    const savingsSnap = await getDoc(savingsRef);
    const cdSnap = await getDoc(cdRef);


    //Checking to see if there are any accounts that should be added
    if (!checkingsSnap.exists()) { addAccount(arrayAccounts[0], name, "0"); }

    if (!savingsSnap.exists()) { addAccount(arrayAccounts[1], name, "0") }

    if (!cdSnap.exists()) { addAccount(arrayAccounts[2], name, "0"); }


    //Checking to see if they exist
    if (checkingsSnap.exists() && savingsSnap.exists() && cdSnap.exists()) {

      //If they exist, we'll add the retrieve all balances
      let checkingBalance = checkingsSnap.data().balance;
      let savingsBalance = savingsSnap.data().balance;
      let cdBalance = cdSnap.data().balance;

      //Setting user's balances
      let c = { balance: checkingBalance };
      let s = { balance: savingsBalance };
      let cd = { balance: cdBalance };


      //Putting them in a list and returning them
      const listAcc = [c, s, cd];

      return listAcc;

    }

  } catch (error) {
    console.log("Error see why: " + error)
  }
}


/**
 * Function to deposit transactions
 * @param {string} bankAccount
 * @param {string} name
 * @param {number} depositAmount 
 * @param {number} setBalance
 * @returns updated balance after user makes a deposit
 */
export const setDeposit = async (bankAccount, name, depositAmount, setBalance) => {
  const userRef = doc(db, bankAccount, name);

  try {
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      console.log("No such user found!");

      //Creating account for user
      addUser(bankAccount, name, depositAmount, setBalance);
      return;
    }

    let currentBalance = userSnap.data().balance;
    let newBalance = currentBalance + depositAmount;

    await updateDoc(userRef, {
      balance: newBalance,
    });

    setBalance(newBalance); // Update UI immediately

    //Getting today's date
    const date = createDate();

    //adding transaction to history
    addTransaction(bankAccount, depositAmount, "Deposit", newBalance, date);
    console.log(`Updated balance: ${newBalance}`);
  } catch (e) {
    console.error("Error updating balance: ", e);
  }
};



/**
 * Function to withdraw transactions
 * @param {string} bankAccount 
 * @param {string} name 
 * @param {number} withdrawalAmount 
 * @param {void} setBalance 
 * @returns updated balance after user makes a withdrawal
 */
export const setWithdraw = async (bankAccount, name, withdrawalAmount, setBalance) => {
  const userRef = doc(db, bankAccount, name);

  try {
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      console.log("No such user found!");
      addUser(bankAccount, name, withdrawalAmount, setBalance);
      return;
    }

    let currentBalance = userSnap.data().balance;
    let newBalance = currentBalance - withdrawalAmount;

    await updateDoc(userRef, {
      balance: newBalance,
    });

    setBalance(newBalance); // Update UI immediately

    //Getting today's date
    const date = createDate();

    //adding transaction to history
    addTransaction(bankAccount, withdrawalAmount, "Withdraw", newBalance, date);

    console.log(`Updated balance: ${newBalance}`);
  } catch (e) {
    console.error("Error updating balance: ", e);
  }
};


/**
 * Method to create today's date object
 * @returns Today's Date
 */
const createDate = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  return formattedDate;
}


/**
 * Function that adds transaction status and will display to History
 * @param {string} account 
 * @param {number} amount 
 * @param {string} transactionType 
 * @param {number} availableBalance 
 * @param {object} date 
 */
const addTransaction = (account, amount, transactionType, availableBalance, date) => {
  if (transactionType === "Deposit") {
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push({ account, amount, transactionType, availableBalance, date });
    localStorage.setItem('transactions', JSON.stringify(transactions));
    addTransactionHistory(account, amount, transactionType, availableBalance, date);
  }
  else {
    amount = amount * -1;
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push({ account, amount, transactionType, availableBalance, date });
    localStorage.setItem('transactions', JSON.stringify(transactions));
    addTransactionHistory(account, amount, transactionType, availableBalance, date);
  }

}

/**
 * Function to add transaction history to firebase
 * @param {string} account 
 * @param {number} amount 
 * @param {string} transactionType 
 * @param {number} availableBalance 
 * @param {object} date 
 */
const addTransactionHistory = async (account, amount, transactionType, availableBalance, date) => {
  try {
    const user = sessionStorage.getItem("username");
    const userHistoryRef = doc(db, "History", user);
    const statementCollection = collection(userHistoryRef, "Statements");
    const statementDoc = doc(statementCollection, Date.now().toString());

    await setDoc(statementDoc, {
      Account: account,
      Amount: amount,
      TransactionType: transactionType,
      AvailableBalance: availableBalance,
      Date: date
    });
  } catch (error) {
    console.error("Error adding transaction history:", error)
  }
}


/**
 * Function to get user's transaction history to be display on the History Page
 * @returns user's transaction history
 */
export const getTransactionHistory = async () => {
  try {
    const user = sessionStorage.getItem("username");
    if (!user) return [];

    const userHistoryRef = doc(db, "History", user);
    const statementCollection = collection(userHistoryRef, "Statements");

    //get all documents from the Statements subcollection
    const statementsSnapshot = await getDocs(statementCollection);

    const listOfStatements = [];

    statementsSnapshot.forEach((doc) => {
      listOfStatements.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return listOfStatements;

  } catch (error) {
    console.error("Error getting transaction history:", error);
    return [];
  }
}


export const deleteTransactionHistory = async () => {
  try {
    const user = sessionStorage.getItem("username");
    const userHistoryRef = doc(db, "History", user);
    const statementCollection = collection(userHistoryRef, "Statements");

    const statementsSnapshot = await getDocs(statementCollection);

    if (statementsSnapshot.empty) {
      alert("History is empty.")
      return;
    }

    const batch = writeBatch(db);

    statementsSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    })

    await batch.commit();

    alert("History Deleted!, Refresh Page to show.")




  } catch (error) {
    alert("Error")
    console.log(error)
  }

}
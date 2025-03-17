import { db } from "./firebase"
import { collection, addDoc, getDocs, getDoc, setDoc, doc, updateDoc } from "firebase/firestore"
import { ref, set, get } from 'firebase/database';
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
 * @param {*} bankAccount 
 * @param {*} name 
 * @param {*} amount 
 * @returns 
 */
export const addAccount = async (bankAccount, name, amount) => {
  try {
    await setDoc(doc(db, bankAccount, name), {
      balance: Number(amount)
    });
    return{balance: amount}
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};



export const getUser = async () => {
  try{
    const userRef = ref(database, `users/${Username}`)
    const snapshot = await get(userRef);

    const user = snapshot.val();
    console.log(user)
  }
  catch(error){

  }
}

//Gets all users
export const getUsers = async () => {
    // const querySnapshot = await getDocs(collection(db, "checkings"));
    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} =>`, doc.data());
    // });
};


//Gets user info based on what account they are on
export const getBalance = async (bankAccount, name) => {
    try {
      const userRef = doc(db, bankAccount, name);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        let balance = userSnap.data().balance;
        return {balance: balance}
      } else {
        console.log("No such user found!");
        return {balance: 0}
        return null;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
};


/**
 * Function to get all balances 
 * @param {All user accounts} arrayAccounts 
 * @param {Name of user} name 
 * @returns 
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
    if(!checkingsSnap.exists()){addAccount(arrayAccounts[0], name, "0");}

    if(!savingsSnap.exists()){addAccount(arrayAccounts[1], name, "0")}

    if(!cdSnap.exists()){addAccount(arrayAccounts[2], name, "0");}


    //Checking to see if they exist
    if(checkingsSnap.exists() && savingsSnap.exists() && cdSnap.exists()){

      //If they exist, we'll add the retrieve all balances
      let checkingBalance = checkingsSnap.data().balance;
      let savingsBalance = savingsSnap.data().balance;
      let cdBalance = cdSnap.data().balance;
      
      //Setting user's balances
      let c = {balance: checkingBalance};
      let s = {balance: savingsBalance};
      let cd = {balance: cdBalance};


      //Putting them in a list and returning them
      const listAcc = [c, s, cd];

      return listAcc;
      
    }
    
    
    
  } catch (error) {
    console.log("Error see why: " + error)
  }
}


/**
 * @param {The account the user is on} bankAccount
 * @param {User's username to access their account} name
 * @param {The amount the user wants to deposit} depositAmount 
 * @param {setBalance will update the user's available balance} setBalance
 * @returns 
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
 * Function to withdraw
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
 * Method that adds transaction status and will display to History
 * @param {string} account 
 * @param {number} amount 
 * @param {string} transactionType 
 * @param {number} availableBalance 
 * @param {object} date 
 */
const addTransaction = (account, amount, transactionType, availableBalance, date) => {
  console.log("Works")
      if(transactionType === "Deposit"){
          console.log("check")
          let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
          transactions.push({ account, amount, transactionType, availableBalance, date });
          localStorage.setItem('transactions', JSON.stringify(transactions));

      }
      else{
          amount = amount * -1;
          let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
          transactions.push({ account, amount, transactionType, availableBalance, date });
          localStorage.setItem('transactions', JSON.stringify(transactions));
      }

}


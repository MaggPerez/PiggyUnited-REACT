import { db } from "./firebase"
import { collection, addDoc, getDocs, getDoc, doc, updateDoc } from "firebase/firestore"
import { ref, set, get } from 'firebase/database';
import { database } from "./firebase";




// Function to add a user
export const addUser = async () => {
    try {
      await addDoc(collection(db, "users"), {
        name: "Mark",
        age: 25,
        city: "New York",
      });
      console.log("Document successfully written!");
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
export const getBalance = async (userAccount, name) => {
    try {
      const userRef = doc(db, userAccount, name);
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
 * 
 * @param {The amount the user wants to deposit} depositAmount 
 * @param {setBalance will update the user's available balance} setBalance
 * @param {User's username to access their account} name
 * @returns 
 */
export const setDeposit = async (depositAmount, setBalance, name) => {
  const userRef = doc(db, "checkings", name);
  
  try {
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
          console.log("No such user found!");
          return;
      }

      let currentBalance = userSnap.data().balance;
      let newBalance = currentBalance + depositAmount;

      await updateDoc(userRef, {
          balance: newBalance,
      });

      setBalance(newBalance); // Update UI immediately
      console.log(`Updated balance: ${newBalance}`);
  } catch (e) {
      console.error("Error updating balance: ", e);
  }
};



/**
 * Function to withdraw
 */
export const setWithdraw = async (withdrawalAmount, setBalance, name) => {
  const userRef = doc(db, "checkings", name);
  
  try {
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
          console.log("No such user found!");
          return;
      }

      let currentBalance = userSnap.data().balance;
      let newBalance = currentBalance - withdrawalAmount;

      await updateDoc(userRef, {
          balance: newBalance,
      });

      setBalance(newBalance); // Update UI immediately
      console.log(`Updated balance: ${newBalance}`);
  } catch (e) {
      console.error("Error updating balance: ", e);
  }
};



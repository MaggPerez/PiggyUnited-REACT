import { db } from "./firebase"
import { collection, addDoc, getDocs, getDoc, doc, updateDoc } from "firebase/firestore"

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

//Gets all users
export const getUsers = async () => {
    // const querySnapshot = await getDocs(collection(db, "checkings"));
    // querySnapshot.forEach((doc) => {
    //   console.log(`${doc.id} =>`, doc.data());
    // });
};


//Gets single user
export const getUser = async () => {
    try {
      const userRef = doc(db, "checkings", 'mag');
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        console.log("Total: ", userSnap.data());
        let balance = userSnap.data().balance;
        document.getElementById('checkings-balance').innerHTML = "$" + Number(balance).toFixed(2);
        return { balance: userSnap.balance, ...userSnap.data() };
      } else {
        console.log("No such user found!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
};


//Updates balance
export const updateUser = async () => {
    const userRef = doc(db, "checkings", 'mag');

    try {
        await updateDoc(userRef, {
        balance: 500,
        });
        console.log("Document successfully updated!");
    } catch (e) {
        console.error("Error updating document: ", e);
    }
};

/**
 * Continue integrating firebase
 * 
 * Decide if you want to turn this bank.js file into objects or not
 */
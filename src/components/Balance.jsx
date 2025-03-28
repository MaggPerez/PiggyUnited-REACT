import { useEffect, useState } from "react";
import { getBalance } from "../Bank";

/**
 * Function that fetches the user's balance depending on what page they're on
 * @param {string} account 
 * @returns user's balance based on what account they're on
 */
export function Balance({ account }) {
    const [balance, setBalance] = useState("0");


    useEffect(() => {
        async function fetchBalance() {
            const data = await getBalance(account, sessionStorage.getItem('username'));
            setBalance(data.balance.toFixed(2));
        }
        fetchBalance();
    }, []);

    return (
        <>
            <h1>{'$' + balance}</h1>
        </>
    );
}

export default Balance;
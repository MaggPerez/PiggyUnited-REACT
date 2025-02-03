

import { useEffect, useState } from "react";
import { getBalance } from "./Bank";

/**
 * Function that fetches the user's balance depending on what page they're on
 * @param {account} param0 
 * @returns 
 */
export function Balance({account}){
    const [balance, setBalance] = useState("0");

    useEffect(() => {
        async function fetchBalance() {
            const data = await getBalance(account);
            setBalance(data.balance.toFixed(2));
        }
        fetchBalance();
    }, []);

    return(
        <>
            <h1>{'$'+ balance}</h1>
        </>
    );
}

export default Balance;
import { useEffect } from "react";

//Function that sets document title based on what page the user is on
export function setDocumentTitle(title){
    useEffect(() => {
        document.title = title;
    }, [title]);
}



import { useEffect } from "react";

export function setDocumentTitle(title){
    useEffect(() => {
        document.title = title;
    }, [title]);
}



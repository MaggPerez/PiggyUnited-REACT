


function AmountButton( { activateActive, activateHandleClick}){
    return(
        <div className="amount-box">
            <h2>Pre-selected Choices</h2>

            {/* Button Choices */}
            <button className="amount-button" onClick={() => activateHandleClick("5")} 
                style={{backgroundColor: activateActive === "5" ? "#4169e1" : ""}} >$5</button>
            
            <button className="amount-button" onClick={() => activateHandleClick("10")} 
                style={{backgroundColor: activateActive === "10" ? "#4169e1" : ""}}>$10</button>
            
            <button className="amount-button" onClick={() => activateHandleClick("20")}
                style={{backgroundColor: activateActive === "20" ? "#4169e1" : ""}}>$20</button>
            
            <button className="amount-button" onClick={() => activateHandleClick("50")}
                style={{backgroundColor: activateActive === "50" ? "#4169e1" : ""}}>$50</button>
            
            <button id="amount-width" className="amount-button" onClick={() => activateHandleClick("100")}
                style={{backgroundColor: activateActive === "100" ? "#4169e1" : ""}}>$100</button>
        </div>
    );
}

export default AmountButton;
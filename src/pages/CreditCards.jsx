import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { setDocumentTitle } from '../script'
import PageTitle from '../components/PageTitle'

export default function CreditCards() {
  const [digits, setDigits] = useState("")

  setDocumentTitle("Credit Cards");

  /**
   * Function to generate 16 digits
   */
  function generateCreditCard() {
    let min1 = Math.ceil(1000);
    let max1 = Math.floor(9999);
    let side1 = Math.floor(Math.random() * (max1 - min1 + 1)) + min1;

    let min2 = Math.ceil(1000);
    let max2 = Math.ceil(9999);
    let side2 = Math.floor(Math.random() * (max2 - min2 + 1)) + min2;

    let min3 = Math.ceil(1000);
    let max3 = Math.floor(9999);
    let side3 = Math.floor(Math.random() * (max3 - min3 + 1)) + min3;

    let min4 = Math.ceil(1000);
    let max4 = Math.ceil(9999);
    let side4 = Math.floor(Math.random() * (max4 - min4 + 1)) + min4;

    let digit16 = side1 + "     " + side2 + "     " + side3 + "     " + side4;

    //storing it locally
    sessionStorage.setItem('digits', digit16);

    //setting the digits
    setDigits(digit16)
  }


  return (
    <>
      <Sidebar />
      <main className='main'>

        {/* Displaying page name*/}
        <h1><PageTitle /></h1>

        <div className="credit-card-container">
          <div className="credit-card-img">
            <div className="credit-card-content">
              <p>{digits || sessionStorage.getItem('digits')}</p>
            </div>
          </div>

          {/* Second section */}
          <div>
            <button className='generate-button' onClick={generateCreditCard}>Click to generate</button>
          </div>
        </div>
      </main>


    </>
  )
}

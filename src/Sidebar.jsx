import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {

  // Function that helps to automatically display Sidebar when screen width is >= 1024
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 1024) {
        document.getElementById("mySidebar").style.width = "200px";
        document.querySelector('.main').style.marginLeft = "200px";
    } else {
        document.getElementById("mySidebar").style.width = "0";
        document.querySelector('.main').style.marginLeft = "0";
    }
});


window.dispatchEvent(new Event('resize'));


  const openNav = () => {
    document.getElementById("mySidebar").style.width = "250px";
  };

  const closeNav = () => {
    document.getElementById("mySidebar").style.width = "0";
  };

  return (
    <div className='main'>
      <nav id="mySidebar" className="sidebar" style={{ transition: '0.3s' }}>
      <Link className='link' to="/dashboard"><img src="images/logo_bank.svg" alt="" /></Link>
        <a id="hide-menu-icon" href="#" className="closebtn" onClick={closeNav}>&times;</a>
        <Link to="/dashboard">Home</Link>
        <Link to="/account">Account</Link>
        <Link to="/history">History</Link>
        {/* <Link to="">Credit Cards</Link> */}
        <Link id="logout" to="/logout">Log out</Link>
      </nav>

      <span id='hide-menu-icon' style={{ fontSize: '45px', cursor: 'pointer' }} onClick={openNav}>&#9776;</span>
    </div>
  );
};


export default Sidebar;
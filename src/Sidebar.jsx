import React from 'react';

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
        <a href="dashboard.html"></a>
        <a id="hide-menu-icon" href="#" className="closebtn" onClick={closeNav}>&times;</a>
        <a href="dashboard.html">Home</a>
        <a href="account.html">Account</a>
        <a href="history.html">History</a>
        <a href="creditcard.html">Credit Cards</a>
        <a id="logout" href="index.html">Log out</a>
      </nav>

      <span id='hide-menu-icon' style={{ fontSize: '45px', cursor: 'pointer' }} onClick={openNav}>&#9776;</span>
    </div>
  );
};

// Fix sidebar

export default Sidebar;
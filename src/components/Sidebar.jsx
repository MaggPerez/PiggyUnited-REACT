import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //Function that helps to automatically display Sidebar when screen width is >= 1024
    const handleResize = function () {
      const sidebar = document.getElementById("mySidebar");
      const main = document.querySelector('.main');


      //throws error on console that the elements are not found for sidebar and main
      if (!sidebar || !main) {
        console.error("Elements not found yet");
        return;
      }

      //if the width of window is above 1024px (desktop mode), sidebar will automatically open
      if (window.innerWidth >= 1024) {
        sidebar.style.width = "200px";
        main.style.marginLeft = "200px";
      } else {
        //if the width of window is below 1024px (mobile and tablet mode), sidebar will automatically close
        sidebar.style.width = "0";
        main.style.marginLeft = "0";
      }
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);


    //Trigger initial resize depending on the width of device
    handleResize();

    //Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };


  }, []);


  //Function to open sidebar
  const openNav = () => {
    document.getElementById("mySidebar").style.width = "250px";
  };

  //Function to close sidebar
  const closeNav = () => {
    document.getElementById("mySidebar").style.width = "0";
  };

  //Function to log out
  const logOut = () => {
    localStorage.clear();
    console.log("Cleared")
    navigate('/logout')
  }

  return (
    <div className='main'>
      <nav id="mySidebar" className="sidebar" style={{ transition: '0.3s' }}>
        <Link className='link' to="/dashboard"><img src="images/logo_bank.svg" alt="" /></Link>
        <a id="hide-menu-icon" href="#" className="closebtn" onClick={closeNav}>&times;</a>
        <Link to="/dashboard">Home</Link>
        <Link to="/account">Account</Link>
        <Link to="/history">History</Link>
        <Link to="/creditcards">Credit Cards</Link>
        <Link id="logout" onClick={logOut}>Log out</Link>
      </nav>

      <span id='hide-menu-icon' style={{ fontSize: '45px', cursor: 'pointer' }} onClick={openNav}>&#9776;</span>
    </div>
  );
};


export default Sidebar;
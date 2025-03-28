import { useLocation } from "react-router-dom";

/**
 * Function that sets the title of the page in colored Blue (Dashboard, Checkings, etc)
 * @returns title name of the page the user is on 
 */
const PageTitle = () => {
  const location = useLocation();
  let pageName = location.pathname.slice(1) || "home"; // Get current page name from URL

  //fixing CD title so that every character is capitalized
  if (pageName === "cd") {
    pageName = "CD";
  }

  localStorage.setItem('pageName', pageName);

  //returns title name and uppercases the first letter
  return <div>{pageName.charAt(0).toUpperCase() + pageName.slice(1)}</div>;
};

export default PageTitle;

import { useLocation } from "react-router-dom";

const PageComponent = () => {
  const location = useLocation();
  const pageName = location.pathname.slice(1) || "home"; // Get current page name from URL
  localStorage.setItem('pageName', pageName);

  //returns title name and uppercases the first letter
  return <div>{pageName.charAt(0).toUpperCase() + pageName.slice(1)}</div>;
};

export default PageComponent;

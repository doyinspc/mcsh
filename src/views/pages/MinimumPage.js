import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import SubMinimumNavbar from "components/Navbars/SubMinimumSideNavbar";
import DarkFooter from "components/Footers/DarkFooter.js";
import EmployeeTablePage from "./EmployeeTablePage";
import ClientTablePage from "./ClientTablePage";
import CategoryTablePage from "./CategoryTablePage";
import BookingTablePage from "./BookingTablePage";
import EmployeeCards from "components/Cards/EmployeeCards";


function MinimumPage(props) {
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("about");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  const isNum = props.table_id
  
  return (
    <>
      <SubMinimumNavbar/>
      <div className="wrapper">
        <div className="section section-about-us">
          {isNum == 1 ? <EmployeeTablePage  {...props} /> : <span></span>}
          {isNum == 2 ? <ClientTablePage {...props} /> : <span></span>}
          {isNum == 3 ? <CategoryTablePage  {...props} /> : <span></span>}
          {isNum == 4 ? <BookingTablePage  {...props} /> : <span></span>}
          {isNum == 5 ? <EmployeeCards  {...props} /> : <span></span>}
        </div>
          <DarkFooter />
      </div>
    </>
  );
}

export default MinimumPage;

import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import SubMinimumNavbar from "components/Navbars/SubMinimumSideNavbar";
import DarkFooter from "components/Footers/DarkFooter.js";
import AlumniTablePage from "./TablePage";


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
  return (
    <>
      <SubMinimumNavbar/>
      <div className="wrapper">
        <div className="section section-about-us">
          <AlumniTablePage />
        </div>
          <DarkFooter />
      </div>
    </>
  );
}

export default MinimumPage;

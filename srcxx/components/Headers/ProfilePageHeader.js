import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function ProfilePageHeader(props) {

  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/bg5.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="photo-container">
            <img alt="..." src={require("assets/img/ryan.jpg")}></img>
          </div>
          <h3 className="title">{ props.alu && props.alu.fullname ? props.alu.fullname: ''}</h3>
          <p className="category">{ props.alu && props.alu.occupation ? props.alu.occupation: ''}</p>
          <div className="content">
            <div className="social-description">
              <h2>{ props.alu && props.alu.year ? props.alu.year: ''}</h2>
              <p>Year</p>
            </div>
            <div className="social-description">
              <h2>{ props.alu && props.alu.phone ? props.alu.phone : ''}</h2>
              <p>Phone</p>
            </div>
           
          </div>
        </Container>
      </div>
    </>
  );
}

export default ProfilePageHeader;

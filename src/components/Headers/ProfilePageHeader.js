import React from "react";

// reactstrap components
import { Container } from "reactstrap";
import { MEDIA_PATH } from "../../actions/types";

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
            backgroundImage: "url(" + require("assets/img/bg5.jpeg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="photo-container">
            <img alt="..." src={props.alu && props.alu.photo ? MEDIA_PATH+props.alu.photo : require("assets/img/ryan.jpg")}></img>
          </div>
          <h2 className="title">{ props.alu && props.alu.fullname ? props.alu.fullname: ''}</h2>
          <p className="category">{ props.alu && props.alu ? '' : ''}</p>
          <div className="content">
          </div>
        </Container>
      </div>
    </>
  );
}

export default ProfilePageHeader;

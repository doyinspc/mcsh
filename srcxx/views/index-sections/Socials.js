import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";

// core components

function Socials(props) {
  return (
    <>
            <div className="text-center">
              <Button
                className="btn-icon btn-round"
                color="blue"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-facebook-square"></i>
              </Button>
              <Button
                className="btn-icon btn-round"
                color="info"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <Button
                className="btn-icon btn-round"
                color="danger"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <i className="fab fa-google-plus"></i>
              </Button>
            </div>
    </>
  );
}

export default Socials;

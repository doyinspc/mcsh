/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default">
      <Container>
        <nav>
          <ul>
            <li>
              <a
                href="http://www.multiclinicspecialist.com/"
                target="_blank"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="http://www.multiclinicspecialist.com/about-us.php"
                target="_blank"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="http://www.multiclinicspecialist.com/contact-us.php"
                target="_blank"
              >
                Contact Us
              </a>
            </li>
        
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Designed by{" "}
          A# Team
          .
        </div>
      </Container>
    
    </footer>
    </>
  );
}

export default DefaultFooter;

import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

function Typography() {
  return (
    <>
      <div className="section">
        <Container>
          <div id="typography">
            <Row>
              <Col md="12">
                  <h2>
                    Welcome to Joy International College, Kaduna. <br></br>
                  </h2>
                  <h5 className="description">
                        JIC Kaduna is a Christian Coeducationa boarding school sutiated in Kaduna. our mandate is to train God fearing and academically sound 
                    </h5>
              </Col>
            </Row>
          </div>
          <div className="space-50"></div>
        </Container>
      </div>
    </>
  );
}

export default Typography;

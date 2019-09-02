import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import { registerClient } from "../../actions/client";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";

class RegisterPage extends React.Component{
  state =  {
    email:'',
    password:'',
    phone:'',
    altpassword:'',
    fullname:'',
    cardno:'',
    emailFocus:false,
    passwordFocus:false,
    phoneFocus:false,
    fullnameFocus:false,
    cardnoFocus:false,
    altpasswordFocus:false,
  }

  onChange = e => this.setState({
    [e.target.name] : e.target.value
  });

  onSubmit = e => {
    e.preventDefault();
    const {email, phone, password, cardno, fullname } = this.state;
    const data = {email, phone, password, cardno, fullname };
    this.props.registerClient(data);
  };

  onHandleFocus = (wf, poos) => this.setState({
    wf : poos
  });

  onLoad = () => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  };

  render(){ 

    if (this.props.isAuthenticated) {
      return <Redirect to="/employee-group" />;
    }
    if (this.props.isAuthenticatede) {
      return <Redirect to="/category-data" />;
    }
   
    this.onLoad()
    const { email, password, phone, altpassword, cardno, fullname, emailFocus, passwordFocus, phoneFocus, cardnoFocus, fullnameFocus, altpasswordFocus } = this.state;
  return (
    <>
      <ExamplesNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/login.jpg") + ")"
          }}
        ></div>
        <div className="contents" >
          <Container style={{ marginTop:2 }}>
            <Row>
            <Col className="ml-auto mr-auto mt-auto mb-auto" md="4" style={{ marginTop:2 }}>
            <h3> Multi Clinics Specialist Hospital, Kaduna</h3>
            <div className="logo-container" style={{ marginBottom:5 }}>
                      <img
                        alt="..."
                        src={require("assets/img/logo.png")}
                      ></img>
                    </div>
            </Col>
            <Col className="ml-auto mr-auto" md="8" style={{ marginTop:2 }}>
              <Card className="card-login card-plain" style={{ marginTop:2 }}>
                <Form  onSubmit={this.onSubmit}>
                  <CardHeader className="text-center" style={{ marginTop:2 }}>
                   <h4>Register</h4> 
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (emailFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="text"
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        onFocus={() => this.onHandleFocus(emailFocus, true)}
                        onBlur={() => this.onHandleFocus(emailFocus, false)}
                      ></Input>
                    </InputGroup>

                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (phoneFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Phone"
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={this.onChange}
                        onFocus={() => this.onHandleFocus(phoneFocus, true)}
                        onBlur={() => this.onHandleFocus(phoneFocus, false)}
                      ></Input>
                    </InputGroup>
                    
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (fullnameFocus ? " input-group-focus" : "")
                      }
                    
                    >
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Fullname.."
                        type="text"
                        name="fullname"
                        value={fullname}
                        onChange={this.onChange}
                        onFocus={() => this.onHandleFocus(fullnameFocus, true)}
                        onBlur={() => this.onHandleFocus(fullnameFocus, true)}
                      ></Input>
                    </InputGroup>
                    
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (cardnoFocus ? " input-group-focus" : "")
                      }
                    >
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Hospital Card Number... Optional."
                        type="text"
                        name="cardno"
                        value={cardno}
                        onChange={this.onChange}
                        onFocus={() => this.onHandleFocus(cardnoFocus, true)}
                        onBlur={() => this.onHandleFocus(cardnoFocus, true)}
                      ></Input>
                    </InputGroup>
                    

                      <InputGroup
                      className={
                        "no-border input-lg" +
                        (passwordFocus ? " input-group-focus" : "")
                      }
                      >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password.."
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        onFocus={() => this.onHandleFocus(passwordFocus, true)}
                        onBlur={() => this.onHandleFocus(passwordFocus, true)}
                      ></Input>
                      </InputGroup>

                      <InputGroup
                      className={
                        "no-border input-lg" +
                        (altpasswordFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Repeat Password.."
                        type="password"
                        name="altpassword"
                        value={altpassword}
                        onChange={this.onChange}
                        onFocus={() => this.onHandleFocus(altpasswordFocus, true)}
                        onBlur={() => this.onHandleFocus(altpasswordFocus, true)}
                      ></Input>
                    </InputGroup>
                  
                  
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      type="submit"
                      size="lg"
                    >
                      Register
                    </Button>
                    <div className="pull-left">
                      <h6>
                        <Link
                          className="link"
                          to="/login-page"
                        >
                          Already have an account? Login
                        </Link>
                      </h6>
                    </div>
                   
                  
                  </CardBody>
                </Form>
              </Card>
            </Col>
            </Row>
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
  }
}

const mapStateToProps = state => ({ 
  isAuthenticated: state.clientReducer.isAuthenticated,
  isAuthenticatede: state.employeeReducer.isAuthenticated
})

export default connect(mapStateToProps, { registerClient })(RegisterPage);

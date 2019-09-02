import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import { loginClient } from "../../actions/client";

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
  Col
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";
class LoginPage extends React.Component{
  state =  {
    email:null,
    password:null,
    emailFocus:false,
    passwordFocus:false
  }

  onChange = e => this.setState({
    [e.target.name] : e.target.value
  });

  onSubmit = e => {
    e.preventDefault();
    this.props.loginClient(this.state.email, this.state.password);
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
      return <Redirect to="/employee-group/1" />;
    }
    this.onLoad()
    const { email, password, emailFocus, passwordFocus } = this.state;
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
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="5">
            <h3> Multi Clinics Specialist Hospital, Kaduna</h3>
              <Card className="card-login card-plain">
                <Form action="" className="form" method="" onSubmit={this.onSubmit}>
                  <CardHeader className="text-center">
                    <div className="logo-container" style={{ marginBottom:5 }}>
                      <img
                        alt="..."
                        src={require("assets/img/logo.png")}
                      ></img>
                    </div>
                  
                  <h5 ><b>Login</b></h5>
                  </CardHeader>
                  <CardBody style={{ marginTop:5 }}>
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
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      type="submit"
                      size="lg"
                    >
                      Login
                    </Button>
                    <div className="pull-left">
                      <h6>
                        <Link
                          className="link"
                          to="/register-page"
                        >
                          Have no account ? Create Account Here.
                        </Link>
                      </h6>
                    </div>
                   
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
  }
}

const mapStateToProps = state => ({ 
  isAuthenticated: state.clientReducer.isAuthenticated
})

export default connect(mapStateToProps, { loginClient })(LoginPage);

import React from "react";
import { Link, Redirect } from 'react-router-dom'
import { connect }from 'react-redux';
import PropTypes from 'prop-types';
import { getEmployee } from '../../actions/employee';
import { getEBooking } from '../../actions/booking';
// reactstrap components
import {
  Button,
  Container,
  UncontrolledTooltip,
  Row,
  Col
} from "reactstrap";

// core components
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import ExamplesNavbar from "components/Navbars/SubMinimumSideNavbar";
class ProfilePage extends React.Component{
  state ={
    pills:2,
    modal: false,
    empno:'',  
    email:'',
    fullname:'',
    phone: '',
    schnoFocus: false,
    emailFocus: false,
    fullnameFocus: false,
    yearFocus: false,
    twitterFocus: false,
    facebookFocus: false,
    phoneFocus: false
  }
  static propTypes = {
    employee: PropTypes.object.isRequired
  }


  db = () => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  };

  componentDidMount(){
    this.props.getEmployee(this.props.id)
  }

  setModel = (al) => this.setState({ modal : al})
    onHandleFocus = (wf, poos) => this.setState({
    wf : poos
    })

  onSubmit = e => {
    e.preventDefault();
    const { schno, email, phone, fullname, year, twitter, facebook} = this.state;
    const employee = { schno, email, phone, fullname, year, twitter, facebook };
    this.props.registerEmployee(employee); 
  }

  render(){
    let alu = this.props && this.props.employee  ? this.props.employee: {};
    const { schno, email, phone, fullname, year, twitter, facebook, fullnameFocus, twitterFocus, facebookFocus, schnoFocus, phoneFocus, yearFocus, emailFocus} = this.state;
    this.db()

    let btn1 = <Button className="btn-round btn-icon" color="default" size="lg" id="tooltip4" onClick={e=>this.showButton(1)} >Edit Data</Button>
    let btn2 = <Button className="btn-round btn-icon" color="default" size="lg" id="tooltip3" onClick={e=>this.showButton(2)}>Edit Photo</Button>                

      return (
        <>
          <ExamplesNavbar />
          <div className="wrapper">
            <ProfilePageHeader alu={this.props.employee} />
            <div className="section">
              <Container>
                <div className="button-container">
                <Button className="btn-round" color="danger" size="lg">
                  {this.props.employee.email}
                  </Button>
                  <Button className="btn-round" color="info" size="lg">
                  {this.props.employee.phone}
                  </Button>
                </div>
                <h3 className="title">About me</h3>
                <h5 className="description">
                  {this.props.employee.profile}
                </h5>
                <Row>
                  <Col md="4">
                 <div className="card" >
                    <div className="card-body">
                      <blockquote  className="blockquote blockquote-primary mb-0">
                        <p>
                        { this.props.employee.profile }
                        </p>
                        <footer className="blockquote-footer">{this.props.employee.fullname}</footer>
                      </blockquote>
                    </div>
                  </div>
                  </Col>
                  <Col md="4">
                  <div className="card">
                    <div className="card-subtitle">
                      Appointments
                    </div>
                    <ul class="list-group list-group-flush">

                    </ul>
                  </div>
                  </Col>

                </Row>
                </Container> 
                
            </div>
            <DefaultFooter />
          </div>
        </>
      );
    }
}

const mapStateToProps = (state, ownProps) => ({ 
  employee: state.employeeReducer.employee,
  user: state.employeeReducer.user,
  isEdit: state.employeeReducer.isEdit,
  id: ownProps.match.params.id  
})



export default connect(mapStateToProps, { getEmployee, getBooking })(ProfilePage);

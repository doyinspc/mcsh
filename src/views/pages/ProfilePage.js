import React from "react";
import { Link, Redirect } from 'react-router-dom'
import { connect }from 'react-redux';
import PropTypes from 'prop-types';
import { getEmployee } from '../../actions/employee';
import { getClient } from '../../actions/client';
import { getBooking, getBookingPersonal, registerBooking, deactivateBooking, deleteBooking, editBooking, setBooking } from '../../actions/booking';


// reactstrap components
import {
  Button,
  Container,
  UncontrolledTooltip,
  Row,
  Col,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
  UncontrolledButtonDropdown,
  Badge
} from "reactstrap";

// core components
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import ExamplesNavbar from "components/Navbars/SubMinimumSideNavbar";
class ProfilePage extends React.Component{
  state ={
    date_booked:'',
    time_booked:'',  
    duration:1,
    bempno:'',
    bcardno:'',
    comment:'',
    empno: '',
    cardno:'',
    isStaff: false
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
    const current_date = new Date().toLocaleDateString();
    const current_time = new Date().toLocaleTimeString();
    this.setState({  date_booked : current_date })
    this.setState({  time_booked : current_time })

    this.props.getEmployee(this.props.id)
    this.setState({  bempno : this.props.id })

    if(this.props.client && this.props.client.user && this.props.client.user.id > 0){
      this.props.getBookingPersonal(this.props.client.user.id);
      this.setState({  isStaff : false })
      this.setState({  bcardno : this.props.client.user.id })
    }
    else if(this.props.employee && this.props.employee.user && this.props.employee.user.id > 0){
      this.props.getBooking();
      this.setState({  isStaff : true })
      this.setState({  bcardno : this.props.employee.user.id })
    }

  }

  setModel = (al) => this.setState({ modal : al})
  onHandleFocus = (wf, poos) => this.setState({
    wf : poos
    })

  onSubmit = e => {
    e.preventDefault();
    const { date_booked, time_booked, duration, comment, bempno, bcardno} = this.state;
    const booking = { date_booked, time_booked, duration, comment, bempno, bcardno };  
    this.props.registerBooking(booking);
     
  }

  onChange = e => this.setState({[e.target.name] : e.target.value})
  
  onChangeDate = e => {
    const selectedDate = e.target.value;
    //select all active session for employee for the day
    this.props.getBooking(this.props.id, selectedDate);
    this.setState({date_booked: selectedDate})
  }

  onChangeTime = e => {
    const selectedTime = e.target.value
    //check and confirm if session is alrady in play
    //this.props.getBooking(this.props.id, selectedTime);
    this.setState({time_booked: selectedTime})
  }
  activateSet =  id => {
    this.props.deactivateBooking(id)
  }

  profileSet = (id) =>{
      this.props.getBooking(id)
  }

  deleteSet = (id) =>{
      let r = window.confirm('Are you sure. It cannot be recovered?');
      if(r){
          this.props.deleteBooking(id);
      }
  }
  bookingSet = (id, st) =>{
      this.props.setBooking(id, st);
  }

  render(){
    //AUTHENTICATE USER
    if (!this.props.isAuthenticatedEmployee && !this.props.isAuthenticatedClient) {
      return <Redirect to="/login-page" />;
    }

    // DATE OF SELECTED EMPLYEE
    const data =  this.props.employee.employee

    //CREATE A TABLE OF ALL APPOINTMENTS MADE BY THE USER (USER VIEW)
    //CREATE A TABLE OF ALL APPOINTMENTS OF AN EMPLOYEE (EMPLOYEE VIEW AND ADMIN)
    let J = 0;
    const current_date = new Date().toLocaleDateString;
    const current_time = new Date().toLocaleTimeString;
    let ali = this.props && this.props.booking.personalbookings.length > 0 ?
    this.props.booking.personalbookings.map(alu => ( 
      <tr scope='row' key={alu.id} style={{margin:0, padding:0}}>
      <td className="text-center">{++J}</td>
      <td className= { alu.time_booked >= current_time ? "" : "text-muted"  } >{alu.bempno.fullname}</td>
      <td>
          <span className= { alu.date_booked >= current_date ? '' : "text-muted"  }>{alu.date_booked}</span>-
          <span className= { alu.time_booked >= current_time ? '' : "text-muted"  }>{alu.date_booked}</span>
      </td>
      <td>{alu.duration}</td>
      <td>
          { alu.is_paid == 3 ? <Badge color="success">Paid</Badge> : "" }
          { alu.is_paid == 2 ? <Badge color="warning">Pending</Badge> : "" }
          { alu.is_paid == 1 ? <Badge color="danger">Canceled</Badge> : "" }
      </td>  
      <td className="text-center">
      <UncontrolledButtonDropdown style={{margin:0, padding:0}}>
          <DropdownToggle caret size="sm" style={{margin:0}}>
              Action
          </DropdownToggle>
          <DropdownMenu>
              <DropdownItem  key="id1_{alu.id}" href="#" onClick={e => this.profileSet(alu.id)}>Profile</DropdownItem>
              <DropdownItem  key="id2_{alu.id}" href="#" onClick={e => this.editSet(alu.id)}>Edit</DropdownItem>
              <DropdownItem  key="id4_{alu.id}" href="#" onClick={e => this.deleteSet(alu.id)}>Delete Appointment</DropdownItem>
              <DropdownItem  key="id5_{alu.id}" href="#" onClick={e => this.bookingSet(alu.id, 3)}>Approve Appointment </DropdownItem>
              <DropdownItem  key="id6_{alu.id}" href="#" onClick={e => this.bookingSet(alu.id, 2)}>Pending Appointment</DropdownItem>
              <DropdownItem  key="id7_{alu.id}" href="#" onClick={e => this.bookingSet(alu.id, 1)}>Cancel Appointment</DropdownItem>
          </DropdownMenu>
      </UncontrolledButtonDropdown>
      </td>
  </tr>
    )) : <tr></tr>;


    // CREATE A LIT VIEW OF ALL DOCTORS APPOINTMENT FOR THE DAY SELECTED
    let ali1 = this.props && this.props.booking.bookings.length > 0 ?
    this.props.booking.bookings.map(alu => ( 
            <li key={alu.id} className="list-group-item" >{ alu.time_booked }</li>
    )) : null;
      
    // DECONSTRUCT STATE
    const { date_booked, time_booked, comment, duration } = this.state;

    // CALL PAGE SETTING FUNCTION
    this.db()

      return (
        <>
          <ExamplesNavbar />
          <div className="wrapper">
            <ProfilePageHeader alu={data} />
            <div className="section">
              <Container>
                <div className="button-container">
                <Button className="btn-round" color="danger" size="lg">
                  {data.email}
                  </Button>
                  <Button className="btn-round" color="info" size="lg">
                  {data.phone}
                  </Button>
                </div>
                <Row>
                  <Col md="4">
                 <div className="card" >
                    <div className="card-body">
                      <blockquote  className="blockquote blockquote-primary mb-0">
                        <p>
                        { data.profile }
                        </p>
                        <footer className="blockquote-footer">{data.fullname}</footer>
                      </blockquote>
                    </div>
                  </div>
                  </Col>
                  <Col md="4">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title">Book</div>
                    <Form onSubmit={this.onSubmit}>
                      <FormGroup>
                        <Label for="date_booked">Date</Label>
                        <Input
                          type="date"
                          name="date_booked"
                          id="date_booked"
                          value={date_booked}
                          placeholder="Please select a Date"
                          onChange={this.onChangeDate}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleTime">Time</Label>
                        <Input
                          type="time"
                          name="time_booked"
                          id="exampleDatetime"
                          value={time_booked}
                          placeholder="Please select a dtime"
                          onChange={this.onChangeTime}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="duration">Duration</Label>
                        <Input
                          type="number"
                          name="duration"
                          id="duration"
                          value={duration}
                          placeholder="How many sessions"
                          onChange={this.onChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="comment" >Symtoms</Label>
                        <Input type="textarea" id="comment" name="comment" onChange={this.onChange} defaultValue={comment}  />
                        <FormText>Optional</FormText>
                    </FormGroup>
                   
                    <Button type="submit" >Submit</Button>
                
                    </Form>
                    </div>
                  </div>
                  </Col>
                  <Col md="4">
                  <div className="card">
                    <div className="card-body">
                      Doctors Inteinary: {}
                      <ul className="list-group list-group-flush">
                        { ali1 }
                      </ul>
                      </div>
                  </div>
                  </Col>

                </Row>
                <h4 className="title" > Appointments</h4>
                <Row style={{minHeight:450}}>
                    <Table valign="top" style={{margin:0, padding:0}} size='sm' bordered hover dark responsive>
                        <thead>
                            <tr>
                                <th style={{width:9}}>#</th>
                                <th>Doctors Name</th>
                                <th>Appointment</th>
                                <th>Duration</th>
                                <th>Status</th>
                                <th style={{width:10}} className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { ali }
                        </tbody>
                    </Table>
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
  employee: state.employeeReducer,
  client: state.clientReducer,
  booking: state.bookingReducer,
  isEdit: state.employeeReducer.isEdit,
  id: ownProps.match.params.id,
  isAuthenticatedEmployee:state.employeeReducer.isAuthenticated,
  isAuthenticatedClient:state.clientReducer.isAuthenticated
})



export default connect(mapStateToProps, { getEmployee, getClient, getBooking, getBookingPersonal,  registerBooking, deactivateBooking, deleteBooking, editBooking, setBooking })(ProfilePage);

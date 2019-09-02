import React from "react";
import { connect }from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { getBooking, deactivateBooking, deleteBooking, editBooking, setBooking } from '../../actions/booking';

// reactstrap components
import {
  Container,
  DropdownItem,
  ButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  Table,
  Col,
  Row,
  Badge,
  UncontrolledButtonDropdown
} from "reactstrap";
import BookingForm from "components/Forms/BookingForm";
// core components

class TablePage extends React.Component{
    state = {
        dropdownOpen: false
        };
    static propTypes = {
        bookings: PropTypes.array.isRequired,
        disabled: PropTypes.bool,
        direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
        group: PropTypes.bool,
        isOpen: PropTypes.bool,
        tag: PropTypes.string,
        toggle: PropTypes.func,
        caret: PropTypes.bool,
        color: PropTypes.string,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
        'data-toggle': PropTypes.string,
        'aria-haspopup': PropTypes.bool
      }
    
    componentDidMount(){
        this.props.getBooking()
    }
     
    toggle= () => this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });

    editSet =  id => {
        this.props.editBooking(id)
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
        if (!this.props.isAuthenticated) {
            return <Redirect to="/staff-login-page" />;
        }
         
        let J = 0;
        const current_date = new Date().toLocaleDateString;
        const current_time = new Date().toLocaleTimeString;
        let ali = this.props && this.props.bookings.length > 0 ?
        this.props.bookings.map(alu => ( 
                <tr scope='row' key={alu.id} style={{margin:0, padding:0}}>
                    <td className="text-center">{++J}</td>
                    <td className= { alu.time_booked >= current_time ? "" : "text-muted"  } >{alu.bcardno.fullname}</td>
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
        

        return (
            <>
            <div>
            <Container >
            <h2 className="title" > {this.props.name}</h2>
                <Row style={{minHeight:450}}>
                    <BookingForm />
                    <Table valign="top" style={{margin:0, padding:0, minHeight:40}} size='sm' bordered hover dark responsive>
                        <thead>
                            <tr>
                                <th style={{width:9}}>#</th>
                                <th>Client Name</th>
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
            </>
        );
    }

}

const mapStateToProps = state => ({ 
    bookings: state.bookingReducer.bookings,
    isAuthenticated: state.employeeReducer.isAuthenticated,
    isAdmin: state.employeeReducer.isAdmin
})
export default connect(mapStateToProps, { getBooking, deactivateBooking, deleteBooking, editBooking, setBooking })(TablePage);

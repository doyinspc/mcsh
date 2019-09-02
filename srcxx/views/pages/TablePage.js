import React from "react";
import { connect }from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { getEmployee, deactivateEmployee, passwordEmployee } from '../../actions/employee';

// reactstrap components
import {
  Container,
  DropdownItem,
  ButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  Table,
  Row,
  UncontrolledButtonDropdown
} from "reactstrap";
// core components

class TablePage extends React.Component{
    state = {
        dropdownOpen: false
        };
    static propTypes = {
        employees: PropTypes.array.isRequired,
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
        this.props.getEmployee()
      }
     
    toggle= () => this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });

    activateSet =  id => {
        this.props.deactivateEmployee(id)
    }
    profileSet = (id) =>{
        this.props.getEmployee(id)
    }
    passwordSet = (id) =>{
        this.props.passwordEmployee(id)
    }
    
    render(){
        let J = 0;
        let ali = this.props && this.props.employees.length > 0 ?
        this.props.employees.map(alu => ( 
                <tr key={alu.id} style={{margin:0, padding:0}}>
                    <td className="text-center">{++J}</td>
                    <td className= { alu.is_active == 1 ? "text-success" : "text-danger"  } >{alu.fullname}</td>
                    <td>{alu.phone}</td>
                    <td>{alu.year}</td>
                    <td>{alu.email}</td>
                    <td>
                    <UncontrolledButtonDropdown style={{margin:0, padding:0}}>
                        <DropdownToggle caret size="sm" style={{margin:0}}>
                            Action
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem  key="id1_{alu.id}" href="#" onClick={e => this.profileSet(alu.id)}>Profile</DropdownItem>
                            <DropdownItem  key="id2_{alu.id}" href="#pablo" onClick={e => this.activateSet(alu.id)}>Change State</DropdownItem>
                            <DropdownItem  key="id3_{alu.id}" href="#" onClick={e => this.passwordSet(alu.id)}>Set Password</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    </td>
                </tr>
        )) : <tr></tr>;
        

        return (
            <>
            <div>
            { !this.props.isRegistered || !this.props.isAuthenticated ? 
                  <Redirect to="/employee" /> : ''}

            <Container >
                <Row style={{minHeight:450}}>
                    <h2 className="title" > Employee</h2>
                    <Table style={{margin:0, padding:0}} responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Fullname</th>
                                <th>Phone Number</th>
                                <th>Set</th>
                                <th>Email</th>
                                <th>Actions</th>
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
    employees: state.employeeReducer.employees,
    isRegistered: state.employeeReducer.isRegistered,
    isAuthenticated: state.employeeReducer.isAuthenticated
})
export default connect(mapStateToProps, { getEmployee, deactivateEmployee, passwordEmployee })(TablePage);

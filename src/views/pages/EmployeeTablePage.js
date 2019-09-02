import React from "react";
import { connect }from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { 
    getEmployee, 
    deactivateEmployee, 
    updateEmployee, 
    registerEmployee, 
    deleteEmployee,
    passwordEmployee, 
    editEmployee, 
    formEmployee 
} from '../../actions/employee';
import { getCategory } from '../../actions/category';
// reactstrap components
import {
  Container,
  DropdownItem,
  ButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  Table,
  Row,
  UncontrolledButtonDropdown,
  Button
} from "reactstrap";
import { EmployeeForm } from "components/Forms/EmployeeForm";
// core components

class TablePage extends React.Component{
    state = {
        dropdownOpen: false,
        categorys: {}
    };
    
    static propTypes = {
        employees: PropTypes.object.isRequired,
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
    
    componentWillMount(){
        this.props.getEmployee()
        const cato = this.props.getCategory()
        this.setState({categorys:cato})
      }
     
    toggle= () => this.setState({
        dropdownOpen: !this.state.dropdownOpen
    });

    displayForm =  (bool) => {
        this.props.formEmployee(bool)
    }

    editSet =  id => {
        this.props.editEmployee(id)
    }

    activateSet =  id => {
        this.props.deactivateEmployee(id)
    }

    profileSet = (id) =>{
        this.props.getEmployee(id)
    }

    passwordSet = (id) =>{
        this.props.passwordEmployee(id)
    }

    deleteSet = (id) =>{
        let r = window.confirm('Are you sure. It cannot be recovered?');
        if(r){
           this.props.deleteEmployee(id);
        }
    }
    
    render(){
    
        let J = 0;
        let ali = this.props && this.props.employees.length > 0 ?
        this.props.employees.map(alu => ( 
                <tr key={alu.id} style={{margin:0, padding:0}}>
                    <td className="text-center">{++J}</td>
                    <td className= { alu.is_active == 2 ? "text-success" : "text-danger"  } >{alu.empno}</td>
                    <td className= { alu.is_active == 1 ? "text-success" : "text-danger"  } >{alu.fullname}</td>
                    <td><Link to={`/employee-group/${alu.category.id}`}>{alu.category.name}</Link></td>
                    <td>{alu.phone}</td>
                    <td>{alu.email}</td>
                    <td>
                    <UncontrolledButtonDropdown style={{margin:0, padding:0}}>
                        <DropdownToggle caret size="sm" style={{margin:0}}>
                            Action
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem  key={`id1_${alu.id}`} href={`/employee-file/${alu.id}`}>Profile</DropdownItem>
                            <DropdownItem  key={`id2_${alu.id}`} href="#" onClick={e => this.passwordSet(alu.id)}>Set Password</DropdownItem>
                            <DropdownItem  key={`id3_${alu.id}`} href="#" onClick={e => this.editSet(alu.id)}>Edit</DropdownItem>
                            <DropdownItem  key={`id4_${alu.id}`} href="#" onClick={e => this.activateSet(alu.id)}>Activate/Deactivate</DropdownItem>
                            <DropdownItem  key={`id5_${alu.id}`} href="#" onClick={e => this.deleteSet(alu.id)}>Delete</DropdownItem>
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
            { this.props.showForm ? <EmployeeForm {...this.props} />: <Button onClick={ e => this.displayForm(true) } className="btn btn-round btn-info">Add Employee</Button> }
                <Row style={{minHeight:450}}>
                    <Table  valign="top" style={{margin:0, padding:0}} size='sm' bordered hover dark responsive>
                        <thead>
                            <tr>
                                <th style={{width:10}}>#</th>
                                <th>Emp. No.</th>
                                <th>Fullname</th>
                                <th>Category</th>
                                <th>Phone Number</th>
                                <th>Email</th>
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
    employees: state.employeeReducer.employees,
    isEdit: state.employeeReducer.isEdit,
    showForm: state.employeeReducer.showForm,
    categorys: state.categoryReducer.categorys,
    isRegistered: state.employeeReducer.isRegistered,
    isAuthenticated: state.employeeReducer.isAuthenticated
})
export default connect(
    mapStateToProps, { 
        getEmployee, 
        deactivateEmployee, 
        passwordEmployee, 
        editEmployee, 
        registerEmployee, 
        updateEmployee, 
        deleteEmployee, 
        formEmployee,  
        getCategory 
    })(TablePage);

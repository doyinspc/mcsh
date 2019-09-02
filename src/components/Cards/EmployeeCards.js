import React from "react";
import { Link, Redirect } from 'react-router-dom'
import { connect }from 'react-redux';
import PropTypes from 'prop-types';
import { getEmployee, getEmployeeSearched } from '../../actions/employee';
import { getCategory } from '../../actions/category';

// reactstrap components
import {
  Button,
  Container,
  Row,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Col
} from "reactstrap";
//import { ReactComponent } from "*.svg";
// core components
import EmployeeCard from "./EmployeeCard";

export class EmployeeData extends React.Component {
  
  state ={
    main_id:1,
    collapseOpen:true
  }
  static propTypes = {
    employees: PropTypes.object.isRequired
  }

  changeSet = (selected) =>{
    this.props.getEmployeeSearched(selected, null);
    this.setState({main_id:selected})
  }

  onSearch = e =>{
    const value = e.target.value;
    if(value.length > 2){
      this.props.getEmployeeSearched(null, value);
    }
  }

  componentDidMount(){
    this.props.getCategory()
    if(this.props.id && this.props.id > 0){
      this.props.getEmployee(this.props.id);
      this.setState({main_id:this.props.id});
    }
    
  }

  render(){
    //AUTHENTICAL IF NOT REDIRECTS 
    //IF NOT A REGISTERED EMPLOYER OR CLIENT REDIRECT TO LOGIN
    if (!this.props.isAuthenticatedEmployee && !this.props.isAuthenticatedClient) {
      return <Redirect to="/login-page" />;
    }
      //ARRANGE ALL SELECTED EMPLOYEES
      let ali = this.props && this.props.employees.length > 0 ?
      this.props.employees.map(alu => ( <EmployeeCard key={ alu.id } emp = { alu } />)) : <span></span>;
      //ARRANGE ALL CATEGORIES TO BE SELETED
      let cat = this.props && this.props.categorys.length > 0 ?
      this.props.categorys.map(alu => (<DropdownItem href="#" onClick={e => this.changeSet(alu.id)} key={ alu.id }>{ alu.name }</DropdownItem>)) : <span></span>;
      //GET SELECTED OBJECT FROM ARRAY
      let selected = this.props && this.props.categorys.length > 0 ? this.props.categorys.filter(alu => alu.id == this.state.main_id  ): null;
      
      
      return (
      <>
            <Container style={{ minHeight:400}}>
              <Row>
                <Col >
                <blockquote className="blockquote text-left">
                <p className="mb-0">Start by selecting a category or searching for the medical partitionar you wish to consult.</p>
                <footer className="blockquote-footer">{ } <cite title="Source Title">Managment.</cite>
                </footer>
                </blockquote>

                <form className="form-inline">
                  <div className="form-group mx-sm-3">
                    <label for="search" className="sr-only">Password</label>
                    <input type="search" name="search" onChange={this.onSearch} className="form-control" id="search" placeholder="Search by Name..."/>
                  </div>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      aria-expanded={false}
                      aria-haspopup={true}
                      caret
                      color="primary"
                      data-toggle="dropdown"
                      href="#"
                      id="dropdownMenuLink"
                      onClick={e => e.preventDefault()}
                      role="button"
                    >
                      Select a Category of Specialist
                    </DropdownToggle>
                    <DropdownMenu aria-labelledby="dropdownMenuLink">
                      { cat }
                      <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                        Manage Category
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  {' '}
                  <span className="ml-3">   Searching...:</span><span className="ml-3"><b >{selected ? selected[0].name: ''}</b></span>
                </form>
                </Col>
               </Row>
              <hr/>
                <Row>
                    { ali }
                </Row>
              
            </Container>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ 
  employees: state.employeeReducer.employeesSearched,
  categorys: state.categoryReducer.categorys,
  id: ownProps.match.params.id,
  isAuthenticatedEmployee:state.employeeReducer.isAuthenticated,
  isAuthenticatedClient:state.clientReducer.isAuthenticated

})

export default connect(mapStateToProps, { getEmployee, getCategory, getEmployeeSearched })(EmployeeData);

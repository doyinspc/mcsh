import React from "react";
import { connect }from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { getCategory, deactivateCategory, deleteCategory, editCategory } from '../../actions/category';

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
  UncontrolledButtonDropdown
} from "reactstrap";
import CategoryForm from "components/Forms/CategoryForm";
// core components

class TablePage extends React.Component{
    state = {
        dropdownOpen: false
        };
    static propTypes = {
        categorys: PropTypes.array.isRequired,
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
        this.props.getCategory()
    }
     
    toggle= () => this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });

    editSet =  id => {
        this.props.editCategory(id)
    }

    activateSet =  id => {
        this.props.deactivateCategory(id)
    }

    profileSet = (id) =>{
        this.props.getCategory(id)
    }
    
    deleteSet = (id) =>{
        let r = window.confirm('Are you sure. It cannot be recovered?');
        if(r){
            this.props.deleteCategory(id);
        }
        
    }
    
    render(){
        if (!this.props.isAuthenticated) {
            return <Redirect to="/staff-login-page" />;
        }
        let J = 0;
        let ali = this.props && this.props.categorys.length > 0 ?
        this.props.categorys.map(alu => ( 
                <tr scope='row' key={alu.id} style={{margin:0, padding:0}}>
                    <td className="text-center">{++J}</td>
                    <td className= { alu.is_active == true ? "text-success" : "text-danger"  } >{alu.name}</td>
                    <td className="text-center">
                    <UncontrolledButtonDropdown style={{margin:0, padding:0}}>
                        <DropdownToggle caret size="sm" style={{margin:0}}>
                            Action
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem  key="id1_{alu.id}" href="#" onClick={e => this.profileSet(alu.id)}>Staff</DropdownItem>
                            <DropdownItem  key="id2_{alu.id}" href="#" onClick={e => this.editSet(alu.id)}>Edit</DropdownItem>
                            <DropdownItem  key="id3_{alu.id}" href="#" onClick={e => this.activateSet(alu.id)}>Activate/Deactivate</DropdownItem>
                            <DropdownItem  key="id4_{alu.id}" href="#" onClick={e => this.deleteSet(alu.id)}>Delete</DropdownItem>
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
                    <CategoryForm />
                    <Table valign="top" style={{margin:0, padding:0}} size='sm' bordered hover dark responsive>
                        <thead>
                            <tr>
                                <th style={{width:9}}>#</th>
                                <th>Name</th>
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
    categorys: state.categoryReducer.categorys,
    isAuthenticated: state.employeeReducer.isAuthenticated,
    isAdmin: state.employeeReducer.isAdmin
})
export default connect(mapStateToProps, { getCategory, deactivateCategory, deleteCategory, editCategory })(TablePage);

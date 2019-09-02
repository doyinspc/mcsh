import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerCategory, updateCategory, editCategory } from '../../actions/category';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

export class CategoryForm extends React.Component {

  state = {
      id:null,
      name:null,
      isEditing: false
  }

  onChange = e => this.setState({
    [e.target.name] : e.target.value
  })

  onReset = () => this.setState({
    isEditing : false,
    name: null,
    id:null
  })
  
  static propTypes = {
    registerCategory: PropTypes.func.isRequired,
    isEditing:PropTypes.number
  }
  

  loadEditState = (id, prop) => {
    const new_obj = prop.filter(p => p.id == id);
    const name = new_obj[0].name;
    this.setState({
     isEditing : true,
     name: name,
     id:id
    })
    this.props.editCategory(-1)
  }

  onSubmit = e =>{
    e.preventDefault();
    
    const { name } = this.state;
    const data = { name };
    if(this.state.isEditing == true){
      this.props.updateCategory(this.state.id, data);
      this.onReset()
    }else
    {
      this.props.registerCategory(data);
    }
     
  }

  render() {
    
    if(this.props.isEditing > -1)
    {
      this.loadEditState(this.props.isEditing, this.props.category.categorys)
    }
    const { name, isEditing } = this.state;
    return (
      <Form inline onSubmit={this.onSubmit}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="exampleEmail" className="mr-sm-2">Name</Label>
          <Input 
          type="text" 
          name="name" 
          defaultValue={name}
          onChange={this.onChange} 
          placeholder="Dentist" 
          />
        </FormGroup>
        <Button type="submit">{ this.state.isEditing == true ? 'Edit' : 'Submit'  }</Button> 
        { this.state.isEditing == true ? <Button onClick={this.onReset} type="reset">Reset</Button> :<span></span>   }
      </Form>
    );
  }
}

const mapStateToProps = (state, ownProps) =>({
    category : state.categoryReducer,
    isEditing : state.categoryReducer.isEdit
})

export default connect(mapStateToProps, {registerCategory, updateCategory, editCategory})(CategoryForm)
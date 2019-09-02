import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerEmployee, getEmployee, updateEmployee, editEmployee, formEmployee } from '../../actions/employee';
import { getCategory } from '../../actions/category';
import { MEDIA_PATH } from "../../actions/types";
import { 
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input,
    FormFeedback,
    FormText,
    Col,
    Row,
    Card,
    CardTitle,
    CardBody,
    CardHeader,
    CardFooter
} from 'reactstrap';

export class EmployeeForm extends React.Component {
    state = {
      id:null,
      empno:null,
      fullname:null,
      profile:null,
      category:null,
      phone:null,
      email:null,
      password:null,
      altpassword:null,
      photo:'',
      isEditing: false,
      categorys:{},
      validate:{
          empnoState : '',
          fullnameState: '',
          emailState:'',
          phoneState:'',
          passwordState:'',
          altpasswordState:'',
      }
  }

  static propTypes = {
    categorys: PropTypes.array.isRequired,
    employee: PropTypes.object,
    registerEmployee: PropTypes.func.isRequired,
    updateEmployee: PropTypes.func.isRequired
  }

  
  displayForm =  (bool) => {
    this.props.formEmployee(bool)
 }

  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    const arr = ['fullname', 'empno', 'phone'];
    if(arr.includes(name) && this.validateLimit(name, value) === true){
        this.setState({[e.target.name] : e.target.value}) 
    }
    this.setState({[e.target.name] : e.target.value})

  }

  validateLimit = (name, value) => {
      const { validate } = this.state;
      let chk = false
      if(value && value.length > 2){
        validate[`${name}State`] = 'has-success' 
        chk = true
      }
      else{
        validate[`${name}State`] = 'has-danger' 
      }
      this.setState({ validate }) 
      return chk
  }


  onChangePhoto = e => {
    e.preventDefault();
    return this.setState({ 
      photo : e.target.files[0]
    })
  }

  onReset = () => this.setState({
      id:null,
      empno:null,
      fullname:null,
      profile:null,
      category:null,
      phone:null,
      email:null,
      password:null,
      photo:null,
      isEditing: false,
      validate:{
        empnoState : '',
        fullnameState: '',
        emailState:'',
        phoneState:'',
        passwordState:'',
        altpasswordState:'',
    }
  })
  
  static propTypes = {
    registerEmployee: PropTypes.func,
    categoryEmployee: PropTypes.func,
    updateEmployee: PropTypes.func,
    employee: PropTypes.object,
    isEditing:PropTypes.number
  }
  

  loadEditState = (id, prop) => {
    const new_obj = prop.filter(p => p.id == id);
    const empno = new_obj[0].empno;
    const fullname = new_obj[0].fullname;
    const profile = new_obj[0].profile;
    const category = new_obj[0].category;
    const phone = new_obj[0].phone;
    const email = new_obj[0].email;
    const password = new_obj[0].password;
    const photo = new_obj[0].photo;
    this.setState({
        id:id,
        empno:empno,
        fullname:fullname,
        profile:profile,
        category:category,
        phone:phone,
        email:email,
        password:password,
        photo:photo,
        photoImg:photo,
        isEditing: true
    })
    this.props.editEmployee(-1);
    this.validateLimit('empno', empno);
    this.validateLimit('fullname', fullname);
    this.validateLimit('phone', phone);
    this.props.formEmployee(true);
  }

  onSubmit = e => {
    e.preventDefault();
    let form_data = new FormData();
    //confirm if image was uploaded before appending
    if(this.state.photo instanceof Blob ){
        form_data.append('photo', this.state.photo, this.state.photo.name)
    }
        
    form_data.append('empno', this.state.empno);
    form_data.append('fullname', this.state.fullname);
    form_data.append('phone', this.state.phone);
    form_data.append('email', this.state.email);
    form_data.append('password', this.state.password);
    form_data.append('category', this.state.category);
    form_data.append('profile', this.state.profile);
    let data = form_data;
    
    if(this.state.isEditing == true){
        this.props.updateEmployee(this.state.id, data);
        this.onReset();
    }else
    {
        this.props.registerEmployee(data);
    }
  }

    render() {
    if(this.props.isEdit > -1){
      this.loadEditState(this.props.isEdit, this.props.employees)
    }
    
    const {empno, fullname, phone, email, password, category, profile, photo, isEditing } = this.state;

    let activeselect = this.props.categorys && this.props.categorys.length > 0 ? 
    this.props.categorys.map(cat => <option key={cat.id} defaultValue={ cat.id == category ? cat.id : ''  } selected={ cat.id == category ? true : false  } value={ cat.id } > {cat.name}</option>): <option>...</option>
    
    let photos = "http://style.anu.edu.au/_anu/4/images/placeholders/person_8x10.png";
    if(photo){
        photos = MEDIA_PATH + photo;
    }
    return (
        <Row>
        <Col >
          <Card body>
            <CardHeader>
            <CardTitle><h4>Add/Edit Employee</h4></CardTitle>
            </CardHeader>
            <Form method="post" encType="multipart/form-data" onSubmit={this.onSubmit}>
            <CardBody>
                <Row>
                <Col sm={6}>
                    <FormGroup  row>
                    <Label for="empno" sm={4}>Employment No.</Label>
                    <Col sm={8}>
                        <Input 
                            type="text" 
                            id="empno" 
                            name="empno" 
                            onChange={this.onChange} 
                            defaultValue={empno} 
                            valid = {this.state.validate.empnoState === 'has-success'} 
                            invalid = {this.state.validate.empnoState === 'has-danger'}  
                        />
                        <FormFeedback invalid>Please provide an employment number</FormFeedback>
                    </Col>
                    </FormGroup>

                    <FormGroup row>
                    <Label for="fullname" sm={4}>Title and Fullname</Label>
                    <Col sm={8}>
                        <Input 
                            type="text" 
                            id="fullname" 
                            name="fullname" 
                            onChange={this.onChange} 
                            defaultValue={fullname} 
                            valid = {this.state.validate.fullnameState === 'has-success'} 
                            invalid = {this.state.validate.fullnameState === 'has-danger'}  
                        />
                        <FormFeedback>Please enter title and fullname</FormFeedback>
                        <FormText>Example: Dr. Ayo Ahmed Emeka</FormText>
                    </Col>
                    </FormGroup>

                    <FormGroup row>
                    <Label for="phone" sm={4}>Phone</Label>
                    <Col sm={8}>
                        <Input 
                        type="text" 
                        id="phone" 
                        name="phone" 
                        onChange={this.onChange} 
                        defaultValue={phone} 
                        valid = {this.state.validate.phoneState === 'has-success'} 
                        invalid = {this.state.validate.phoneState === 'has-danger'}  
                        />
                    </Col>
                    </FormGroup>

                    <FormGroup row>
                    <Label for="email" sm={4}>Email</Label>
                    <Col sm={8}>
                        <Input type="email" id="email" name="email" onChange={this.onChange} defaultValue={email} />
                        <FormFeedback>Email</FormFeedback>
                    </Col>
                    </FormGroup>

                    <FormGroup row>
                    <Label for="password" id="password" sm={4}>Password</Label>
                    <Col sm={8}>
                        <Input type="password" name="password" onChange={this.onChange} defaultValue={password}  />
                        <FormText>Minimum of 8 charaters.</FormText>
                    </Col>
                    </FormGroup>

                    <FormGroup row>
                    <Label for="altpassword" sm={4}>Re-enter Password</Label>
                    <Col sm={8}>
                        <Input type="password" name="altpassword" onChange={this.onChange} defaultValue={password}  />
                        <FormText>Minimum of 8 charaters.</FormText>
                    </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Label for="category" sm={4}>Specialization</Label>
                    <Col sm={8}>
                        <select id="icategory" name="category" onChange={this.onChange} className="form-control">
                            { activeselect }
                        </select>
                    </Col>
                    </FormGroup>
                    <FormGroup  row>
                    <Label for="profile" sm={4}>Profile</Label>
                    <Col sm={8}>
                        <Input type="textarea" id="profile" name="profile" onChange={this.onChange} defaultValue={profile}  />
                        <FormText>Maximum of 100 words.</FormText>
                    </Col>
                    </FormGroup>
                </Col>
                <Col sm={6}>
                    <div className="fileinput fileinput-new text-center" data-provides="fileinput">
                        <div className="fileinput-new thumbnail ">
                            <img src={photos} alt="..." />
                        </div>
                        <div className="fileinput-preview fileinput-exists thumbnail img-raised"></div>
                        <div>
                            <span className="btn btn-raised btn-round btn-default btn-file">
                                <span className="fileinput-new">Select image</span>
                                <span className="fileinput-exists">Change</span>
                                <input type="file" id='photo' name="photo" onChange={this.onChangePhoto}  />
                            </span>
                        </div>
                    </div>
                </Col>
                </Row>
                </CardBody>
                <CardFooter>
                    <Button >{ this.state.isEditing == true ? 'Edit' : 'Submit'  }</Button> <Button type="button" onClick={e =>this.displayForm(false)}>Close</Button> 
                    { this.state.isEditing == true ? <Button onClick={this.onReset} >Reset</Button> : <span></span>   }
                </CardFooter>
            </Form>     
          </Card>
          
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state, ownProps) =>{
    return{
        employee : state.employeeReducer,
        categorys : ownProps.categorys,
        isEditing : ownProps.isEdit,
        showForm: ownProps.showForm,
        displayForm:ownProps.displayForm
    }   
}

const mapDispatchToProps = (dispatch)=>{
    return{
        formEmployee,
        getEmployee, 
        registerEmployee: (data) => dispatch(registerEmployee(data)), 
        updateEmployee: (id, data) => dispatch(updateEmployee(id, data)) , 
        editEmployee, 
        getCategory
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);
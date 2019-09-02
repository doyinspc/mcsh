import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerBooking, updateBooking, editBooking } from '../../actions/booking';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

export class BookingForm extends React.Component {

  state = {
      id:null,
      date_booked:null,
      time_booked:null,
      isEditing: false
  }

  onChange = e => this.setState({
    [e.target.name] : e.target.value
  })

  onReset = () => this.setState({
    isEditing : false,
    date_booked: null,
    time_booked: null,
    id:null
  })
  
  static propTypes = {
    registerBooking: PropTypes.func.isRequired,
    isEditing:PropTypes.number
  }
  

  loadEditState = (id, prop) => {
    const new_obj = prop.filter(p => p.id == id);
    const date_booked = new_obj[0].date_booked;
    const time_booked = new_obj[0].time_booked;
    this.setState({
     isEditing : true,
     date_booked: date_booked,
     time_booked: time_booked,
     id:id
    })
    this.props.editBooking(-1)
  }

  onSubmit = e =>{
    e.preventDefault();
    
    const { date_booked, time_booked } = this.state;
    const data = { date_booked, time_booked };
    if(this.state.isEditing == true){
      this.props.updateBooking(this.state.id, data);
      this.onReset()
    }else
    {
      this.props.registerBooking(data);
    }
     
  }

  render() {
    
    if(this.props.isEditing > -1)
    {
      this.loadEditState(this.props.isEditing, this.props.booking.bookings)
    }
    const { date_booked, time_booked, isEditing } = this.state;
    return (
      <Form inline onSubmit={this.onSubmit}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="date_booked" className="mr-sm-2">Date</Label>
          <Input
            type="date"
            name="date_booked"
            id="date_booked"
            value={date_booked}
            placeholder="Please select a Date"
            onChange={this.onChengeDate}
        />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="time_booked" className="mr-sm-2">Time</Label>
          <Input
            type="time"
            name="time_booked"
            id="time_booked"
            value={time_booked}
            placeholder="Please select a Date"
            onChange={this.onChengeDate}
        />
        </FormGroup>
        <Button type="submit">{ this.state.isEditing == true ? 'Edit' : 'Submit'  }</Button> 
        { this.state.isEditing == true ? <Button onClick={this.onReset} type="reset">Reset</Button> :<span></span>   }
      </Form>
    );
  }
}

const mapStateToProps = (state, ownProps) =>({
    booking : state.bookingReducer,
    isEditing : state.bookingReducer.isEdit
})

export default connect(mapStateToProps, {registerBooking, updateBooking, editBooking})(BookingForm)
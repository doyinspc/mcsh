import React from "react";
import { Link, Redirect } from 'react-router-dom'
import { MEDIA_PATH } from "../../actions/types";

// reactstrap components
import {
  Button,
  Col
} from "reactstrap";

export function AlumniCard(props) {
  let pic = MEDIA_PATH + props.emp.photo;
  let photo = require("assets/img/avatar.jpg");
  if(props.emp.photo){
      photo = MEDIA_PATH + props.emp.photo; 
  }
  
    return (
      <>
                <Col md="4">
                  <div className="card">
                    <Link to={`/employee-profile/${props.emp.id}`}>
                    <img
                      alt="..."
                      className="card-img-top"
                      src={ photo }
                      style={{ height:300 }}
                    ></img>
                    </Link>
                    <div className="card-body">
                    <h4 className="card-title">{props.emp.fullname}</h4>
                    <h6 className="card-subtitle">{props.emp.category.name}</h6>
                    <p className="card-text">
                        {props.emp.profile}
                    </p>
                    </div>
                    <div className="card-footer">
                    <Link
                      className="btn btn-info btn-round"
                      to={`/employee-file/${props.emp.id}`}
                      target="_blank"
                    >
                      Make Appointment
                    </Link>
                    </div>
                  </div>
                </Col>
      </>
    );
  }




export default AlumniCard;

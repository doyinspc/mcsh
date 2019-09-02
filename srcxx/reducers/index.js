import { combineReducers } from 'redux';
import client from "./client";
import employee from "./employee";
import category from "./category";


export default combineReducers({
    clientReducer: client,
    employeeReducer: employee,
    categoryReducer: category
});
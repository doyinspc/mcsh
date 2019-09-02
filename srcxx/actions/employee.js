import axios from 'axios';
import {
    EMPLOYEE_DELETE,
    EMPLOYEE_DELETE_FAIL,
    EMPLOYEE_GET,
    EMPLOYEE_GET_ONE,
    EMPLOYEE_GET_MULTIPLE,
    EMPLOYEE_GET_FAIL,
    EMPLOYEE_LOGIN_SUCCESS,
    EMPLOYEE_LOGIN_FAIL,
    EMPLOYEE_REGISTER_SUCCESS,
    EMPLOYEE_REGISTER_FAIL,
    EMPLOYEE_LOGOUT_SUCCESS,
    EMPLOYEE_LOGOUT_FAIL,
    EMPLOYEE_PASSWORD_SUCCESS,
    EMPLOYEE_PASSWORD_FAIL,
    EMPLOYEE_ACTIVATE_SUCCESS,
    EMPLOYEE_ACTIVATE_FAIL,
    EMPLOYEE_UPDATE_SUCCESS,
    EMPLOYEE_UPDATE_FAIL,
    API_PATH
} from "./types";

const path = API_PATH;

//GET ALL EMPLOYEE OR A SPECIFIC EMPLOYEE
export const getEmployee = id => (dispatch, getState) => {
    //notify get data
    dispatch({type : EMPLOYEE_GET});
    //get a specific data by id - if provided
    if(id && id > 0){
        let paths = `${path}/employee/${id}/profile`
        
        axios.get(paths, employeeSetConfig(getState))
        .then(res => {
            dispatch({      
                type: EMPLOYEE_GET_ONE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : EMPLOYEE_GET_FAIL,
                payload:err
            })
        })
    }
    //get all data
    else if( !id ){
        let paths = `${path}/employee/` 
        axios.get(paths, employeeSetConfig(getState))
            .then(res => {
                dispatch({
                    type: EMPLOYEE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : EMPLOYEE_GET_FAIL,
                    payload : err
                })
            })
    }
   
};

//ACTIVATE OR DEACTIVATE AN EMPLOYEE
export const deactivateEmployee = id => (dispatch, getState) => {
        //Employee loading
    dispatch({type : EMPLOYEE_GET});
    let paths = `${path}/employee/${id}/set_deactivated` 
    axios.post(paths, employeeSetConfig(getState))
        .then(res => {
            dispatch({
                type: EMPLOYEE_ACTIVATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : EMPLOYEE_ACTIVATE_FAIL,
                payload : err
            })
        })
};

//CHANGE AND SET EMPLOYEE PASSWORD SEND EMAIL
export const passwordEmployee = id => (dispatch, getState) => {
    
    dispatch({type : EMPLOYEE_GET});
    let paths = `${path}/employee/${id}/set_password` 
    axios.post(paths, employeeSetConfig(getState))
        .then(res => {
            dispatch({
                type: EMPLOYEE_PASSWORD_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({type : EMPLOYEE_PASSWORD_FAIL})
        })
};

//EMPLOYEE LOGIN
export const loginEmployee = (email, password) => dispatch => {

    // headers
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
    //body
    const body = JSON.stringify({email, password})
    let paths = `${path}/employee-login`     
    axios.post(paths, body, config)
        .then(res => {
            dispatch({
                type: EMPLOYEE_LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type : EMPLOYEE_LOGIN_FAIL,
                payload : err
            })
        })
};

//EMPLOYEE REGISTER
export const registerEmployee = (data) => dispatch => {

    // headers
    let config ={
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }

    //body
    const body = JSON.stringify(data)
    let paths = `${path}/employee-register`   
    axios.post(paths, body, config)
        .then(res => {
            dispatch({
                type: EMPLOYEE_REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : EMPLOYEE_REGISTER_FAIL,
                payload : err
            })
        })
};

export const updateEmployee = (id, data) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);
    let paths = `${path}/employee/${id}/update`   
    axios.patch(paths, body, employeeSetConfig2(getState))
        .then(res => {
            dispatch({
                type: EMPLOYEE_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : EMPLOYEE_UPDATE_FAIL,
                payload : err
            })
        })
};

export const updateEmployeePhoto = (id, data) => (dispatch, getState) => {
    //body
    let paths = `${path}/employee/${id}/update`   
    axios.patch(paths, data, employeeSetConfig1(getState))
        .then(res => {
            dispatch({
                type: EMPLOYEE_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : EMPLOYEE_UPDATE_FAIL,
                payload : err
            })
        })
};

//LOGOUT EMPLOYEE
export const logoutEmployee = () => (dispatch, getState) => {
    //get token from state
    const token = getState().employeeReducer.token;

    let paths = `${path}/auth/employee-logout`;
    axios.post(paths, null, employeeSetConfig(getState))
        .then(res => {
            dispatch({
                type: EMPLOYEE_LOGOUT_SUCCESS,
            })
        })
        .catch(err => {

            dispatch({type : EMPLOYEE_LOGOUT_FAIL})
        })
};

//DELETE EMPLOYEE
export const deleteEmployee = id => dispatch => {
    let paths = `${path}/employee/${id}/`;   
    axios.delete(paths)
        .then(res => {
            dispatch({
                type: EMPLOYEE_DELETE,
                payload: id
            })
        })
        .catch(err => {
            dispatch({type : EMPLOYEE_DELETE_FAIL})
        })
}

//SET TOKEN AND HEADER - HELPER FUNCTION
export const employeeSetConfig = getState => {
    //get token from state
    const token = getState().employeeReducer.token;

    // headers
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }

    // if token add to headers
    if(token){
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config
}

//SET TOKEN AND HEADER - HELPER FUNCTION
export const employeeSetConfig1 = getState => {
    //get token from state
    const token = getState().employeeReducer.token;

    // headers
    const config ={
        headers:{
             'Content-Type':'multipart/form-data'
        }
    }

    // if token add to headers
    if(token){
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config
}

//SET TOKEN AND HEADER - HELPER FUNCTION
export const employeeSetConfig2 = getState => {
    //get token from state
    const token = getState().employeeReducer.token;

    // headers
    const config ={
        headers:{
             'Content-Type':'multipart/form-data'
        }
    }

    // if token add to headers
    if(token){
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config
}